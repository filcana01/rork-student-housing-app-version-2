import { useState } from "react";
import { Divider, Toolbar, IconButton, ButtonBase } from "@mui/material";
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  applyHeaderStyles,
  applyEdgeSidebarStyles,
  layoutClasses,
  toggleTemporaryEdgeSidebar,
  toggleEdgeSidebarCollapse,
  Root,
  Header,
  EdgeSidebar,
  EdgeSidebarContent,
  Content,
  applyRootStyles,
} from "@/lib/mui-treasury/layout-core-v6";
import PropTypes from "prop-types";
import { useHeaderStyles } from "@/hooks/layout";
import AppContent from "./AppContent";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import ScrollToTop from "../../ScrollToTop";

function Main({ children = null }) {
  const headerStyles = useHeaderStyles();
  // edge sidebar visibility
  const [showEdgeSidebar, setShowEdgeSidebar] = useState(true);

  return (
    <Root sx={{ ...applyRootStyles() }}>
      <ScrollToTop />
      <Header
        sx={{
          ...applyHeaderStyles({
            height: { xs: 56, md: 64 },
          }),
          position: "sticky",
          zIndex: 1100,
          ...headerStyles,
        }}
      >
        <Toolbar sx={{ flexGrow: 1 }}>
          <IconButton
            className={layoutClasses.TemporaryEdgeSidebarTrigger}
            onClick={() => {
              toggleTemporaryEdgeSidebar();
            }}
          >
            <MenuIcon />
          </IconButton>
          <AppHeader collapsed={!showEdgeSidebar} />
        </Toolbar>
      </Header>

      <EdgeSidebar
        sx={(theme) => ({
          ...applyEdgeSidebarStyles({
            theme,
            config: {
              xs: {
                variant: "temporary",
                width: "256px",
              },
              md: {
                variant: "permanent",
                width: "256px",
                collapsible: true,
                collapsedWidth: "65px",
              },
            },
          }),
          // HACK: this hack is due to MUI Treasury Layout V6
          // We need to force background & color since setting class to "dark" as stated at
          background: theme.vars.palette.background.paper,
          color: theme.vars.palette.text.primary,
          zIndex: 1101,
        })}
        className="dark"
      >
        <EdgeSidebarContent
          sx={{
            overflowX: !showEdgeSidebar && "hidden !important",
            overflowY: !showEdgeSidebar && "auto !important",
            height: "100vh !important",
          }}
        >
          <AppSidebar collapsed={!showEdgeSidebar} />
        </EdgeSidebarContent>
        <Divider data-mode-dark />
        <ButtonBase
          className={layoutClasses.EdgeSidebarCollapser}
          onClick={(event) => {
            toggleEdgeSidebarCollapse({ event });
            setShowEdgeSidebar(!showEdgeSidebar);
          }}
          sx={(theme) => ({
            height: 48,
            mt: "auto",
            "&:hover": { background: theme.vars.palette.action.hover },
          })}
        >
          <ArrowBackIcon
            className={layoutClasses.EdgeSidebarUncollapsedVisible}
          />
          <ArrowForwardIcon
            className={layoutClasses.EdgeSidebarCollapsedVisible}
          />
        </ButtonBase>
      </EdgeSidebar>
      <Content
        sx={{
          py: 2,
          background: (theme) => theme.vars.palette.background.default,
        }}
      >
        <AppContent>{children}</AppContent>
      </Content>
    </Root>
  );
}

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
