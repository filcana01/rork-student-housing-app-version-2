import { useState, useEffect } from "react";
import { styled, useColorScheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import {
  Person as PersonIcon,
  SettingsBrightness as SettingsBrightnessIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  SettingsOverscan as SettingsOverscanIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Language as LanguageIcon,
  Translate as TranslateIcon,
  ExitToApp as ExitToAppIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  BrightnessAuto as BrightnessAutoIcon,
} from "@mui/icons-material";
import screenfull from "screenfull";
import { useTranslation } from "react-i18next";
import { updateScreenMode } from "@/stores/redux/slices/settingsSlice";
import { getAcronym } from "@/utils/person";
import { Flash } from "@usi-inside/notifications";
import Utilities from "@usi-inside/utilities";
import { useAuthenticatedUserPerson } from "@/hooks/authenticatedUser";
import { useSettings } from "@/hooks/settings";
import { useApolloClient } from "@apollo/client/react";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const StyledNestedMenuItem = styled(MenuItem)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const sxAvatar = (theme) => ({
  cursor: "pointer",
  width: theme.spacing(5.5),
  height: theme.spacing(5.5),
});

const sxAvatarBig = (theme) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
});

function AuthenticatedUser() {
  const { t, i18n } = useTranslation();
  const client = useApolloClient();
  const [anchorEl, setAnchorEl] = useState(null);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [screenModeMenuOpen, setScreenModeMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { mode, setMode } = useColorScheme();
  const authenticatedUserPerson = useAuthenticatedUserPerson();
  const settings = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", () => {
        if (screenfull.isFullscreen) {
          dispatch(updateScreenMode("full"));
        } else {
          dispatch(updateScreenMode("normal"));
        }
      });
      screenfull.on("error", () => {
        Flash.error("Failed to enable fullscreen");
      });
    }
  }, [dispatch]);

  if (Utilities.isBlank(authenticatedUserPerson)) {
    return (
      <Avatar sx={sxAvatar} alt="Unknown user">
        <PersonIcon />
      </Avatar>
    );
  }
  const { firstName, lastName, fullName, photoUrl } = authenticatedUserPerson;
  const userAcronym = getAcronym(authenticatedUserPerson);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Avatar
        sx={sxAvatar}
        alt={fullName}
        src={photoUrl?.low}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {userAcronym}
      </Avatar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ pt: 2, pb: 0, px: 2, maxWidth: 350 }}>
          <Grid container spacing={1} sx={{ mb: 1 }}>
            <Grid
              sx={(theme) => ({
                width: theme.spacing(12),
              })}
            >
              <Avatar sx={sxAvatarBig} alt={fullName} src={photoUrl?.high}>
                {userAcronym}
              </Avatar>
            </Grid>
            <Grid size="grow">
              <Typography variant="h6">{lastName}</Typography>
              <Typography>{firstName}</Typography>
            </Grid>
          </Grid>
        </Box>

        <MenuList dense>
          <Divider />
          <StyledMenuItem onClick={() => setThemeMenuOpen(!themeMenuOpen)}>
            <ListItemIcon>
              <SettingsBrightnessIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("authenticated-user.theme.label")} />
            {themeMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </StyledMenuItem>
          <Collapse in={themeMenuOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding dense>
              <StyledNestedMenuItem
                disabled={mode === "system"}
                onClick={() => setMode("system")}
              >
                <ListItemIcon>
                  <BrightnessAutoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("authenticated-user.theme.system")} />
              </StyledNestedMenuItem>
              <StyledNestedMenuItem
                disabled={mode === "light"}
                onClick={() => setMode("light")}
              >
                <ListItemIcon>
                  <LightIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("authenticated-user.theme.light")} />
              </StyledNestedMenuItem>
              <StyledNestedMenuItem
                disabled={mode === "dark"}
                onClick={() => setMode("dark")}
              >
                <ListItemIcon>
                  <DarkIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("authenticated-user.theme.dark")} />
              </StyledNestedMenuItem>
            </MenuList>
          </Collapse>
          {screenfull.isEnabled && [
            <Divider sx={{ my: `0 !important` }} key="au-1" />,
            <StyledMenuItem
              onClick={() => setScreenModeMenuOpen(!screenModeMenuOpen)}
              key="au-2"
            >
              <ListItemIcon>
                <SettingsOverscanIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={t("authenticated-user.screen.label")} />
              {screenModeMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </StyledMenuItem>,
            <Collapse
              in={screenModeMenuOpen}
              timeout="auto"
              unmountOnExit
              key="au-3"
            >
              <MenuList component="div" disablePadding dense>
                <StyledNestedMenuItem
                  disabled={settings.screenMode === "normal"}
                  onClick={() => screenfull.exit()}
                >
                  <ListItemIcon>
                    <FullscreenExitIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("authenticated-user.screen.normal")}
                  />
                </StyledNestedMenuItem>
                <StyledNestedMenuItem
                  disabled={settings.screenMode === "full"}
                  onClick={() => screenfull.request()}
                >
                  <ListItemIcon>
                    <FullscreenIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={t("authenticated-user.screen.full")} />
                </StyledNestedMenuItem>
              </MenuList>
            </Collapse>,
          ]}
          <Divider sx={{ my: `0 !important` }} />
          <StyledMenuItem
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
          >
            <ListItemIcon>
              <LanguageIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("authenticated-user.language.label")} />
            {languageMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </StyledMenuItem>
          <Collapse in={languageMenuOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding dense>
              <StyledNestedMenuItem
                disabled={i18n.language.startsWith("en")}
                onClick={() => i18n.changeLanguage("en-GB")}
              >
                <ListItemIcon>
                  <TranslateIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={t("authenticated-user.language.english")}
                />
              </StyledNestedMenuItem>
              <StyledNestedMenuItem
                disabled={i18n.language.startsWith("it")}
                onClick={() => i18n.changeLanguage("it-IT")}
              >
                <ListItemIcon>
                  <TranslateIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={t("authenticated-user.language.italian")}
                />
              </StyledNestedMenuItem>
            </MenuList>
          </Collapse>
          <Divider sx={{ my: `0 !important` }} />
          <StyledMenuItem
            component="a"
            href="../Shibboleth.sso/Logout"
            onClick={() => client.clearStore()}
          >
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("authenticated-user.logout")} />
          </StyledMenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
export default AuthenticatedUser;
