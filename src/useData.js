import React from "react";

const useData = () => {
  const [data, setData] = React.useState([]);
  const [partialLoading, setPartialLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const items = [];
      let totalCount = null;
      setPartialLoading(true);

      for (let i = 1; !totalCount || items.length < totalCount; i++) {
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
        if (!json.items || !json.items.length) break;
        totalCount = json.total_count;
        items.push(...json.items);
        setData([...items]);
      }

      setPartialLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    partialLoading,
  };
};

export default useData;
