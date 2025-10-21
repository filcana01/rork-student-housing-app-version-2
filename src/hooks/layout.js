import { useTheme } from "@mui/material/styles";
import Utilities from "@usi-inside/utilities";
import { useEnvironmentHeaderColor } from "./serverSettings";

/* eslint-disable import/prefer-default-export */
const useHeaderStyles = () => {
  const theme = useTheme();
  const environmentHeaderColor = useEnvironmentHeaderColor();
  const patternBackground = theme.vars.palette.background.default;
  const background = Utilities.isBlank(environmentHeaderColor)
    ? {
        backgroundColor: "rgb(152, 152, 152)",
        ...theme.applyStyles("dark", {
          backgroundColor: theme.vars.palette.background.default,
        }),
      }
    : {
        backgroundColor: environmentHeaderColor,
      };
  const pattern = import.meta.env.PROD
    ? {}
    : {
        opacity: 1.0,
        background: `repeating-linear-gradient( 45deg, ${patternBackground}, ${patternBackground} 5px, ${environmentHeaderColor} 5px, ${environmentHeaderColor} 25px )`,
        borderBottom: 0,
      };
  return {
    ...background,
    ...pattern,
  };
};

export { useHeaderStyles };
