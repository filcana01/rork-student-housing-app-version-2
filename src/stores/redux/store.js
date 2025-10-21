/* eslint-disable import/prefer-default-export */
import { configureStore } from "@reduxjs/toolkit";
import { ENABLE_REDUX_DEV_TOOLS, ENABLE_TOS } from "@/config";
// USI inside template reducers
import aboutDialogReducer from "./slices/aboutDialogSlice";
import authenticatedUserReducer from "./slices/authenticatedUserSlice";
import settingsReducer from "./slices/settingsSlice";
import tosReducer from "./slices/tosSlice";
// APP specific reducers
import globalDataReducer from "./slices/globalDataSlice";
import { getHasGlobalData } from "@/utils/globalData";
// FEATURES reducers
// ...

function getReducers() {
  return {
    // USI inside template reducers
    aboutDialog: aboutDialogReducer,
    authenticatedUser: authenticatedUserReducer,
    settings: settingsReducer,
    ...(ENABLE_TOS ? { tos: tosReducer } : {}),
    // APP global reducers
    ...(getHasGlobalData() ? { globalData: globalDataReducer } : {}),
    // FEATURES reducers
    // ...
  };
}

export const store = configureStore({
  reducer: getReducers(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: ENABLE_REDUX_DEV_TOOLS,
});
