import os

# Obtener la ruta absoluta del directorio actual del script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construir las rutas absolutas
materias_a_subir_path = os.path.join(script_dir, "materias-a-subir.json")
materias_path = os.path.abspath(os.path.join(script_dir, "../src/data/materias.json"))

import json

def format_name(texto: str):
    words   = texto.split()
    palabras_vacias = ['y','para', 'de', 'del', 'el', 'los', 'la', 'las', 'al', 'su', 'sus', 'en', 'a', 'por', 'no', 'e', 'con']
    nivel = ['I','II','III','IV','V']
    variantes = ['A','B','C']
    excepciones = ['AT', 'SEP']
    

    for index, word in enumerate(words):
        if not word in excepciones:
            if index == len(words)-1 and word.upper() in variantes:
                words[index] = word.upper()
            elif word.upper() in nivel:
                words[index] = word.upper()
            elif word.lower() in palabras_vacias:
                words[index] = word.lower()
            else: 
                words[index] = word.capitalize()
    
    return ' '.join(words)

with open(materias_path, "r", encoding='utf-8') as archivo_materias:
    materias = json.load(archivo_materias)
    for key, value in materias.items():
        materias[key] = format_name(value)

with open(materias_path, "w", encoding='utf-8') as archivo_materias:
    json.dump(materias, archivo_materias, ensure_ascii=False, indent=2)