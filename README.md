# MyImp

Interfaz de usuario para un gestor de impresoras.

La implementación del comportamiento en javascript se ha hecho en los ficheros [pmgr](https://github.com/fschiavoni/MyImp/blob/main/js/pmgr.js) y [script](https://github.com/fschiavoni/MyImp/blob/main/js/script.js).

Los siguientes cambios efectuados en esta práctica los enumeraremos a continuación:


## Impresoras 🖨️

- Agregar una impresora rellenando los campos del alias, modelo, localizacion e Ip, envio de peticion al servidor
  y recibiendo respuesta para agregar la impresora.

- Modificar el alias, localizacion e ip de una impresora, envio de peticion al servidor y recibiendo respuesta
  para modificar la impresora.

- Eliminar una impresora o varias impresoras seleccionadas, envio de peticion al servidor y recibiendo respuesta
  para eliminar la impresora/impresoras.

- Modales informativos al usuario cuando agrega, elimina, o modifica una impresora.

- Busqueda dinamica de impresoras mediante las palabras clave del id, alias y modelo.

- Agregado en la cola el numero de trabajos que tiene la impresora.

- Agregado en los grupos el numero de grupos que tiene la impresora



## Trabajos 📁

- Agregar un trabajo seleccionando el archivo y rellenando el nombre del propietario del trabajo, envio de peticion al servidor y recibiendo respuesta para agregar el trabajo.

-  Modificar el nombre del propietario de un trabajo, envio de peticion al servidor y recibiendo respuesta para modificar el trabajo.

- Eliminar un trabajo o varias trabajos seleccionados, envio de peticion al servidor y recibiendo respuesta para eliminar trabajo/trabajos.

- Modales informativos al usuario cuando agrega, elimina, o modifica un trabajo.

- Busqueda dinamica de trabajos mediante las palabras clave del id y nombre del archivo.


## Grupos 👫

- Agregar un grupo rellenando los campos del nombre del grupo, envio de peticion al servidor y recibiendo respuesta para agregar el grupo.

- Modificar el nombre del grupo , envio de peticion al servidor y recibiendo respuesta para modificar el grupo.

- Eliminar un grupo o varias grupos seleccionados, envio de peticion al servidor y recibiendo respuesta para eliminar grupo/grupos.

- Modales informativos al usuario cuando agrega, elimina, o modifica un grupo.

- Busqueda dinamica de grupos mediante las palabras clave del id y nombre del grupo.

- Agregado en impresoras el numero de impresoras que tiene el grupo.

## Cosas que faltan ⏳

- No se puede crear impresora con varios grupos.

- No se puede seleccionar un grupo o varias grupos al crear una impresora.

- No se actualiza la pagina con los datos actualizados en la tabla Impresoras.

- No se puede seleccionar una impresora o varias impresoras al crear un trabajo.

- No se actualiza la pagina con los datos actualizados en la tabla trabajos.

- No se puede crear grupo con varios impresoras.

- No se puede seleccionar una impresora o varias impresoras al crear un grupo.

- No se actualiza la pagina con los datos actualizados en la tabla grupos.



## License
[MIT](https://choosealicense.com/licenses/mit/)
