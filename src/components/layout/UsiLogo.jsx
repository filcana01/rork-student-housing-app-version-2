import { Box } from "@mui/material";
import PropTypes from "prop-types";
import UsiLogoBlackSvg from "@/assets/UsiLogoBlack.svg";
import UsiLogoWhiteSvg from "@/assets/UsiLogoWhite.svg";

const COLORS = {
  black: "black",
  white: "white",
};
const SVG_BY_COLOR = {
  black: UsiLogoBlackSvg,
  white: UsiLogoWhiteSvg,
};

function getLogo(size = 100, color = COLORS.white) {
  return (
    <Box
      component="img"
      alt="USI Logo"
      src={SVG_BY_COLOR[color]}
      sx={(theme) => ({
        width: size,
        height: size,
        transition: "width 0.4s, height 0.4s",
        ...(color === COLORS.white
          ? {
              display: "none",
              ...theme.applyStyles("dark", {
                display: "inline-block",
              }),
            }
          : {
              display: "inline-block",
              ...theme.applyStyles("dark", {
                display: "none",
              }),
            }),
      })}
    />
  );
}
function UsiLogo({ size = 100, sx = { padding: 2 } }) {
  const UsiLogoBlack = getLogo(size, COLORS.black);
  const UsiLogoWhite = getLogo(size, COLORS.white);

  return (
    <Box sx={sx}>
      {UsiLogoBlack}
      {UsiLogoWhite}
    </Box>
  );
}

UsiLogo.propTypes = {
  size: PropTypes.number,
  sx: PropTypes.shape({}),
};

export default UsiLogo;
