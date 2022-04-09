import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import MainApp from "./components/MainApp";
import useData from "./useData";
import { DataContext } from "./Contexts"

const App = () => {
  const dataHook = useData();

  return (
    <DataContext.Provider value={dataHook}>
      <MainApp />
    </DataContext.Provider>
  );
};

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
