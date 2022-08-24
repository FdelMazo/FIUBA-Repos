import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  HStack,
  Input,
  useColorModeValue,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";
import { DataContext } from "../Contexts";
import LoadingGraph from "./Loading";
import { ReactComponent as RepoIcon } from "./react-gh-repo-cards/github-utils/repo.svg";

const Materias = ({ materiaSelected, setMateriaSelected }) => {
  const [nombreFilter, setNombreFilter] = React.useState("");
  const handleNombreChange = (event) => setNombreFilter(event.target.value);
  const { materias } = React.useContext(DataContext);

  return (
    <Flex direction="column">
      <InputGroup my={2} w="24ch">
        <InputLeftElement
          pointerEvents='none'
          children={<Search2Icon color='purple.300' />}
        />
        <Input
          borderColor="purple"
          focusBorderColor="violet"
          _hover={{
            borderColor: "violet",
          }}
          bg={useColorModeValue("purple.50", "purple.200")}
          placeholder="Materia"
          _placeholder={{ opacity: 0.5, color: "purple.900" }}
          value={nombreFilter}
          onChange={handleNombreChange}
        />
      </InputGroup>

      <SimpleGrid
        columns={materias.length ? 2 : 1}
        h="56vh"
        spacing={4}
        overscrollBehaviorY="contain"
        overflowY="auto"
        border="1px dashed purple"
        borderRadius={8}
        bg={useColorModeValue("purple.50", "purple.200")}
      >
        {materias.length ? (
          <>
            {materias
              .sort((a, b) => b.reponames.size - a.reponames.size)
              .filter((m) =>
                nombreFilter
                  ? m.nombre.toLowerCase().includes(nombreFilter.toLowerCase())
                  : true
              )
              .map((m) => (
                <Box
                  maxH="130px"
                  m={4}
                  borderRadius={6}
                  p={8}
                  bg="white"
                  boxShadow={
                    materiaSelected?.nombre === m.nombre
                      ? "0 0 0 2px violet"
                      : "lg"
                  }
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
                      {m.codigos.map((c) => (
                        <Text color="purple" fontWeight={600} key={c}>
                          {c}
                        </Text>
                      ))}
                    </HStack>

                    <Flex alignItems="center">
                      <Text fontWeight={600} color="gray.800">
                        {m.reponames.size}
                      </Text>
                      <Icon as={RepoIcon} w={5} h={5} color="gray.800" />
                    </Flex>
                  </Flex>
                  <Heading noOfLines={[1, 2, 3]} fontSize="lg" fontWeight={600} color="gray.800">
                    {m.nombre}
                  </Heading>
                </Box>
              ))}
          </>
        ) : (
          <LoadingGraph />
        )}
      </SimpleGrid>
    </Flex>
  );
};

export default Materias;
