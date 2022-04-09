import {
  Text
} from "@chakra-ui/react";
import React from "react";
import { DataContext } from "../Contexts";

const Materias = () => {
  const { materias } = React.useContext(DataContext);


  return (
    <Text>
      Lista de materias: {JSON.stringify(materias)}
      {/* Cards por cada materia, ordenadas de alguna manera copada. clickeas una materia, y llena la parte de arriba!
      tambien poner una card para las #fiuba sueltos
      cada materia con un toggle de show/no show? */}
    </Text>
  );
};

export default Materias;
