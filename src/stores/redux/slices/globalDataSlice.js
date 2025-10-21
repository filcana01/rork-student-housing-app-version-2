import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";

export const globalDataKeys = {
  // academicYears: "academicYears",
};

const initialState = {
  // [globalDataKeys.academicYears]: [],
};

export const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    updateGlobalData: (state, action) => {
      const filteredPayload = _.pick(
        action.payload,
        Object.values(globalDataKeys)
      );
      return {
        ...state,
        ...filteredPayload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateGlobalData } = globalDataSlice.actions;

export default globalDataSlice.reducer;
