import { Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Repos from "./Repos";
import Materias from "./Materias";
import { DataContext } from "../Contexts";

const MainApp = () => {
  const params = new URLSearchParams(window.location.search);
  const { materias } = React.useContext(DataContext);

  const [materiaSelected, setMateriaSelected] = React.useState(null)
  React.useEffect(() => {
    const codigo = params.get('c')
    if (!codigo) return;
    const materia = materias.find(m => m.codigos.includes(codigo))
    if (!materia) return;
    setMateriaSelected(materia)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materias]);

  React.useEffect(() => {
    materiaSelected ? params.set('c', materiaSelected.codigos[0]) : params.delete('c')
    const url = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname
    window.history.replaceState({}, '', url);
  }, [materiaSelected]);


  return (
    <SimpleGrid minChildWidth="600px" m={2}>
      <Flex direction="column" px={4}>
        <Header />
        <Materias materiaSelected={materiaSelected} setMateriaSelected={setMateriaSelected} />
      </Flex>
      <Repos materiaSelected={materiaSelected} setMateriaSelected={setMateriaSelected} />
    </SimpleGrid>
  );
};

export default MainApp;
