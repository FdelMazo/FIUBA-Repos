import { Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Repos from "./Repos";
import Materias from "./Materias";
import useData from "../useData";

const ALIAS_MATERIAS = require("../data/materias.json");

const allCodigos = new Set(
  Object.keys(ALIAS_MATERIAS).map((c) => c.toLowerCase()),
);

const MainApp = () => {
  const { data, partialLoading } = useData();

  const [repos, reposPorCodigo] = React.useMemo(() => {
    const reposPorCodigo = new Map();
    const repos = data.map(({ owner, name, topics, id, ...rest }) => {
      topics = new Set(topics);

      const codigosEnRepo = topics.intersection(allCodigos);
      codigosEnRepo.forEach((codigo) => {
        if (!reposPorCodigo.has(codigo)) {
          reposPorCodigo.set(codigo, new Set());
        }
        reposPorCodigo.get(codigo).add(id);
      });

      return {
        id,
        user: owner.login,
        repoName: name,
        topics,
        ...rest,
      };
    });
    return [repos, reposPorCodigo];
  }, [data]);
  
  const materias = React.useMemo(() => {
    const mapMaterias = new Map();
    for (const [key, value] of Object.entries(ALIAS_MATERIAS)) {
      if (!mapMaterias.has(value)) {
        mapMaterias.set(value, {
          codigos: new Set(),
          reposIds: new Set(),
        });
      }
      const ids = reposPorCodigo.get(key)
      const materia = mapMaterias.get(value)
      mapMaterias.set(value, {
        codigos: materia.codigos.add(key),
        reposIds: ids && ids?.size ? materia.reposIds.union(ids) : materia.reposIds,
      });
      
    }

    return Array.from(mapMaterias, ([nombre, objeto]) => ({
      nombre,
      ...objeto,
    }));
  }, [reposPorCodigo]);

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

    return materias.find(
      (m) => m.codigos.has(codigoSelected) && m.reposIds.size !== 0,
    );
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
