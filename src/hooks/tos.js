import { useSelector } from "react-redux";
import Utilities from "@usi-inside/utilities";
import { ENABLE_TOS } from "@/config";

const useTos = () => useSelector((state) => state.tos);

const useHasTos = () => {
  const tos = useTos();
  return ENABLE_TOS && Utilities.isPresent(tos);
};

export { useHasTos, useTos };
