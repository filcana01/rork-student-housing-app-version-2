import { useQuery } from "@apollo/client/react";
import GET_GLOBAL_DATA from "../graphql/queries/getGlobalData.graphql";

function useGlobalData(skip = false) {
  return useQuery(GET_GLOBAL_DATA, {
    skip,
  });
}

export default useGlobalData;
