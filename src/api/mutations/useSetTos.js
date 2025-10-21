import { useMutation } from "@apollo/client/react";
import SET_TOS from "../graphql/mutations/setTos.graphql";

function useSetTos() {
  return useMutation(SET_TOS);
}

export default useSetTos;
