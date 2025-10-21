import { Box } from "@mui/material";
import PropTypes from "prop-types";

function HtmlContent({ html, removeYMargins = true }) {
  const removeYMarginsRules = removeYMargins
    ? {
        "& > :first-child": { marginTop: 0 },
        "& > :last-child": { marginBottom: 0 },
      }
    : {};
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: html }}
      sx={(theme) => ({
        ...removeYMarginsRules,
        "& a": {
          color: theme.vars.palette.primary.main,
          textDecorationColor: `color-mix(in srgb, ${theme.vars.palette.primary.main}, transparent 40%)`,
          "&:hover": {
            textDecorationColor: "inherit",
          },
        },
      })}
    />
  );
}

HtmlContent.propTypes = {
  html: PropTypes.string.isRequired,
  removeYMargins: PropTypes.bool,
};

export default HtmlContent;
