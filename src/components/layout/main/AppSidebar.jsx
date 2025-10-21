import { styled } from "@mui/material/styles";
import { Box, Fade, List, Typography, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";
import { APP_NAME } from "@/config";
import UsiLogo from "../UsiLogo";
// import * as SidebarMenu from "../sidebarMenu";

const Root = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 40px)",
  boxSizing: "border-box",

  [`& .MuiListItemText-root`]: {
    whiteSpace: "nowrap !important",
  },
});

function AppSidebar({ collapsed }) {
  // const { t } = useTranslation();
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Root>
      <Box sx={{ minHeight: "180px" }}>
        <Box width={132} height={132}>
          <UsiLogo
            size={collapsed && !isSm ? 32 : 100}
            sx={{
              padding: 2,
            }}
          />
        </Box>
        <Fade in={!collapsed || isSm}>
          <Typography variant="h5" component="h1" noWrap sx={{ px: 2 }}>
            {APP_NAME}
          </Typography>
        </Fade>
      </Box>
      <List>
        {/* MENU SAMPLE CODE START */}

        <p style={{ padding: "16px" }}>
          The menu is built using SidebarMenu.Node / SidebarMenu.Leaf
          components. The commented code below shows two examples, one simple
          and one with nested entities.
        </p>

        {/* Simple */}
        {/* <SidebarMenu.Leaf
          title={t("left-sidebar.app-entry-point")}
          hasTooltip={collapsed}
          icon={<ViewStreamSharpIcon />}
          link="/app-entry-point"
          topDivider
        /> */}

        {/* Nested entries */}
        {/* <SidebarMenu.Node
          title={t("left-sidebar.pages")}
          hasTooltip={collapsed}
          icon={<AutoStoriesIcon />}
          entryPointRoute="/pages"
          topDivider
          bottomDivider
        >
          <SidebarMenu.Leaf
            title={t("left-sidebar.page-1")}
            hasTooltip={collapsed}
            icon={<ArticleIcon fontSize="small" />}
            link="/pages/page-1"
            nested
          />
          <SidebarMenu.Leaf
            title={t("left-sidebar.page-2")}
            hasTooltip={collapsed}
            icon={<ArticleIcon fontSize="small" />}
            link="/pages/page-2"
            activeBackListedNestedRoutes={["settings"]}
            nested
          />
        </SidebarMenu.Node> */}

        {/* MENU SAMPLE CODE END */}
      </List>
    </Root>
  );
}

AppSidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

export default AppSidebar;
