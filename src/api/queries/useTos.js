import { useQuery } from "@apollo/client/react";
import GET_TOS from "../graphql/queries/getTos.graphql";

function useAuthenticatedUser(skip = false) {
  return useQuery(GET_TOS, {
    skip,
  });
}

export default useAuthenticatedUser;
