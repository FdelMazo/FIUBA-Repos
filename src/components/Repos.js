import { Box, Heading, Code } from "@chakra-ui/react";
import React from "react";
import { DataContext } from "../Contexts";
import RepoCards from "./react-gh-repo-cards";

const Repos = ({ materiaSelected }) => {
  const { repos } = React.useContext(DataContext);
  const [shownRepos, setShownRepos] = React.useState(repos);

  React.useEffect(() => {
    if (materiaSelected) {
      setShownRepos(repos.filter(r => r.repoData.topics.includes(materiaSelected)));
    } else {
      setShownRepos(repos);
    }
  }, [materiaSelected, repos]);

  return (
    <Box mt={28} w="90%" h="80vh">
      <Heading fontWeight={600} fontSize='4xl'>
        Repositorios con topics{" "}
        <Code colorScheme="purple" fontSize="2xl">fiuba</Code>
        {" "}
        <Code colorScheme="purple" fontSize="2xl">{materiaSelected}</Code>
      </Heading>
      <Box
        p={8}
        overscrollBehaviorY="contain"
        overflowY='auto'
        border="1px dashed purple"
        borderRadius={8}
        h="80%"
      >
        {shownRepos.length > 0 && (
          <RepoCards repoDetails={shownRepos} />
      )}
      </Box>
    </Box>
  );
};

export default Repos;
