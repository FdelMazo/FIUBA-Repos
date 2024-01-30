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

const Repos = ({ materiaSelected, repos, materias }) => {
  // Obscure func: tocar en el tag "fiuba" del header hace que se muestren los repos que no tienen código de materia configurado
  const [fiubaOnly, setFiubaOnly] = React.useState(false);

  const shownRepos = React.useMemo(() => {
    if (fiubaOnly) {
      return repos.filter(
        (r) =>
          !materias
            .flatMap((m) => m.codigos)
            .some((c) => r.repoData.topics.includes(c)),
      );
    } else if (materiaSelected) {
      return repos.filter((r) =>
        materiaSelected.codigos.some((c) => r.repoData.topics.includes(c)),
      );
    } else {
      return repos;
    }
  }, [materiaSelected, repos, materias, fiubaOnly]);

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
        bg={useColorModeValue("purple.50", "purple.100")}
      >
        {repos.length ? (
          <Center>
            <RepoCards repoDetails={shownRepos} />
          </Center>
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

export default Repos;
