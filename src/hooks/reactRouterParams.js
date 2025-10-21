/* eslint-disable import/prefer-default-export */
import Utilities from "@usi-inside/utilities";
import { useParams } from "react-router";

const useCastedParams = () => {
  const params = useParams();
  return Utilities.getCastedObject(params);
};

export { useCastedParams };
