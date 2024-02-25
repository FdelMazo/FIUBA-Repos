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
    const codigosMaterias = [
      ...new Set(
        data.flatMap((r) => r.topics.filter((t) => t.match(/^\d\d\d\d$/))),
      ),
    ];

    let allMaterias = Object.keys(ALIAS_MATERIAS).reduce((acc, c) => {
      const nombre = ALIAS_MATERIAS[c];
      let m = acc.find((mx) => mx.nombre === nombre);
      if (m) {
        m.codigos.push(c);
      } else {
        acc.push({
          codigos: [c],
          nombre,
        });
      }
      return acc;
    }, []);

    codigosMaterias.forEach((c) => {
      const materia = allMaterias.find((m) => m.codigos.includes(c));
      if (!materia) return;
      if (materia.reponames) {
        materia.reponames = new Set([
          ...materia.reponames,
          ...data.filter((r) => r.topics.includes(c)).map((r) => r.full_name),
        ]);
      } else {
        materia["reponames"] = new Set(
          data.filter((r) => r.topics.includes(c)).map((r) => r.full_name),
        );
      }
    });

    return allMaterias.filter((m) => m.reponames?.size > 0);
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
