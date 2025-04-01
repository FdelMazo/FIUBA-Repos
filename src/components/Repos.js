import { Search2Icon, StarIcon, TimeIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Code,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Loading from "./Loading";
import RepoCards from "./react-gh-repo-cards";

const Repos = ({ materiaSelected, repos, materias, partialLoading }) => {
  // Obscure func: tocar en el tag "fiuba" del header hace que se muestren los repos que no tienen código de materia configurado
  const [fiubaOnly, setFiubaOnly] = React.useState(false);
  const [sortOption, setSortOption] = React.useState(sortOptions[0]);
  const [nombreFilter, setNombreFilter] = React.useState("");
  const [languageFilter, setLanguageFilter] = React.useState("");

  React.useEffect(() => {
    setLanguageFilter("")
  }, [materiaSelected])

  const shownRepos = React.useMemo(() => {
    let reposToShow = repos;
    if (fiubaOnly) {
      reposToShow = repos.filter(
        (r) =>
          !materias
            .flatMap((m) => m.codigos)
            .some((c) => r.repoData.topics.includes(c.toLowerCase())),
      );
    } else if (materiaSelected) {
      reposToShow = repos.filter((r) =>
        materiaSelected.codigos.some((c) =>
          r.repoData.topics.includes(c.toLowerCase()),
        ),
      );
    }

    if (languageFilter) {
      reposToShow = reposToShow.filter(r => r.language === languageFilter);
    }

    if (nombreFilter) {
      reposToShow = reposToShow.filter(
        (r) =>
          r.user.toLowerCase().includes(nombreFilter.toLowerCase()) ||
          r.description?.toLowerCase().includes(nombreFilter.toLowerCase()) ||
          r.repoName.toLowerCase().includes(nombreFilter.toLowerCase()),
      );
    }

    return reposToShow.sort(sortOption.sortFn);
  }, [materiaSelected, repos, materias, fiubaOnly, sortOption, nombreFilter, languageFilter]);

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
      <InputGroup my={2}>
        <InputLeftElement
          pointerEvents="none"
          as={Button}
          variant="ghost"
          color="purple.400"
          children={<Search2Icon />}
        />
        <Input
          borderColor="purple"
          focusBorderColor="violet"
          _hover={{
            borderColor: "violet",
          }}
          color="gray.600"
          bg={useColorModeValue("purple.50", "purple.100")}
          placeholder="Repositorios"
          _placeholder={{ opacity: 0.5, color: "purple.900" }}
          value={nombreFilter}
          onChange={(event) => setNombreFilter(event.target.value)}
        />
      </InputGroup>

      <Box
        p={8}
        pt={0}
        overscrollBehaviorY="contain"
        overflowY="auto"
        border="1px dashed purple"
        borderRadius={8}
        h="100%"
        my={2}
        bg={useColorModeValue("purple.50", "purple.100")}
      >
        {shownRepos.length ? (
          <>
            <SortFeature
              sortOption={sortOption}
              setSortOption={setSortOption}
              languageFilter={languageFilter}
              setLanguageFilter={setLanguageFilter}
              repos={shownRepos}
            />
            <RepoCards repoDetails={shownRepos} />
          </>
        ) : (
          <Center height="100%" gap={2}>
            {partialLoading ? (
              <Loading />
            ) : (
              <NoReposMessage codigos={materiaSelected?.codigos || []} />
            )}
          </Center>
        )}
      </Box>
    </Box>
  );
};

const SortFeature = ({ sortOption, setSortOption, languageFilter, setLanguageFilter, repos }) => {
  const uniqueLanguages = React.useMemo(() => {
    return [...new Set(repos.filter(repo => !!repo.language).map(repo => repo.language))].sort()
  }, [repos])

  return (
    <Box
      position="sticky"
      top={0}
      left={0}
      right={0}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={4}
      pt={4}
      bg={useColorModeValue("purple.50", "purple.100")}
      borderTopRadius={8}
      zIndex={10}
      width="100%"
      marginX="auto"
    >
      <Select
        fontSize="sm"
        colorScheme="purple"
        value={languageFilter}
        onChange={(e) => setLanguageFilter(e.target.value)}
        placeholder="Todos los lenguajes"
        w="fit"
        bg={useColorModeValue("white", "purple.200")}
        _hover={{
            bg: useColorModeValue("purple.100", "purple.300")
        }}
      >
        {uniqueLanguages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </Select>

      <Tooltip label={`Ordenado por ${sortOption.longName}`}>
        <IconButton
          size="sm"
          variant="ghost"
          colorScheme="purple"
          aria-label={`Repositorios ordenados por ${sortOption.longName}`}
          icon={sortOption.icon}
          onClick={() => {
            setSortOption(
              sortOption.shortName === sortOptions[0].shortName
                ? sortOptions[1]
                : sortOptions[0],
            );
          }}
        />
      </Tooltip>
    </Box>
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

const NoReposMessage = ({ codigos }) => (
  <div>
    {codigos.length >= 1 ? (
      <p>
        Esta materia aún no tiene repositorios. <br /> Agregá el primero con
        {codigos.length === 1 ? " el tag" : " cualquiera de los tags"}
        {codigos.map((c) => (
          <Code key={c} mx={1} textIndent={0} colorScheme="purple">
            {c}
          </Code>
        ))}
      </p>
    ) : (
      <p>
        No hay repositorios que coincidan con la búsqueda. <br />
        Agregá el primero con su tag correspondiente.
      </p>
    )}
  </div>
);

export default Repos;
