import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import PropTypes from "prop-types";
import { APP_BASENAME } from "@/config";
import { useRoutes } from "@/routes";

function AppRouterProvider({ children = null }) {
  const routes = useRoutes();
  const router = createBrowserRouter(routes, {
    basename: APP_BASENAME,
  });
  return <RouterProvider router={router}>{children}</RouterProvider>;
}

AppRouterProvider.propTypes = {
  children: PropTypes.node,
};

export default AppRouterProvider;
