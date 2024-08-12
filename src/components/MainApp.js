import { Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Repos from "./Repos";
import Materias from "./Materias";
import useData from "../useData";

const ALIAS_MATERIAS = require("../data/materias.json");

const MainApp = () => {
  const { data, partialLoading } = useData();
  const repos = React.useMemo(() => {
    return data.map((r) => ({
      user: r.owner.login,
      repoName: r.name,
      description: r.description,
      repoData: r,
    }));
  }, [data]);

  const materias = React.useMemo(() => {
    const mapa = data.reduce((mapa, repo) => {
      const codigosEnRepo = repo.topics
        .map((t) => t.toUpperCase())
        .filter((t) => ALIAS_MATERIAS.hasOwnProperty(t));
      codigosEnRepo.forEach((codigoEnRepo) => {
        const nombreMateria = ALIAS_MATERIAS[codigoEnRepo];
        const valuesAntes = mapa.get(nombreMateria);
        const codigosAntes = valuesAntes ? valuesAntes.codigos : [];
        const reposAntes = valuesAntes ? valuesAntes.reponames : [];
        mapa.set(nombreMateria, {
          codigos: [...new Set([...codigosAntes, codigoEnRepo])],
          reponames: [...new Set([...reposAntes, repo.full_name])],
        });
      });

      return mapa;
    }, new Map());
    const materias = Array.from(mapa, ([nombreMateria, objeto]) => ({
      nombre: nombreMateria,
      ...objeto,
    }));

    return materias;
  }, [data]);

  const [codigoSelected, setCodigoSelected] = React.useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("c");
  });

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    codigoSelected ? params.set("c", codigoSelected) : params.delete("c");
    const url = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, "", url);
  }, [codigoSelected]);

  const materiaSelected = React.useMemo(() => {
    if (!codigoSelected) return null;
    return materias.find((m) => m.codigos.includes(codigoSelected));
  }, [codigoSelected, materias]);

  const commonProps = {
    repos,
    materias,
    materiaSelected,
    partialLoading,
    setCodigoSelected,
  };

  return (
    <SimpleGrid minChildWidth="600px" m={2}>
      <Flex direction="column" px={4}>
        <Header {...commonProps} />
        <Materias {...commonProps} />
      </Flex>
      <Repos {...commonProps} />
    </SimpleGrid>
  );
};

export default MainApp;
