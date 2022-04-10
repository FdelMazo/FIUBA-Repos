import { Flex } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Repos from "./Repos";
import Materias from "./Materias";

const MainApp = () => {
  const [materiaSelected, setMateriaSelected] = React.useState(null);

  return (
    <Flex direction="row" h="100vh" marginX={18}>
      <Flex direction="column" w="100%">
        <Header />
        <Materias materiaSelected={materiaSelected} setMateriaSelected={setMateriaSelected} />
      </Flex>
      <Repos materiaSelected={materiaSelected} setMateriaSelected={setMateriaSelected} />
    </Flex>
  );
};

export default MainApp;
