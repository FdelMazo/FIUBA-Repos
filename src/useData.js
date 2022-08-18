import React from "react";
import ALIAS_MATERIAS from "./data/materias";

const useData = () => {
  const [repos, setRepos] = React.useState([])
  const [materias, setMaterias] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      let totalCount = null;
      const items = [];
      let i = 1;
      while (!totalCount || items.length < totalCount) {
        const res = await fetch(
          `https://api.github.com/search/repositories?` + new URLSearchParams({
            q: "topic:fiuba fork:true",
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
        totalCount = json.total_count;
        items.push(...json.items);
        i++;
      }

      setRepos(items.map(r => ({ user: r.owner.login, repoName: r.name, repoData: r })));
      const codigosMaterias = [...new Set(items.flatMap(r =>
        r.topics.filter(t => t.match(/^\d\d\d\d$/))
      ))]

      let allMaterias = Object.keys(ALIAS_MATERIAS).reduce((acc, c) => {
        const nombre = ALIAS_MATERIAS[c];
        let m = acc.find(mx => mx.nombre === nombre)
        if (m) {
          m.codigos.push(c)
        } else {
          acc.push({
            codigos: [c],
            nombre,
          })
        }
        return acc;
      }, [])

      codigosMaterias.forEach(c => {
        const materia = allMaterias.find(m => m.codigos.includes(c))
        if (!materia) return;
        if (materia.reponames) {
          materia.reponames = new Set([...materia.reponames, ...items.filter(r => r.topics.includes(c)).map(r => r.full_name)])
        } else {
          materia['reponames'] = new Set(items.filter(r => r.topics.includes(c)).map(r => r.full_name))
        }
      })

      const processedMaterias = allMaterias.filter(m => m.reponames?.size > 0);
      setMaterias(processedMaterias)
    };

    fetchData();
  }, []);

  return {
    materias,
    repos,
  };
};

export default useData;
