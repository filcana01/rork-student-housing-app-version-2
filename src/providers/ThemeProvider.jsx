import {
  ThemeProvider as MuiThemeProvider,
  useColorScheme,
} from "@mui/material/styles";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { getTheme } from "@/lib/mui/material";

// roboto fontsource
import "@fontsource/roboto/300";
import "@fontsource/roboto/400";
import "@fontsource/roboto/500";
import "@fontsource/roboto/700";

function ThemeProviderChild({ children = null }) {
  const { mode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return children;
}

function ThemeProvider({ children = null }) {
  const { i18n } = useTranslation();
  const theme = getTheme(i18n.resolvedLanguage);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProviderChild>{children}</ThemeProviderChild>
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeProvider;
