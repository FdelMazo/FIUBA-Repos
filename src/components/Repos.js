import { Box, Heading, Code, Center, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { DataContext } from "../Contexts";
import Loading from "./Loading";
import RepoCards from "./react-gh-repo-cards";

const Repos = ({ materiaSelected }) => {
  const { repos } = React.useContext(DataContext);
  const [shownRepos, setShownRepos] = React.useState(repos);

  React.useEffect(() => {
    if (materiaSelected) {
      setShownRepos(repos.filter(r => materiaSelected.codigos.some(c => r.repoData.topics.includes(c))))
    } else {
      setShownRepos(repos);
    }
  }, [materiaSelected, repos]);

  // Para mostrar repos que no tienen código de materia configurado:
  //   setShownRepos(repos.filter(r =>
  //     !materias.flatMap(m => m.codigos).some(c => r.repoData.topics.includes(c))
  //   ))

  return (
    <Box mt={28} w="90%" h="80vh">
      <Heading fontWeight={600} fontSize='4xl'>
        Repositorios con topics{" "}
        <Code colorScheme="purple" fontSize="2xl">fiuba</Code>
        {materiaSelected?.codigos.map(c => (
          <span key={c}>{" "}<Code colorScheme="purple" fontSize="2xl">{c}</Code></span>
        ))}
      </Heading>
      <Box
        p={8}
        overscrollBehaviorY="contain"
        overflowY='auto'
        border="1px dashed purple"
        borderRadius={8}
        h="80%"
        bg={useColorModeValue("purple.50", "purple.200")}
      >
        {repos.length ? <Center><RepoCards repoDetails={shownRepos} /></Center> : <Loading />}
      </Box>
    </Box>
  );
};

export default Repos;
