import React from "react";

const useData = () => {
  const [data, setData] = React.useState([]);
  const [partialLoading, setPartialLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      let totalCount = null;
      const items = [];
      let i = 1;
      setPartialLoading(true);
      while (!totalCount || items.length < totalCount) {
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
        items.push(...json.items);
        setData((d) => [...items]);
        i++;
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
