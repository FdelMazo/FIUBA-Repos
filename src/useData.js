import React from "react";
import MATERIAS from "./data/materias";

const useData = () => {
  const [materiaSeleccionada, setMateriaSeleccionada] = React.useState(null)
  const [repos, setRepos] = React.useState([])
  const [materias, setMaterias] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const getTotalCount = await fetch(
        `https://api.github.com/search/repositories?` + new URLSearchParams({
          q: "topic:fiuba",
          per_page: 1,
        }), {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      });
      const totalCount = (await getTotalCount.json()).total_count;

      const items = [];
      let i = 1;
      while (items.length < totalCount) {
        const res = await fetch(
          `https://api.github.com/search/repositories?` + new URLSearchParams({
            q: "topic:fiuba",
            sort: "updated",
            order: "desc",
            page: i,
            per_page: 100,
          }), {
          headers: {
            Accept: "application/vnd.github.v3+json"
          }
        });
        const json = await res.json();
        if (!json.items || !json.items.length) break;
        items.push(...json.items);
        i++;
      }

      setRepos(items.map(r => ({ user: r.owner.login, repoName: r.name, repoData: r })));
      const codigosMaterias = [...new Set(items.flatMap(r =>
        r.topics.filter(t => t.match(/^\d\d\d\d$/))
      ))]
      setMaterias(codigosMaterias.filter(c => MATERIAS[c]).map(c => ({
        codigo: c,
        nombre: MATERIAS[c],
        count: items.filter(r => r.topics.includes(c)).length
      })))
    };

    fetchData();
  }, []);

  return {
    materias,
    repos,
    setMateriaSeleccionada,
    materiaSeleccionada,
  };
};

export default useData;
