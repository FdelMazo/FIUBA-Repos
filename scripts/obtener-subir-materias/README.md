# Como puedo obtener y subir las materias de mi carrera

> [!TIP]
> Si ya tenes las materias que queres subir anda a la seccion 2

> [!NOTE]
> Como el SIU Guaraní no permite obtener las materias con sus respectivos códigos públicamente, este proceso se tiene que hacer iniciando sesión en el SIU Guarani de FIUBA, ir a oferta de comisiones, agarrar todas las materias con sus códigos y subirlos manualmente.

## Obtener códigos y materias de tu carrera

1. Dirigirte a oferta_comisiones del SIU Guarani de FIUBA (https://guaraniautogestion.fi.uba.ar/g3w/oferta_comisiones)
2. Abrir la consola del inspeccionar (Ctrl + Mayus + i)
3. Copiar el contenido del script "obtenerMateriasdelSiuOfertaComisiones.js" (se encuentra en esta carpeta)
4. Pegarlo en la consola del inspeccionar y ejecutarlo (dependiendo del navegador es presionar Enter o hacer click en un boton)
5. Hacer click derecho sobre el arreglo mostrado -> "Copy Object"

## Actualizar json

1. Una vez que tenemos las materias como un objeto de estructura `{ <codigo>: <nombre> }`, sobreescribimos el archivo "materias-a-subir.json" (se encuentra en esta carpeta)
2. Ejecutar el archivo "actualizar_json.py" (una manera sencilla es con el boton de play si estas usando Visual Code)

## Formatear json

1. Ejecutar el archivo "formatear_json.js" (una manera sencilla es con el boton de play si estas usando Visual Code)

## Guardar y subir cambios

1. `git add src/data/materias.json`
2. `git commit -m "materias de la carrera <carrera> añadidas"`
3. `git push origin master`
4. Hacer pull request (desde github) a [fDelMazo/FIUBA-Repos](https://github.com/FdelMazo/FIUBA-Repos)