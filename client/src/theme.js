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
      lineHeight: "4rem"
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
