/* eslint-disable import/prefer-default-export */
import { globalDataKeys } from "@/stores/redux/slices/globalDataSlice";
import Utilities from "@usi-inside/utilities";

function getHasGlobalData() {
  return Utilities.isPresent(Object.keys(globalDataKeys));
}

export { getHasGlobalData };
