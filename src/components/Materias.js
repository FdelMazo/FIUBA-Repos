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
  Button,
} from "@chakra-ui/react";
import React from "react";
import LoadingGraph from "./Loading";
import LoadingBar from "./LoadingBar";
import { ReactComponent as RepoIcon } from "./react-gh-repo-cards/github-utils/repo.svg";

const Materias = ({
  materias,
  materiaSelected,
  setCodigoSelected,
  partialLoading,
}) => {
  const [nombreFilter, setNombreFilter] = React.useState("");
  const shownMaterias = React.useMemo(() => {
    return materias
      .sort((a, b) => b.reponames.length - a.reponames.length)
      .filter((m) => {
        if (nombreFilter) {
          // Si se escribe en el buscador, que solo aparezcan materias que incluyen el nombre o codigo buscado
          function normalize(texto) {
            return texto
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .toLowerCase();
          }
          const f = normalize(nombreFilter);
          const filterInName = normalize(m.nombre).includes(f);
          const filterInCodes = m.codigos.some((c) => c.includes(f));
          return filterInName || filterInCodes;
        } else {
          // Si NO se escribe en el buscador, que solo aparezcan materias que SI tienen repositorios
          return m.reponames.length !== 0;
        }
      });
  }, [materias, nombreFilter]);

  return (
    <Flex direction="column">
      <InputGroup my={2}>
        <InputLeftElement
          pointerEvents="none"
          as={Button}
          variant="ghost"
          isLoading={partialLoading}
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
          placeholder="Materia"
          _placeholder={{ opacity: 0.5, color: "gray.900" }}
          value={nombreFilter}
          onChange={(event) => setNombreFilter(event.target.value)}
        />
      </InputGroup>

      <SimpleGrid
        columns={materias.length ? 2 : 1}
        h="56vh"
        spacing={4}
        overscrollBehaviorY="contain"
        overflowY="auto"
        // For some reason, this seems to be <darkvalue>,<lightvalue>
        border={useColorModeValue("1px dashed purple", "")}
        borderRadius={8}
        position="relative" // Needed for the loading bar
        overflowX="hidden" // Needed for the loading bar
        bg={useColorModeValue("purple.50", "purple.100")}
      >
        {materias.length ? (
          <>
            {partialLoading && <LoadingBar />}
            {shownMaterias.map((m) => (
              <Box
                maxH="130px"
                m={4}
                borderRadius={6}
                p={8}
                bg="white"
                cursor="pointer"
                _hover={{
                  bg: "whiteAlpha.700",
                }}
                transitionDuration="100ms"
                boxShadow={
                  materiaSelected?.nombre === m.nombre
                    ? "0 0 0 2px violet"
                    : "lg"
                }
                key={m.nombre}
                onClick={() => {
                  if (materiaSelected?.nombre === m.nombre) {
                    setCodigoSelected(null);
                  } else {
                    setCodigoSelected(m.codigos[0]);
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
                      {m.reponames.length}
                    </Text>
                    <Icon as={RepoIcon} w={5} h={5} color="gray.800" />
                  </Flex>
                </Flex>
                <Heading
                  noOfLines={[1, 2, 3]}
                  fontSize="lg"
                  fontWeight={600}
                  color="gray.800"
                >
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
