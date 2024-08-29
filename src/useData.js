import React from "react";

const ALIAS_MATERIAS = require("./data/materias.json");

const allCodigos = new Set(
  Object.keys(ALIAS_MATERIAS).map((c) => c.toLowerCase()),
);

class ReposIdPorCodigo extends Map {
  addIdRepo({ id, topics }) {
    const codigosMateria = topics.intersection(allCodigos);
    codigosMateria.forEach((codigo) => {
      if (!this.has(codigo)) {
        this.set(codigo, new Set());
      }
      this.get(codigo).add(id);
    });
  }
}

const useData = () => {
  const [repos, setRepos] = React.useState([]);
  const [materias, setMaterias] = React.useState([]);
  const [partialLoading, setPartialLoading] = React.useState(false);

  const materiasMap = React.useMemo(() => {
    const materiasMap = new Map();
    for (const [key, value] of Object.entries(ALIAS_MATERIAS)) {
      if (!materiasMap.has(value)) {
        materiasMap.set(value, {
          codigos: new Set(),
          reposIds: new Set(),
        });
      }
      materiasMap.get(value).codigos.add(key);
    }
    return materiasMap;
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      let totalCount = null;
      const items = [];
      let i = 1;
      setPartialLoading(true);
      do {
        const res = await fetch(
          `https://api.github.com/search/repositories?` +
            new URLSearchParams({
              q: "topic:fiuba fork:true",
              sort: "updated",
              order: "desc",
              page: i,
              per_page: 100,
            }),
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        const json = await res.json();
        if (!json.items || !json.items.length) {
          break;
        }
        totalCount = json.total_count;

        const { newItems, reposIdPorCodigo } = json.items.reduce(
          (acc, { id, owner, name, topics, ...rest }, i) => {
            topics = new Set(topics);

            acc.reposIdPorCodigo.addIdRepo({ id, topics });

            acc.newItems[i] = {
              id,
              user: owner.login,
              repoName: name,
              topics,
              ...rest,
            };

            return acc;
          },
          { newItems: new Array(json.items.length), reposIdPorCodigo: new ReposIdPorCodigo() },
        );

        setMaterias(() => {
          for (const [nombre, {codigos}] of materiasMap) {
            const materia = materiasMap.get(nombre)
            const nuevosIds = new Set(...[...codigos].flatMap((codigo)=>reposIdPorCodigo.get(codigo)))
            materia.reposIds = materia.reposIds.union(nuevosIds)
          }

          return Array.from(materiasMap, ([nombre, objeto]) => ({
            nombre,
            ...objeto,
          }));
        });

        items.push(...newItems);
        setRepos(items);
        i++;
      } while (items.length < totalCount);
      setPartialLoading(false);
    };
    fetchData();
  }, [materiasMap]);

  return {
    repos,
    materias,
    partialLoading,
  };
};

export default useData;
