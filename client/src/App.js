import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import Home from "./views/home/";
import "./global.css";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Home></Home>
  </ThemeProvider>
);

export default App;
