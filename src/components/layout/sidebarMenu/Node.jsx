import {
  ListItemText,
  ListItemIcon,
  Tooltip,
  Zoom,
  Collapse,
  List,
  ListItemButton,
  Divider,
} from "@mui/material";
import {
  ExpandMore as OpenIcon,
  ChevronRight as ClosedIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useResolvedPath, useMatch } from "react-router";
import PropTypes from "prop-types";

function Node({
  title,
  hasTooltip,
  icon,
  entryPointRoute,
  topDivider = false,
  bottomDivider = false,
  children,
}) {
  const { pathname } = useResolvedPath(entryPointRoute);
  const suffix = `${pathname.endsWith("/") ? "" : "/"}*`;
  const path = `${pathname}${suffix}`;
  const match = useMatch({ path, end: true });
  const [open, setOpen] = useState(!!match);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {topDivider && <Divider />}
      <Tooltip
        title={hasTooltip ? title : ""}
        placement="right"
        arrow
        slots={{
          transition: Zoom,
        }}
      >
        <ListItemButton onClick={handleClick}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary={title} />
          {open ? <OpenIcon /> : <ClosedIcon />}
        </ListItemButton>
      </Tooltip>
      {open && <Divider />}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
      {bottomDivider && <Divider />}
    </>
  );
}

Node.propTypes = {
  title: PropTypes.string.isRequired,
  hasTooltip: PropTypes.bool.isRequired,
  icon: PropTypes.node,
  entryPointRoute: PropTypes.string.isRequired,
  topDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Node;
