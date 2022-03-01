import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./container/App";
import { ChakraProvider} from "@chakra-ui/react";
import { store } from "./store/store";
import "./index.css";



ReactDOM.render(
  <ChakraProvider resetCSS>
    {/* <ColorModeScript initialColorMode={theme.config.initialColorMode}/> */}
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);

// { styles: { global: { body: { bg: "white" } } } }
