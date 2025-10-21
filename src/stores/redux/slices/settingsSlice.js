import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenMode: "normal",
  settings: [],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateScreenMode: (state, action) => {
      state.screenMode = action.payload;
    },
    setServerSettings: (state, action) => {
      state.server = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateScreenMode, setServerSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
