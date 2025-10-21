import Utilities from "@usi-inside/utilities";

// from env file
const {
  VITE_APP_NAME,
  VITE_APP_BASENAME,
  VITE_API_URL,
  VITE_ENABLE_TOS,
  VITE_SHOW_ERROR_DETAILS,
  VITE_ENABLE_REDUX_DEV_TOOLS,
  VITE_ENABLE_REACT_HOOK_FORM_DEV_TOOLS,
  VITE_SHIBBOLETH_AUTH,
  VITE_ENABLE_APOLLO_CLIENT_DEV_TOOLS,
} = import.meta.env;

export const APP_NAME = VITE_APP_NAME;
export const APP_BASENAME = VITE_APP_BASENAME;
export const API_URL = VITE_API_URL;
export const ENABLE_TOS = Utilities.isTrue(VITE_ENABLE_TOS);
export const SHOW_ERROR_DETAILS = Utilities.isTrue(VITE_SHOW_ERROR_DETAILS);
export const ENABLE_REDUX_DEV_TOOLS = Utilities.isTrue(
  VITE_ENABLE_REDUX_DEV_TOOLS
);
export const ENABLE_REACT_HOOK_FORM_DEV_TOOLS = Utilities.isTrue(
  VITE_ENABLE_REACT_HOOK_FORM_DEV_TOOLS
);
export const SHIBBOLETH_AUTH = Utilities.isTrue(VITE_SHIBBOLETH_AUTH);
export const ENABLE_APOLLO_CLIENT_DEV_TOOLS = Utilities.isTrue(
  VITE_ENABLE_APOLLO_CLIENT_DEV_TOOLS
);

// derived
export const API_BASE_URL = Utilities.getBaseUrl(API_URL);
export const API_PATH = Utilities.getPath(API_URL);

// release info
export { VERSION as RELEASE_VERSION, DATE as RELEASE_DATE } from "./release";
