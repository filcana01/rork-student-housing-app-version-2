import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
};

export const aboutDialogSlice = createSlice({
  name: "aboutDialog",
  initialState,
  reducers: {
    showAboutDialog: (state) => {
      state.isVisible = true;
    },
    hideAboutDialog: (state) => {
      state.isVisible = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showAboutDialog, hideAboutDialog } = aboutDialogSlice.actions;

export default aboutDialogSlice.reducer;
