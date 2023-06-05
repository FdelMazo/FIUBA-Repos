import { Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Repos from "./Repos";
import Materias from "./Materias";
import { DataContext } from "../Contexts";

const MainApp = () => {
  const { materias } = React.useContext(DataContext);
  const [codigoSelected, setCodigoSelected] = React.useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('c')
  })

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    codigoSelected ? params.set('c', codigoSelected) : params.delete('c')
    const url = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname
    window.history.replaceState({}, '', url);
  }, [codigoSelected]);

  const materiaSelected = React.useMemo(() => {
    if (!codigoSelected) return null
    return materias.find(m => m.codigos.includes(codigoSelected))
  }, [codigoSelected, materias])

  return (
    <SimpleGrid minChildWidth="600px" m={2}>
      <Flex direction="column" px={4}>
        <Header />
        <Materias materiaSelected={materiaSelected} setCodigoSelected={setCodigoSelected} />
      </Flex>
      <Repos materiaSelected={materiaSelected} />
    </SimpleGrid>
  );
};

export default MainApp;
