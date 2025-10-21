import { Fade, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { APP_NAME } from "@/config";
import AuthenticatedUser from "../AuthenticatedUser";
import HelpMenu from "../HelpMenu";

function AppHeader({ collapsed }) {
  return (
    <Grid container display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
      <Grid size="grow">
        <Fade in={!!collapsed}>
          <Typography
            noWrap
            variant="h5"
            component="h1"
            sx={{ fontWeight: 900 }}
          >
            {APP_NAME}
          </Typography>
        </Fade>
      </Grid>
      <Grid size="auto" sx={{ mx: 2 }}>
        <HelpMenu />
      </Grid>
      <Grid size="auto">
        <AuthenticatedUser />
      </Grid>
    </Grid>
  );
}

AppHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

export default AppHeader;
