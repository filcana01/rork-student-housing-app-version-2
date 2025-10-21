/* eslint-disable import/prefer-default-export */
import { Navigate } from "react-router";
import { AccessDenied, Layout, Loading, TermOfServices } from "@/components";
import Errors from "@usi-inside/errors";
import { defaultRoutes } from "./defaultRoutes";

export const getProtectedRoutes = (defaultRoute, hasTos) => {
  if (defaultRoute === defaultRoutes.accessDenied) {
    return [
      {
        path: "/",
        element: <Layout.Plain />,
        children: [
          {
            path: "/",
            element: <AccessDenied />,
          },
          {
            path: "*",
            element: <Navigate replace to="/" />,
          },
        ],
      },
    ];
  }
  if (hasTos && defaultRoute === defaultRoutes.tos) {
    return [
      {
        path: "/",
        element: <Layout.Plain />,
        children: [
          { path: "/", element: <Navigate replace to={defaultRoute} /> },
          { path: defaultRoutes.tos, element: <TermOfServices /> },
          { path: "*", element: <Navigate replace to={defaultRoute} /> },
        ],
      },
    ];
  }
  return [
    {
      path: "/",
      element: <Layout.Main />,
      children: [
        { path: "/", element: <Navigate replace to={defaultRoute} /> },
        ...[
          hasTos
            ? { path: defaultRoutes.tos, element: <TermOfServices /> }
            : {},
        ],
        { path: "/loading", element: <Loading /> },
        {
          path: "/no-accessible-sections",
          element: <Errors.NoAccessibleSections />,
        },
        { path: "*", element: <Errors.NotFound /> },
      ],
    },
  ];
};
