import React from "react";
import {
  Box,
  Heading,
  Text,
  Code,
  Link,
} from '@chakra-ui/react';

const Header = () => {
  return (
    <Box mt={16}>
      <Heading
        fontWeight={600}
        fontSize={'6xl'}
      >
        FIUBA-Repos
      </Heading>
      <Text color={'gray.600'}>
        Es sencillo: si tenés TPs, parciales, finales, lo que sea de una materia subido a Github, andá al repo y agregale el topic <Link isExternal href='https://github.com/topics/fiuba'><Code colorScheme="purple">fiuba</Code></Link> y el código de la materia (ej: <Code colorScheme="purple">7541</Code>).
      </Text>

      <Text color={'gray.600'}>
        De a poquito vamos armando esta pseudo wiki donde todos podamos compartir nuestro conocimiento.
      </Text>

      <Text color={'gray.600'}>
        Bonus points si en la descripción escribís que cuatrimestre la cursaste y que contiene el repo!
      </Text>

      <Text color={'gray.600'} fontSize="sm">
        Si tenés alguna sugerencia, mandame un mail! <Code colorScheme="blue" fontSize="xs">fdelmazo at fi.uba.ar</Code>
      </Text>
    </Box >
  );
}

export default Header;
