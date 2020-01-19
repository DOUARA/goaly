import React, { Fragment } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Home from "./views/home/";

const App = () => (
  <ThemeProvider theme={theme}>
    <Home></Home>
  </ThemeProvider>
);

export default App;
