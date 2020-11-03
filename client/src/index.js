import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store/index";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { grey, brown } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: brown[700],
      light: brown[200],
      normal: brown[400],
      dark: brown[900]
      
    },
    secondary: {
      main: grey[900],
      light: grey[200],
      normal: grey[400],
      dark: grey[700]
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
