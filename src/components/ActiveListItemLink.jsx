import { forwardRef } from "react";
import clsx from "clsx";
import { ListItemButton } from "@mui/material";
import PropTypes from "prop-types";
import { NavLink, useResolvedPath, useMatch } from "react-router";

const ActiveListItemLink = forwardRef(
  (
    {
      children,
      to,
      className = "",
      activeOnNestedRoutes = true,
      backListedNestedRoutes = [],
      ...props
    },
    ref
  ) => {
    const { pathname } = useResolvedPath(to);
    const nestedRoutesSuffix = `${pathname.endsWith("/") ? "" : "/"}*`;
    const path = `${pathname}${activeOnNestedRoutes ? nestedRoutesSuffix : ""}`;
    const match = useMatch({ path, end: true });
    const alllinkClasses =
      match &&
      (activeOnNestedRoutes
        ? !backListedNestedRoutes.some((entry) =>
            match.params["*"].startsWith(entry)
          )
        : true)
        ? clsx([className, "Mui-selected"])
        : className;

    return (
      <ListItemButton
        ref={ref}
        component={NavLink}
        className={alllinkClasses}
        to={to}
        {...props}
      >
        {children}
      </ListItemButton>
    );
  }
);
ActiveListItemLink.displayName = "Active list item link";

ActiveListItemLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeOnNestedRoutes: PropTypes.bool,
  backListedNestedRoutes: PropTypes.arrayOf(PropTypes.string),
};

export default ActiveListItemLink;
