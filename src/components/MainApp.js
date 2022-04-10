import { Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Repos from "./Repos";
import Materias from "./Materias";

const MainApp = () => {
  const [materiaSelected, setMateriaSelected] = React.useState(null);

  return (
    <SimpleGrid minChildWidth="600px" marginX={18}>
      <Flex direction="column" w="90%">
        <Header />
        <Materias materiaSelected={materiaSelected} setMateriaSelected={setMateriaSelected} />
      </Flex>
      <Repos materiaSelected={materiaSelected} setMateriaSelected={setMateriaSelected} />
    </SimpleGrid>
  );
};

export default MainApp;
