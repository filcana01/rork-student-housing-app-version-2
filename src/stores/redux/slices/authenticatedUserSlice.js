import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setAuthenticatedUser } = authenticatedUserSlice.actions;

export default authenticatedUserSlice.reducer;
