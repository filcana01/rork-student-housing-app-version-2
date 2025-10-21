import { Toolbar } from "@mui/material";
import {
  applyHeaderStyles,
  Root,
  Header,
  Content,
  applyRootStyles,
} from "@/lib/mui-treasury/layout-core-v6";
import PropTypes from "prop-types";
import { useHeaderStyles } from "@/hooks/layout";
import AppContent from "./AppContent";
import AppHeader from "./AppHeader";
import ScrollToTop from "../../ScrollToTop";

function Plain({ children = null }) {
  const headerStyles = useHeaderStyles();

  return (
    <Root sx={{ ...applyRootStyles() }}>
      <ScrollToTop />
      <Header
        sx={{
          ...applyHeaderStyles({
            height: { xs: 56, sm: 64 },
          }),
          position: "sticky",
          zIndex: 1100,
          ...headerStyles,
        }}
      >
        <Toolbar sx={{ flexGrow: 1 }}>
          <AppHeader />
        </Toolbar>
      </Header>
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

Plain.propTypes = {
  children: PropTypes.node,
};

export default Plain;
