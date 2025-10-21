/* eslint-disable import/prefer-default-export */
import { useSelector } from "react-redux";

const useIsAboutDialogVisible = () =>
  useSelector((state) => state.aboutDialog.isVisible);

export { useIsAboutDialogVisible };
