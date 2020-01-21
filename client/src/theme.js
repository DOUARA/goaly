import { createMuiTheme } from "@material-ui/core/styles";

import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Noto+Serif+SC|Overpass:400,700,900", "sans-serif"]
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333366"
    },
    secondary: {
      main: "#eb4d55"
    },
    gray: {
      light: "#E5E5EA",
      main: "#AAAAAD",
      dark: "#535357"
    },
    background: {
      default: "#ffffff"
    }
  },

  typography: {
    fontFamily: "Noto Serif SC, serif",
    fontWeight: "300",
    fontSize: "1.37rem",
    h1: {
      fontSize: "3rem",
      fontFamily: ["Overpass", "sans-serif"].join(","),
      fontWeight: 700,
      lineHeight: "4rem",
      "@media (max-width: 960px)": {
        fontSize: "2rem",
        lineHeight: "3rem"
      }
    },
    h2: {
      fontSize: "2.25rem",
      fontFamily: ["Overpass", "sans-serif"].join(","),
      fontWeight: 400,
      lineHeight: "4rem",
      "@media (max-width: 960px)": {
        fontSize: "1.5rem",
        lineHeight: "3rem"
      }
    }
  },

  overrides: {
    MuiToolbar: {
      root: {
        padding: "0px !important"
      }
    },

    MuiLink: {
      root: {
        fontFamily: "Noto Serif SC, serif"
      }
    },

    MuiButton: {
      root: {
        fontFamily: ["Noto Serif SC", "serif"].join(","),
        borderRadius: "40px",
        fontSize: "1rem",
        fontWeight: "300"
      }
    }
  },
  spacing: 4
});
export default theme;
