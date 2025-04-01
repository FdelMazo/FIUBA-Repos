import { Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Repos from "./Repos";
import Materias from "./Materias";
import useData from "../useData";

const ALIAS_MATERIAS = require("../data/materias.json");

const CODIGOS = new Set(
  Object.keys(ALIAS_MATERIAS).map((c) => c.toLowerCase()),
);

const MainApp = () => {
  const { data, partialLoading } = useData();
  const repos = React.useMemo(() => {
    return data.map((r) => ({
      user: r.owner.login,
      repoName: r.name,
      description: r.description,
      language: r.language,
      codigos: new Set(r.topics).intersection(CODIGOS),
      repoData: r,
    }));
  }, [data]);

  // Es un Map<string, {codigos, reponames}>
  // Esto permite que se muestren todos los codigos de una materia con un mismo nombre
  const materiasPorNombre = React.useMemo(() => {
    const materiasPorNombre = new Map();
    for (const [codigo, nombreMateria] of Object.entries(ALIAS_MATERIAS)) {
      if (!materiasPorNombre.has(nombreMateria)) {
        materiasPorNombre.set(nombreMateria, {
          codigos: new Set(),
          reponames: new Set(),
        });
      }
      materiasPorNombre.get(nombreMateria).codigos.add(codigo);
    }
    return materiasPorNombre;
  }, []);

  const materias = React.useMemo(() => {
    // Agregamos los reponames al materiasPorNombre
    repos.forEach((repo) => {
      repo.codigos.forEach((codigoEnRepo) => {
        const nombreMateria = ALIAS_MATERIAS[codigoEnRepo.toUpperCase()];
        materiasPorNombre
          .get(nombreMateria)
          .reponames.add(repo.repoData.full_name);
      });
    });
    // Transformamos materiasPorNombre (Map) a arreglo de objetos
    const materias = Array.from(
      materiasPorNombre,
      ([nombre, { codigos, reponames }]) => ({
        nombre,
        reponames: [...reponames],
        codigos: [...codigos],
      }),
    );

    return materias;
  }, [repos, materiasPorNombre]);

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
