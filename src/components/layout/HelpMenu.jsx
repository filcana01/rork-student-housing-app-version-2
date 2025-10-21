import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Popover,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
} from "@mui/material";
import {
  School as SchoolIcon,
  Help as HelpIcon,
  QuestionMark as QuestionMarkIcon,
  OpenInNew as OpenInNewIcon,
  Info as InfoIcon,
  Article as ArticleIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useServiceDeskUrl, useTutorialUrl } from "@/hooks/serverSettings";
import { showAboutDialog } from "@/stores/redux/slices/aboutDialogSlice";
import Utilities from "@usi-inside/utilities";
import { APP_NAME } from "@/config";
import { Link } from "react-router";
import { useHasTos } from "@/hooks/tos";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  paddingRight: theme.spacing(6),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

function AuthenticatedUser() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const tutorialUrl = useTutorialUrl();
  const serviceDeskUrl = useServiceDeskUrl();
  const hasTos = useHasTos();

  const open = Boolean(anchorEl);
  const id = open ? "help-menu-popover" : undefined;

  return (
    <>
      <Avatar
        sx={(theme) => ({
          cursor: "pointer",
          width: theme.spacing(5.5),
          height: theme.spacing(5.5),
        })}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <QuestionMarkIcon />
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
        <Box sx={{ pt: 1, px: 2, maxWidth: 250 }}>
          <Typography variant="h6" component="h3">
            {t("help-menu.title")}
          </Typography>
        </Box>

        <MenuList dense>
          {Utilities.isPresent(tutorialUrl) && [
            <Divider sx={{ mb: `0 !important` }} key="hm-1" />,
            <StyledMenuItem
              component="a"
              href={tutorialUrl}
              target="_blank"
              key="hm-2"
            >
              <ListItemIcon>
                <SchoolIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={t("help-menu.tutorial")} />
              <ListItemIcon sx={{ marginRight: -6 }}>
                <OpenInNewIcon sx={{ opacity: 0.3 }} />
              </ListItemIcon>
            </StyledMenuItem>,
          ]}
          {Utilities.isPresent(serviceDeskUrl) && [
            <Divider sx={{ my: `0 !important` }} key="hm-3" />,
            <StyledMenuItem
              component="a"
              href={serviceDeskUrl}
              target="_blank"
              key="hm-4"
            >
              <ListItemIcon>
                <HelpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={t("help-menu.help-request")} />
              <ListItemIcon sx={{ marginRight: -6 }}>
                <OpenInNewIcon sx={{ opacity: 0.3 }} />
              </ListItemIcon>
            </StyledMenuItem>,
          ]}
          {hasTos && [
            <Divider sx={{ my: `0 !important` }} key="hm-5" />,
            <StyledMenuItem
              component={Link}
              to="/privacy-info-and-tos"
              onClick={() => setAnchorEl(null)}
              key="hm-6"
            >
              <ListItemIcon>
                <ArticleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={t("help-menu.privacy-info-and-tos")} />
            </StyledMenuItem>,
          ]}
          <Divider sx={{ my: `0 !important` }} />
          <StyledMenuItem
            component="a"
            onClick={() => {
              dispatch(showAboutDialog());
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={t("help-menu.about", { appName: APP_NAME })}
            />
          </StyledMenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
export default AuthenticatedUser;
