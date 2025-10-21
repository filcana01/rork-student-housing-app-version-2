/* eslint-disable import/prefer-default-export */
import { useSelector } from "react-redux";

const useSettings = () => useSelector((state) => state.settings);

export { useSettings };
