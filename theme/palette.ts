export type ColorSchema =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

// SETUP COLORS
const PRIMARY = {
  light: "#8ac5ef",
  main: "#156eb4",
  dark: "#135791",
};

const INFO = {
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
};
const SUCCESS = {
  light: "#D1FADF",
  main: "#0AC25F",
  dark: "#039855",
};
const WARNING = {
  light: "#FFD79C",
  main: "#FF9800",
  dark: "#B78103",
};
const ERROR = {
  light: "#FEE4E2",
  main: "#FF3E3E",
  dark: "#C62828",
};

const TEXT = {
  primary: "#524B6B",
  secondary: "#9C96AA",
  light: "#B7BDCB",
  lighter: "#F3F4F5",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  250: "#F2F4F7",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  "500_8": "rgba(145, 158, 171,0.08)",
  "500_12": "rgba(145, 158, 171,0.12)",
  "500_16": "rgba(145, 158, 171,0.16)",
  "500_24": "rgba(145, 158, 171,0.24)",
  "500_32": "rgba(145, 158, 171,0.32)",
  "500_48": "rgba(145, 158, 171,0.48)",
  "500_56": "rgba(145, 158, 171,0.56)",
  "500_80": "rgba(145, 158, 171,0.8)",
};

const COMMON = {
  common: { black: "#000", white: "#FFF" },
  primary: { ...PRIMARY, contrastText: "#FFF" },
  info: { ...INFO, contrastText: "#FFF" },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: "#FFF" },
  text: { ...TEXT, contrastText: "#000" },
  grey: GREY,
  divider: GREY["500_24"],
};

const INPUT = {
  background: "#FFFF",
  disabledBackground: "#E9EDF1",
  placeholder: GREY[600],
  text: GREY[900],
  border: "#E2E2E4",
  slider: "#E0E8EC",
};

const palette = {
  light: {
    ...COMMON,
    mode: "light",
    background: { paper: "#F9F9F9", default: "#FFFF", neutral: GREY[200] },
    input: INPUT,
    shadow: {
      color: "#000000",
    },
  },
  dark: {
    ...COMMON,
    mode: "dark",
    background: { paper: "#F9F9F9", default: "#FFF", neutral: GREY[200] },
    input: INPUT,
    shadow: {
      color: GREY[900],
    },
  },
} as const;

export default palette;
