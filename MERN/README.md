## Sobre este repositorio
Aquí se subirán los diferentes ejercicios del curso **MERN** de **OpenBootCamp**.

Este curso cuenta con un proyecto al que se va uniendo pedazos por cada ejercicio.

## Sobre este proyecto
* Para el tema de autenticación, se hace uso de la tecnología **JWT**.
* La base de datos **MongoDB** usa tres entidades: **users**, **katas** y **auth**.
  * Además, utiliza dos colecciones: una con los datos de los usuarios, y otra con los katas (retos de programación).
* Para poder acceder a las rutas de las APIs, el usuario **debe estar registrado** y acto seguido **tiene que iniciar sesión**.
* Cuando un usuario crea una "kata", se guarda el ID dentro del array de katas del usuario, y se borra de ese array cuando se borra esa kata.
* El usuario que ha iniciado sesión sólo podrá crear, modificar y borrar sus propias katas, no las de otros usuarios.
