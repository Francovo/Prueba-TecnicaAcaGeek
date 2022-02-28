import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./container/App";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { store } from "./store/store";
import "./index.css";

const theme = extendTheme({
  // config: { initialcolormode: "dark", useSystemcolormode: false },
});

ReactDOM.render(
  <ChakraProvider resetCSS theme={theme}>
    {/* <ColorModeScript initialColorMode={theme.config.initialColorMode}/> */}
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);

// { styles: { global: { body: { bg: "white" } } } }
