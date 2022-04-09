import { Flex } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Repos from "./Repos";
import Materias from "./Materias";

const MainApp = () => {
  return (
    <Flex direction="column" h="100vh" marginX={24}>
      <Header />
      <Repos />
      <Materias />
    </Flex>
  );
};

export default MainApp;
