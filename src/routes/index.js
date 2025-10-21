/* eslint-disable import/prefer-default-export */
import { useHasTos } from "@/hooks/tos";
import { getProtectedRoutes } from "./protected";
import { getPublicRoutes } from "./public";
import { useDefaultRoute } from "./defaultRoutes";

export const useRoutes = () => {
  const isAuthenticated = true; // we use shibboleth, therefore when we reach this
  const hasTos = useHasTos();
  const defaultRoute = useDefaultRoute();
  const commonRoutes = [];
  const protectedRoutes = getProtectedRoutes(defaultRoute, hasTos);
  const publicRoutes = getPublicRoutes();
  const routes = isAuthenticated ? protectedRoutes : publicRoutes;
  return [...routes, ...commonRoutes];
};
