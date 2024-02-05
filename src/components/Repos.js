import {
  Box,
  Heading,
  Code,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Loading from "./Loading";
import RepoCards from "./react-gh-repo-cards";
import { sortOptions } from "./SortFeature";

const Repos = ({ materiaSelected, repos, materias }) => {
  // Obscure func: tocar en el tag "fiuba" del header hace que se muestren los repos que no tienen código de materia configurado
  const [fiubaOnly, setFiubaOnly] = React.useState(false);
  const [sortOption, setSortOption] = React.useState(sortOptions[1]);

  const shownRepos = React.useMemo(() => {
    const sortByOptions = (a, b) => {
      const a_data = String(a.repoData[sortOption.shortName]);
      const b_data = String(b.repoData[sortOption.shortName]);

      // '-' uso el menos aca porque sino compara alreves
      return -a_data.localeCompare(b_data, undefined, { numeric: "true" });
    };

    if (fiubaOnly) {
      return repos
        .filter(
          (r) =>
            !materias
              .flatMap((m) => m.codigos)
              .some((c) => r.repoData.topics.includes(c)),
        )
        .sort(sortByOptions);
    } else if (materiaSelected) {
      return repos
        .filter((r) =>
          materiaSelected.codigos.some((c) => r.repoData.topics.includes(c)),
        )
        .sort(sortByOptions);
    } else {
      return repos.sort(sortByOptions);
    }
  }, [materiaSelected, repos, materias, fiubaOnly, sortOption]);

  return (
    <Box h="80vh" m={2}>
      <Heading fontWeight={600} fontSize="4xl" mt={8}>
        {shownRepos.length || ""} Repositorios con topics{" "}
        <Code
          colorScheme="purple"
          fontSize="2xl"
          variant={fiubaOnly ? "solid" : "subtle"}
          onClick={() => setFiubaOnly(!fiubaOnly)}
        >
          fiuba {fiubaOnly}
        </Code>
        {!fiubaOnly &&
          materiaSelected?.codigos.map((c) => (
            <span key={c}>
              {" "}
              <Code colorScheme="purple" fontSize="2xl">
                {c}
              </Code>
            </span>
          ))}
      </Heading>
      <Box
        p={8}
        overscrollBehaviorY="contain"
        overflowY="auto"
        border="1px dashed purple"
        borderRadius={8}
        h="100%"
        my={2}
        position="relative"
        bg={useColorModeValue("purple.50", "purple.100")}
      >
        {repos.length ? (
          <Center>
            <RepoCards
              repoDetails={shownRepos}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </Center>
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

export default Repos;
