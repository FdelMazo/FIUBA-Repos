import {
  Box,
  Text,
  Flex,
  Heading,
  Icon,
  SimpleGrid
} from "@chakra-ui/react";
import React from "react";
import { DataContext } from "../Contexts";
import LoadingGraph from "./Loading";
import { ReactComponent as RepoIcon } from "./react-gh-repo-cards/github-utils/repo.svg";

const Materias = ({ materiaSelected, setMateriaSelected }) => {
  const { materias } = React.useContext(DataContext);

  return (
    <SimpleGrid
      m={8}
      columns={materias.length ? 2 : 1}
      w="90%"
      h="60vh"
      spacing={4}
      overscrollBehaviorY="contain"
      overflowY='auto'
      border="1px dashed purple"
      borderRadius={8}
    >
      {materias.length ? (
        <>
          {materias.sort((a, b) => b.count - a.count).map(m => (
            <Box
              m={4}
              borderRadius={6}
              p={8}
              boxShadow={materiaSelected === m.codigo ? "0 0 0 2px violet" : "lg"}
              key={m.codigo}
              onClick={() => {
                if (materiaSelected === m.codigo) {
                  setMateriaSelected(null);
                } else {
                  setMateriaSelected(m.codigo);
                }
              }}
            >
              <Flex justifyContent="space-between">
                <Text color="purple">
                  {m.codigo}
                </Text>
                <Flex alignItems="center">
                  <Text fontWeight={600}>
                    {m.count}
                  </Text>
                  <Icon as={RepoIcon} w={5} h={5} />
                </Flex>
              </Flex>
              <Heading fontSize="lg" fontWeight={600}>
                {m.nombre}
              </Heading>
            </Box>
          ))}
        </>
      ) : (
        <LoadingGraph />
      )}
    </SimpleGrid>
  );
};

export default Materias;
