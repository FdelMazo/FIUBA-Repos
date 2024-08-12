import os

# Obtener la ruta absoluta del directorio actual del script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construir las rutas absolutas
materias_a_subir_path = os.path.join(script_dir, "materias-a-subir.json")
materias_path = os.path.abspath(os.path.join(script_dir, "../materias.json"))

import json

with (
    open(materias_a_subir_path, "r", encoding='utf-8') as archivo_materias_a_subir,
    open(materias_path, "r", encoding='utf-8') as archivo_materias
):
    materias_a_subir = json.load(archivo_materias_a_subir)
    materias = json.load(archivo_materias)
    for key, value in materias_a_subir.items():
        materias[key] = value

with open(materias_path, "w", encoding='utf-8') as archivo_materias:
    json.dump(materias, archivo_materias, ensure_ascii=False, indent=2)