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
          sort: "star",
          order: "desc",
        }), {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      });
      const totalCount = (await getTotalCount.json()).total_count;

      const res = await fetch(
        `https://api.github.com/search/repositories?` + new URLSearchParams({
          q: "topic:fiuba",
          sort: "star",
          order: "desc",
          per_page: totalCount,
        }), {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      });
      const json = await res.json();
      setRepos(json.items.map(r => ({ user: r.owner.login, repoName: r.name, repoData: r })));

      const codigosMaterias = [...new Set(json.items.flatMap(r =>
        r.topics.filter(t => t.match(/^\d\d\d\d$/))
      ))]
      setMaterias(codigosMaterias.filter(c => MATERIAS[c]).map(c => ({
        codigo: c,
        nombre: MATERIAS[c]
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
