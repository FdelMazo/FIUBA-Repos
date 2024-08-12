const periodos = document.querySelectorAll("[periodo]");
const data = new Map()

periodos.forEach(periodo => {
  const materias = periodo.querySelectorAll("[actividad]")
  materias.forEach(materia => {
    const indiceParentesis = materia.getAttribute("actividad").indexOf("(");
    const materiaId = materia.getAttribute("actividad").slice(indiceParentesis + 1, -1);
    const materiaName = materia.getAttribute("actividad").slice(0, indiceParentesis).trim();
    data.set(materiaId, materiaName);
  })
})
console.log(Object.fromEntries(data))