import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import MainApp from "./components/MainApp";

ReactDOM.render(
  <ChakraProvider>
    <MainApp />
  </ChakraProvider>,
  document.getElementById("root")
);
