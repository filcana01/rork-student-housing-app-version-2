import {
  ListItemText,
  ListItemIcon,
  Tooltip,
  Zoom,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import ActiveListItemLink from "../../ActiveListItemLink";

function Leaf({
  title,
  hasTooltip,
  tooltipTitle = null,
  icon = null,
  link = null,
  activeBackListedNestedRoutes = [],
  onClick = null,
  topDivider = false,
  bottomDivider = false,
  nested = false,
}) {
  return (
    <>
      {topDivider && <Divider />}
      <Tooltip
        title={hasTooltip ? (tooltipTitle ?? title) : ""}
        placement="right"
        arrow
        slots={{
          transition: Zoom,
        }}
      >
        <ActiveListItemLink
          to={link}
          onClick={onClick}
          backListedNestedRoutes={activeBackListedNestedRoutes}
        >
          {icon && (
            <ListItemIcon
              sx={{ visibility: !nested || hasTooltip ? "visible" : "hidden" }}
            >
              {icon}
            </ListItemIcon>
          )}
          <ListItemText
            primaryTypographyProps={{ variant: nested ? "body2" : "body1" }}
            primary={title}
          />
        </ActiveListItemLink>
      </Tooltip>
      {bottomDivider && <Divider />}
    </>
  );
}

Leaf.propTypes = {
  title: PropTypes.string.isRequired,
  hasTooltip: PropTypes.bool.isRequired,
  tooltipTitle: PropTypes.string,
  icon: PropTypes.node,
  link: PropTypes.string,
  activeBackListedNestedRoutes: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  topDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
  nested: PropTypes.bool,
};

export default Leaf;
