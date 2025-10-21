import { Typography, Grid } from "@mui/material";
import { APP_NAME } from "@/config";
import AuthenticatedUser from "../AuthenticatedUser";
import HelpMenu from "../HelpMenu";
import UsiLogo from "../UsiLogo";

function AppHeader() {
  return (
    <Grid container display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
      <Grid size="auto" sx={{ mr: 2, display: "flex" }}>
        <UsiLogo size={44} sx={{ display: "flex", alignSelf: "center" }} />
      </Grid>
      <Grid size="grow">
        <Typography noWrap variant="h5" component="h1" sx={{ fontWeight: 900 }}>
          {APP_NAME}
        </Typography>
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

export default AppHeader;
