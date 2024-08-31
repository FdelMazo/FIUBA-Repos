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

    if (nombreFilter) {
      reposToShow = reposToShow.filter(
        (r) =>
          r.user.toLowerCase().includes(nombreFilter.toLowerCase()) ||
          r.description?.toLowerCase().includes(nombreFilter.toLowerCase()) ||
          r.repoName.toLowerCase().includes(nombreFilter.toLowerCase()),
      );
    }

    return reposToShow.sort(sortOption.sortFn);
  }, [materiaSelected, repos, materias, fiubaOnly, sortOption, nombreFilter]);

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
        overscrollBehaviorY="contain"
        overflowY="auto"
        border="1px dashed purple"
        borderRadius={8}
        h="100%"
        my={2}
        position="relative"
        bg={useColorModeValue("purple.50", "purple.100")}
      >
        {shownRepos.length ? (
          <Center>
            <SortFeature
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
            <RepoCards repoDetails={shownRepos} />
          </Center>
        ) : (
          <Center height="100%" gap={2}>
            {partialLoading ? (
              <Loading />
            ) : (
              <NoReposMessage codigos={materiaSelected.codigos} />
            )}
          </Center>
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
            sortOption.shortName === sortOptions[0].shortName
              ? sortOptions[1]
              : sortOptions[0],
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

const NoReposMessage = ({ codigos }) => (
  <>
    {codigos.length === 1 ? (
      <>
        <p>
          Esta materia no tiene repositorios... Agrega el primero con el tag
        </p>
        <Code textIndent={0} colorScheme="purple">
          {codigos[0]}
        </Code>
      </>
    ) : (
      <div>
        <p>
          Esta materia no tiene repositorios... Agrega el primero con cualquiera
          de los tags...
        </p>
        <Center gap={2}>
          {codigos.map((c) => (
            <Code textIndent={0} colorScheme="purple">
              {c}
            </Code>
          ))}
        </Center>
      </div>
    )}
  </>
);

export default Repos;
