import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const tosSlice = createSlice({
  name: "tos",
  initialState,
  reducers: {
    setTos: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setTos } = tosSlice.actions;

export default tosSlice.reducer;
