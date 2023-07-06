# APIc13Inscripciones
Backend para inscripciones en linea del CECATI 13

### /API/v1/students
    POST    /API/v1/students/typeRegister
    POST    /newStudent/dataGeneral
    POST    /newStudent/inscription
    POST    /DBStudent
    POST    /files

### /API/v1/frontendURL
    GET     /API/v1/frontendURL/imageHomePage
    GET     /API/v1/frontendURL/:id

    Hojas de SpreedSheets por ID. (Id proporcionado desde el Frontend)
    10 => Cursos
    30 => Preguntas
    40 => Imágenes
    50 => Información Home Page

### /API/v1/controlStudents
Autenticacion con Passport
    POST    /API/v1/controlStudents/oauth
    GET     /API/v1/controlStudents/listBlobs/:container
    GET     /API/v1/controlStudents/file/:filename
    POST    /API/v1/controlStudents/fileInformation

### /API/v1/specialitie
    POST    /API/v1/specialitie/created
    POST    /API/v1/specialitie/update
    PATCH   /API/v1/specialitie/:id
#### Endpoind en pruebas y mantenimiento

### /API/v1/c196
    GET     /API/v1/c196

#### endpoints NO USADOS:
    /API/v1/inscription 
Conexion a Firebase preparada y probada.

    POST    /API/v1/inscription/isStudent
    POST    /API/v1/inscription//newStudent/dataGeneral
    POST    /API/v1/inscription/dbStudent
    POST    /API/v1/inscription/register