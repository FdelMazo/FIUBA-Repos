import {
  Box,
  Text,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  HStack
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
      bg="purple.50"
    >
      {materias.length ? (
        <>
          {materias.sort((a, b) => b.count - a.count).map(m => (
            <Box
              m={4}
              borderRadius={6}
              p={8}
              bg="white"
              boxShadow={materiaSelected?.nombre === m.nombre ? "0 0 0 2px violet" : "lg"}
              key={m.nombre}
              onClick={() => {
                if (materiaSelected?.nombre === m.nombre) {
                  setMateriaSelected(null);
                } else {
                  setMateriaSelected(m);
                }
              }}
            >
              <Flex justifyContent="space-between">
                <HStack>
                  {m.codigos.map(c => (
                    <Text color="purple" fontWeight={600} key={c}>
                      {c}
                    </Text>
                  ))}
                </HStack>

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
