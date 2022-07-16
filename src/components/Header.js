import React from "react";
import {
  Box,
  Heading,
  Text,
  Code,
  Link,
  ListItem,
  List,
  Tooltip,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { DataContext } from "../Contexts";

const Header = () => {
  const { repos } = React.useContext(DataContext);
  return (
    <Box mt={10}>
      <Heading
        fontWeight={600}
        fontSize={'6xl'}
      >
        FIUBA-Repos
        <Link
          isExternal
          href="https://github.com/FdelMazo/FIUBA-Repos"
        >
          <Icon boxSize={10} mx={4} viewBox="0 0 16 16" color="purple.500" _hover={{ color: 'purple.600' }}>
            <path
              fill="currentColor"
              d="M7.999,0.431c-4.285,0-7.76,3.474-7.76,7.761 c0,3.428,2.223,6.337,5.307,7.363c0.388,0.071,0.53-0.168,0.53-0.374c0-0.184-0.007-0.672-0.01-1.32 c-2.159,0.469-2.614-1.04-2.614-1.04c-0.353-0.896-0.862-1.135-0.862-1.135c-0.705-0.481,0.053-0.472,0.053-0.472 c0.779,0.055,1.189,0.8,1.189,0.8c0.692,1.186,1.816,0.843,2.258,0.645c0.071-0.502,0.271-0.843,0.493-1.037 C4.86,11.425,3.049,10.76,3.049,7.786c0-0.847,0.302-1.54,0.799-2.082C3.768,5.507,3.501,4.718,3.924,3.65 c0,0,0.652-0.209,2.134,0.796C6.677,4.273,7.34,4.187,8,4.184c0.659,0.003,1.323,0.089,1.943,0.261 c1.482-1.004,2.132-0.796,2.132-0.796c0.423,1.068,0.157,1.857,0.077,2.054c0.497,0.542,0.798,1.235,0.798,2.082 c0,2.981-1.814,3.637-3.543,3.829c0.279,0.24,0.527,0.713,0.527,1.437c0,1.037-0.01,1.874-0.01,2.129 c0,0.208,0.14,0.449,0.534,0.373c3.081-1.028,5.302-3.935,5.302-7.362C15.76,3.906,12.285,0.431,7.999,0.431z"
            />
          </Icon>
        </Link>
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.200')}>
        Cuando fue la última vez que dijiste "uh, a ver los TPs del cuatri pasado de Numérico..." y te costó encontrarlos? Exacto! Porque nos falta poder clasificar todos los repos de FIUBA.
      </Text>

      <Text color={useColorModeValue('gray.600', 'gray.200')}>
        Entonces, te pido ayuda con dos cosas:
      </Text>
      <List color={useColorModeValue('gray.600', 'gray.200')}>
        <ListItem>
          <Text as="span" color='purple' fontWeight={600} mx={2}>◆</Text>
          Si tenés algun repo con material de FIUBA <Text as="span" color='purple' fontWeight={600}>➔</Text> Agregalo a esta página!
        </ListItem>
        <ListItem>
          <Text as="span" color='purple' fontWeight={600} mx={2}>◆</Text>
          Si tenés compañeros de FIUBA <Text as="span" color='purple' fontWeight={600}>➔</Text> Compartiles esta página!
        </ListItem>
      </List>

      <Text color={useColorModeValue('gray.600', 'gray.200')}>
        Agregar tu repo es sencillo: si tenés TPs, parciales o finales de una materia subido a Github, solo hay que agregale el topic <Tooltip label={repos.length ? `${repos.length} repos` : ''} hasArrow placement='top'><Link isExternal href='https://github.com/topics/fiuba'><Code colorScheme="purple">fiuba</Code></Link></Tooltip> y el código de la materia (ej: <Code colorScheme="purple">7541</Code>). Los topics se editan desde la página principal del repo, a la derecha (donde se cambia la descripción).
      </Text>

      <Text color={useColorModeValue('gray.600', 'gray.200')}>
        Bonus points si en la descripción del repo escribís que cuatrimestre la cursaste y que contiene el repo!
      </Text>

      <Text color={useColorModeValue('gray.600', 'gray.200')} fontSize="sm">
        Si tenés alguna sugerencia, abrime un  <Link isExternal href='https://github.com/FdelMazo/FIUBA-Repos/issues/new'><Code colorScheme="blue" fontSize="xs">issue!</Code></Link>
      </Text>
    </Box >
  );
}

export default Header;
