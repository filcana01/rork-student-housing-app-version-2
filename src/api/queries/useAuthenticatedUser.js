import { useQuery } from "@apollo/client/react";
import GET_AUTHENTICATED_USER from "../graphql/queries/getAuthenticatedUser.graphql";

function useAuthenticatedUser() {
  return useQuery(GET_AUTHENTICATED_USER);
}

export default useAuthenticatedUser;
