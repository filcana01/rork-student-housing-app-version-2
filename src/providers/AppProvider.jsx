import { ApolloProvider } from "@apollo/client/react";
import PropTypes from "prop-types";
import { ErrorBoundary } from "react-error-boundary";
import { client } from "@/lib/apollo/client";
import { SHIBBOLETH_AUTH, SHOW_ERROR_DETAILS } from "@/config";
import Errors from "@usi-inside/errors";
import Notifications from "@usi-inside/notifications";
import i18n from "@/lib/i18n";
import { I18nextProvider } from "react-i18next";
import { CssBaseline } from "@mui/material";
import AppRouterProvider from "./AppRouterProvider";
import ReduxProvider from "./ReduxProvider";
import BootstrapProvider from "./BootstrapProvider";
import ThemeProvider from "./ThemeProvider";
import YupLocaleProvider from "./YupLocaleProvider";
import LocalizationProvider from "./LocalizationProvider";

function AppProvider({ children = null }) {
  return (
    <ErrorBoundary FallbackComponent={Errors.StartUpError}>
      <I18nextProvider i18n={i18n}>
        <ReduxProvider>
          <ThemeProvider>
            <CssBaseline enableColorScheme />
            <LocalizationProvider>
              <Errors.Provider
                shibbolethAuth={SHIBBOLETH_AUTH}
                showErrorDetails={SHOW_ERROR_DETAILS}
              >
                <Notifications.Provider showErrorDetails={SHOW_ERROR_DETAILS}>
                  <ApolloProvider client={client}>
                    <BootstrapProvider>
                      <YupLocaleProvider>
                        <AppRouterProvider>{children}</AppRouterProvider>
                      </YupLocaleProvider>
                    </BootstrapProvider>
                  </ApolloProvider>
                </Notifications.Provider>
              </Errors.Provider>
            </LocalizationProvider>
          </ThemeProvider>
        </ReduxProvider>
      </I18nextProvider>
    </ErrorBoundary>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
};

export default AppProvider;
