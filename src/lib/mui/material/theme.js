/* eslint-disable import/prefer-default-export */
import { createTheme } from "@mui/material/styles";

// load MUI locales (itIT and enUS since itCH and enGB are not available)
import { itIT as coreItIT, enUS as coreEnUS } from "@mui/material/locale";
import {
  itIT as gridItIT,
  enUS as gridEnUS,
} from "@mui/x-data-grid-premium/locales";
import {
  itIT as pickersItIT,
  enUS as pickersEnUS,
} from "@mui/x-date-pickers-pro/locales";

// define collection of locales
const getMuiLocales = (locale) => {
  const locales = {
    en: [coreEnUS, gridEnUS, pickersEnUS],
    it: [coreItIT, gridItIT, pickersItIT],
  };
  return locales[locale] ?? locales.en;
};

const componentsCustomizations = {
  MuiTypography: {
    styleOverrides: {
      root: {
        overflowWrap: "break-word",
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        fontSize: "0.875rem !important",
      },
    },
  },
  MuiAutocomplete: {
    defaultProps: {
      size: "small",
    },
  },
  MuiRadio: {
    defaultProps: {
      size: "small",
    },
  },
  MuiCheckbox: {
    defaultProps: {
      size: "small",
    },
  },
  MuiInputBase: {
    defaultProps: {
      size: "small",
    },
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
    },
  },
  MuiSelect: {
    defaultProps: {
      size: "small",
    },
  },
  MuiFormControl: {
    defaultProps: {
      size: "small",
    },
  },
  MuiDatePicker: {
    defaultProps: {
      slotProps: { textField: { size: "small" } },
    },
  },
  MuiDateTimePicker: {
    defaultProps: {
      slotProps: { textField: { size: "small" } },
    },
  },
  MuiTimePicker: {
    defaultProps: {
      slotProps: { textField: { size: "small" } },
    },
  },
  MuiDateRangePicker: {
    defaultProps: {
      slotProps: { textField: { size: "small" } },
    },
  },
  // MuiPaper: {
  //   styleOverrides: {
  //     root: {
  //       backgroundImage: "unset",
  //     },
  //   },
  // },
  MuiDataGrid: {
    defaultProps: {
      slotProps: {
        loadingOverlay: {
          variant: "linear-progress",
          noRowsVariant: "skeleton",
        },
      },
    },
    styleOverrides: {
      columnHeaderTitle: {
        fontWeight: "bold",
      },
    },
  },
};

export const getTheme = (locale) =>
  createTheme(
    {
      cssVariables: {
        colorSchemeSelector: "class",
      },
      colorSchemes: {
        light: true,
        dark: {
          palette: {
            background: {
              default: "#303030",
              paper: "#303030",
            },
          },
        },
      },
      typography: {
        fontFamily: "Roboto",
      },
      components: componentsCustomizations,
    },
    ...getMuiLocales(locale)
  );
