import { hasAccessPower } from "@usi-inside/utilities";
import { useSelector } from "react-redux";

const useAuthenticatedUser = () =>
  useSelector((state) => state.authenticatedUser);

const useAuthenticatedUserPerson = () => useAuthenticatedUser()?.person ?? {};

const useAuthenticatedUserPowers = () => useAuthenticatedUser()?.powers ?? [];

const useHasAccess = () => hasAccessPower(useAuthenticatedUserPowers());

export {
  useAuthenticatedUser,
  useAuthenticatedUserPerson,
  useAuthenticatedUserPowers,
  useHasAccess,
};
