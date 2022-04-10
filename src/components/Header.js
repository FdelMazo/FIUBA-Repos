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
      </Heading>
      <Text color={'gray.600'}>
        Cuando fue la última vez que dijiste "uh, a ver los TPs del cuatri pasado de Númerico..." y te costó encontrarlos? Exacto! Porque nos falta poder clasificar todos los repos de FIUBA.
      </Text>

      <Text color={'gray.600'}>
        Entonces, te pido ayuda con dos cosas:
        <List>
          <ListItem>
            <Text as="span" color='purple' fontWeight={600} mx={2}>◆</Text>
            Si tenés algun repo con material de FIUBA <Text as="span" color='purple' fontWeight={600}>➔</Text> Agregalo a esta página!
          </ListItem>
          <ListItem>
            <Text as="span" color='purple' fontWeight={600} mx={2}>◆</Text>
            Si tenés compañeros de FIUBA <Text as="span" color='purple' fontWeight={600}>➔</Text> Compartiles esta página!
          </ListItem>
        </List>
      </Text>

      <Text color={'gray.600'}>
        Agregar tu repo es sencillo: si tenés TPs, parciales o finales de una materia subido a Github, solo hay que agregale el topic <Tooltip label={repos.length ? `${repos.length} repos` : ''} hasArrow placement='top'><Link isExternal href='https://github.com/topics/fiuba'><Code colorScheme="purple">fiuba</Code></Link></Tooltip> y el código de la materia (ej: <Code colorScheme="purple">7541</Code>). Los topics se editan desde la página principal del repo, a la derecha (donde se cambia la descripción).
      </Text>

      <Text color={'gray.600'}>
        Bonus points si en la descripción del repo escribís que cuatrimestre la cursaste y que contiene el repo!
      </Text>

      <Text color={'gray.600'} fontSize="sm">
        Si tenés alguna sugerencia, mandame un mail! <Code colorScheme="blue" fontSize="xs">fdelmazo at fi.uba.ar</Code>
      </Text>
    </Box >
  );
}

export default Header;
