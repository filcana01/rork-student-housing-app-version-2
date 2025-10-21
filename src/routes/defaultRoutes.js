import { useHasAccess } from "@/hooks/authenticatedUser";
import { useHasTos, useTos } from "@/hooks/tos";

export const defaultRoutes = {
  accessDenied: "/access-denied",
  tos: "/privacy-info-and-tos",
  entryPoint: "/no-accessible-sections",
};

export const useDefaultRoute = () => {
  const hasAccess = useHasAccess();
  const hasTos = useHasTos();
  const tos = useTos();

  if (!hasAccess) {
    return defaultRoutes.accessDenied;
  }

  if (hasTos && !tos.accepted) {
    return defaultRoutes.tos;
  }

  return defaultRoutes.entryPoint;
};
