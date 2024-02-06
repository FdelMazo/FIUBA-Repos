import {
  Box,
  Heading,
  Code,
  Center,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  StarIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import React from "react";
import Loading from "./Loading";
import RepoCards from "./react-gh-repo-cards";

const Repos = ({ materiaSelected, repos, materias }) => {
  // Obscure func: tocar en el tag "fiuba" del header hace que se muestren los repos que no tienen código de materia configurado
  const [fiubaOnly, setFiubaOnly] = React.useState(false);
  const [sortOption, setSortOption] = React.useState(sortOptions[1]);

  const shownRepos = React.useMemo(() => {
    if (fiubaOnly) {
      return repos
        .filter(
          (r) =>
            !materias
              .flatMap((m) => m.codigos)
              .some((c) => r.repoData.topics.includes(c)),
        )
        .sort(sortOption.sortFn);
    } else if (materiaSelected) {
      return repos
        .filter((r) =>
          materiaSelected.codigos.some((c) => r.repoData.topics.includes(c)),
        )
        .sort(sortOption.sortFn);
    } else {
      return repos.sort(sortOption.sortFn);
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
            <SortFeature sortOption={sortOption} setSortOption={setSortOption} />
            <RepoCards repoDetails={shownRepos} />
          </Center>
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

const SortFeature = ({ sortOption, setSortOption }) => {
  return (
    <Tooltip label={`Ordenado por ${sortOption.longName}`}>
      <IconButton
        position="absolute"
        top="0"
        right="0"
        variant="link"
        colorScheme="purple"
        p="2"
        aria-label={`Repositorios ordenados por ${sortOption.longName}`}
        icon={sortOption.icon}
        onClick={() => {
          setSortOption(
            sortOption.shortName === sortOptions[0].shortName ? sortOptions[1] : sortOptions[0]
          );
        }}
      />
    </Tooltip>
  );
};

const sortOptions = [
  {
    shortName: "pushed_at",
    longName: "más reciente",
    icon: <TimeIcon />,
    sortFn: (a, b) => {
      return b.repoData["pushed_at"].localeCompare(a.repoData["pushed_at"]);
    },
  },
  {
    shortName: "stargazers_count",
    longName: "más estrellas",
    icon: <StarIcon />,
    sortFn: (a, b) => {
      return b.repoData["stargazers_count"] - a.repoData["stargazers_count"];
    },
  },
];

export default Repos;
