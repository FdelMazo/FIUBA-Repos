// Para obtener las materias de tu carrera solamente hay que correr este script en inspeccionar -> consola en oferta_comisiones del SIU Guarani de FIUBA (https://guaraniautogestion.fi.uba.ar/g3w/oferta_comisiones)

const periodos = document.querySelectorAll("[periodo]");
const data = new Map()
const capitalizeFirstSentenceLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
const capitalizeFirstWordLetter = (string) => string.split(" ").map((word)=> capitalizeFirstSentenceLetter(word)).join(" ");


periodos.forEach(periodo => {
  const materias = periodo.querySelectorAll("[actividad]")
  materias.forEach(materia => {
    const indiceParentesis = materia.getAttribute("actividad").indexOf("(");
    const materiaId = materia.getAttribute("actividad").slice(indiceParentesis + 1, -1);
    const materiaName = materia.getAttribute("actividad").slice(0, indiceParentesis).trim();
    data.set(materiaId, capitalizeFirstWordLetter(materiaName));
  })
})
console.log(Object.fromEntries(data))

// Luego solo hay que hacer click derecho sobre lo imprimido por consola y "Copiar Objeto"

// Este objeto lo 

