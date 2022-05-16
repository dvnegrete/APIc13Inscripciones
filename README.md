# APIc13Inscripciones
Backend para inscripciones en linea del CECATI 13

# Proceso de pre-inscripción
Todas  las consultas serán al endpoint : /API/v1/inscription

## caso 1: primera inscripcion de estudiante en el plantel.
sub-endpoint:  /isStudent
1. Valida que sea una CURP valida.
2. Mediante la CURP se busca en "PREINSCRIPCION" en Gsheets si existe algun pre-registro.
3. Si no existe una preinscripción, busca al estudiante en BD Firestore y/o GSheets "estudiantes".
4. Si no existe ningun registro enviar a Fronted: "newRegister" (continua en 1A). Si encuentra un registro envia a Frontend: "dbRegister" (continua en 1B).

### caso 1A : (en Front: newRegister) nuevo estudiante.
sub-endpoint:  /preregister/newStudent
1. Con los datos recibidos construir CURP y compara con la CURP enviada.
2. if(CURP) es false, enviar el Frontend mensaje: "error: datos_personales".
3. if(CURP) es true, validar documentación quiza usando Machine Learning con los documentos cargados (opcional).
4. Todos los datos recibidos se almacenaran en GSheets "PREINSCRIPCION" incluyendo un campo "nuevo_estudiante" con valor de: 1. Tambien los links a Storage de Firebase para los documentos solicitados.
5. Si no hay ningún error devuelve a FrontEND: "successfulPreInscription".
6. Cuando el plantel haga las ultimas validaciones de la documentación se le notificara al estudiante para continuar su inscripción.
6. (pendiente que hacer si documentos no son validos).

### caso 1B : (en Front: dbRegister) estudiante ya ha tomado cursos en el plantel.
1. Junto con la indicación de desplegar formulario: "dbRegister" se envian algunos de los datos personales encriptados (bcrypt).
2. Usuario indica si quiere actualizar algun dato personal desde su ultima inscripcion.
3. Backend puede recibir 1 de 3 opciones por vez: updateContact, updateAddress, updateSchool.
    1. updateContact : actualizar en BD los datos de contacto y regresar a FRONT: "successfulUpdateContact"
    (se realizan las validaciones necesarias en cada campo)
    sub-endpoint:  /preregister/dbStudent/updateContact

    2. updateAddress : actualizar domicilio en BD y regresar a FRONT: "successfulUpdateAddress"
    (se realizan las validaciones necesarias en cada campo)
    sub-endpoint:  /preregister/dbStudent/updateAddress

    3. updateSchool : actualizar maximo grado de estudios  y regresar a FRONT: "successfulUpdateSchool"
    (se realizan las validaciones necesarias en cada campo)
    sub-endpoint:  /preregister/dbStudent/updateSchool.

4. El front mostrara 3 veces maximo la opcion de permitir actualizar algún dato y luego solo mostrara boton de preinscribir.
5. Backend recibe información, desencripta datos personales y registra en GSheets "PREINSCRIPCION". incluyendo un campo "nuevo_estudiante" con valor de: 0.
6. Si no hay ningún error devuelve a FrontEND: "successfulPreInscription".
7. Cuando el plantel haga las ultimas validaciones de la documentación se le notificara al estudiante para continuar su inscripción.
7. (pendiente que hacer si documentos no son validos).

## caso 2 : Completar inscripcion en plantel.
sub-endpoint:  /isStudent
1. Valida que sea una CURP valida.
2. Mediante la CURP se busca en "PREINSCRIPCION" en Gsheets si existe algun registro, y se encuentra que si hay una preinscripcion.
3. GSheets regresa toda la información de este pre-registro y manda al FRONTED: "continueRegistration", con la mayor parte de datos encriptados (bcrypt).
4. Usuario captura datos de pago, e información para completar su registro.
4. Frontend envia registro a:
sub-endpoint: /registration
5. Evaluar campo "nuevo_estudiante". Si el valor es 0 continuar en caso 2A. Si el valor es 1 continuar en caso 2B.

### caso 2A : Completar inscripcion en plantel. Estudiante con otros cursos en plantel. Campo "nuevo_estudiante" = 0
(falta como comprobar pago)
1. Añadir información del nuevo curso en BD FIRESTORE.
2. Añadir registro en GSheet INSCRIPCIONES, con todos los campos requeridos junto con la información de pago.
3. Buscar y eliminar registro en GSheet "PREINSCRIPCION".
4. Enviar a Frontend: "success"

### caso 2B : Completar inscripcion en plantel. Nuevo Estudiante. Campo "nuevo_estudiante" = 1
(falta como comprobar pago)
1. Asignar matricula. Busca ultimo registro en GSheets "MATRICULAS" y suma 1.
2. Busca la matricula asignada para asegurar no repetir registro. Si no existe error asigna matricula junto con toda la información del pre-registro.
3. Añadir nuevo registro/documento en BD FIRESTORE.
4. Añadir registro en GSheet INSCRIPCIONES, con todos los campos requeridos junto con la información de pago.
5. Buscar y eliminar registro en GSheet "PREINSCRIPCION".
6. Enviar a Frontend: "success"

