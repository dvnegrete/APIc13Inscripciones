import {
  generateCURP,
  compareDigitVerifyCurp,
  messageDuplicity,
  messageErrorCurp,
  validateCURP,
  gender,
} from "../utils/curp.js";
import { datetime } from "../utils/date.js";

import { nameSheet } from "../models/namesSheet.js";
const { sheetInscriptions, sheetNumberControl } = nameSheet;
import { nameContainer } from "../models/containerAzure.js";

import { database } from "../database/mysql.js";
import { Estudiantes } from "../database/models/estudiantes.model.js";
import { Domicilios } from "../database/models/domicilios.model.js";
import {
  getExistStudentQuery,
  getStudentNumberControlQuery,
  getStudentQuery,
  getVoucherAddress,
  getVoucherStudent,
  generateNumberControlQuery,
  typeRegisterQuery,
  getNumberControlQuery,
} from "../queries/students.queries.js";

import { postSpreedSheet } from "../libs/spreedsheet.js";
import { uploadBlobStorage } from "../libs/blobsAzure.js";
import { areHideCharacters } from "../utils/hideCharacters.js";

export default class Students {
  constructor() {}

  async findTypeRegister(stringCurp) {
    if (validateCURP(stringCurp)) {
      return await this.findForCurp(stringCurp.toUpperCase());
    } else {
      return { message: "Wrong Structure" };
    }
  }

  isCURPValidate(obj) {
    const createCURP = generateCURP(obj);
    const userCURP = obj.curp;
    if (createCURP === userCURP) {
      return {
        curp: obj.curp,
        nombre: obj.nombre,
        a_paterno: obj.a_paterno,
        a_materno: obj.a_materno,
        placeofBirth: obj.estado,
        gender: gender(obj.genero),
        disability: obj.disability,
        birthdate: obj.fechaNacimiento,
        actaNacimientoRender: obj.actaNacimientoRender,
      };
    } else {
      return compareDigitVerifyCurp(userCURP, createCURP)
        ? { curp: false, datacurp: createCURP, message: messageDuplicity }
        : { curp: false, datacurp: createCURP, message: messageErrorCurp };
    }
  }

  async addRegisterDate(body) {
    return {
      ...body,
      fechaRegistro: datetime(),
    };
  }

  async findForCurp(stringCURP) {
    const [results] = await database.query(
      typeRegisterQuery(stringCURP.toUpperCase())
    );
    return results[0];
  }

  async addInscriptionNewStudent(infoInscription) {
    // const [results] = await database.query(
    //   getExistStudentQuery(body.curp.toUpperCase())
    // );
    // if (results.length === 0) {
    //   console.log("Asignar matricula");
    //   const [lastResult] = await database.query(
    //     lastNumberControlQuery(Number(body.annio_course))
    //   );
    //   const { last_matricula } = lastResult[0];
    //   console.log(typeof last_matricula);
    //   return { msg: last_matricula + 1 };
    // } else {
    //   console.log("Inscribir con matricula en la base de datos");
    //   //en results[0] tengo matricula_id y id de estudiantes
    // }
    const { matricula, domicilio, estudiante } = await this.dbSaveRegister(
      infoInscription
    );

    const objUpdate = {
      ...infoInscription,
      matricula,
      fecha_nacimiento: estudiante.fecha_nacimiento,
      apellido_paterno: estudiante.apellido_paterno,
      apellido_materno: estudiante.apellido_materno,
      sexo: estudiante.sexo,
      municipio_alcaldia: domicilio.municipio_alcaldia,
      comprobante_domicilio: domicilio.comprobante_domicilio,
      escolaridad_comprobante: estudiante.escolaridad_comprobante,
      acta_nacimiento: estudiante.acta_nacimiento,
    };
    this.inscription(objUpdate);
    return objUpdate;
  }

  async spreedSheetSaveNumberControl(obj) {
    const newObj = await this.insertSheet(obj, sheetNumberControl);
    await postSpreedSheet(newObj);
  }

  async dbSaveRegister(obj) {
    const [objMatricula] = await database.query(
      generateNumberControlQuery(Number(obj.annio_course))
    );
    const domicilio = await Domicilios.create(Domicilios.conexionFields(obj));
    // Create Empleos, Medio-Informacion and Socioeconomico before Estudiantes.
    const estudiante = await Estudiantes.create(
      Estudiantes.conexionFields(obj, objMatricula.insertId, domicilio)
    );
    const [resNumberControl] = await database.query(
      getNumberControlQuery(objMatricula.insertId)
    );
    const { matricula } = resNumberControl[0];
    return { matricula, domicilio, estudiante };
  }

  async inscription(obj) {
    const newObj = this.insertSheet(obj, sheetInscriptions);
    postSpreedSheet(newObj);
    //mandar correo electronico de confirmación de inscripcion.
  }

  insertSheet(obj, nameSheet) {
    return { ...obj, sheet: nameSheet };
  }

  /**
   *
   * @param {object} body - Contains student information, selected course. "update": boolean (optional), and "indexR" field for the DB
   * @param {boolean} body.update - boolean (optional)
   * @param {string} body.indexR - string. DB SpreedSheet search field   *
   * @returns {{
   *  status: boolean,
   *  update: boolean,
   *  matricula: string,
   *  fechaRegistro: string
   * }}  - Inscription Completed
   */
  async addInscriptionDBStudent(body) {
    if (body.update) {
      const updated = await this.updateDBStudent(body);
      //confirmamos que se actualizo la informacion
      body.update = updated;
    }
    const data = await this.getDataDB(body.curp);
    const newObj = { ...body, ...data };
    const sucessfullyRegister = await this.inscription(newObj);
    return {
      ...sucessfullyRegister,
      //temporal. Hasta el uso de la Tabla Inscripciones
      fechaRegistro: datetime(),
      update: newObj.update,
    };
  }

  async getDataDB(stringCURP) {
    const [results] = await database.query(
      getStudentQuery(stringCURP.toUpperCase())
    );
    return results[0];
  }

  async getDataNControlDB(numberControl) {
    const [results] = await database.query(
      getStudentNumberControlQuery(Number(numberControl))
    );
    return results[0];
  }

  async getVoucher(stringCURP, kind) {
    const query =
      kind === "domicilio"
        ? getVoucherAddress(stringCURP.toUpperCase())
        : getVoucherStudent(stringCURP.toUpperCase(), kind);
    const [results] = await database.query(query);
    return results[0];
  }

  async getStudentDB(stringCURP) {
    return await Estudiantes.findOne({
      where: { curp: stringCURP.toUpperCase() },
      attributes: ["domicilio_id"],
    });
  }

  async updateDBStudent(obj) {
    const cleanObj = areHideCharacters(obj);
    const updates = [];
    const updateStudentsValues = {};
    const updateAdressValues = {};
    /**
     * Pendiente generar funciones para separar codigo
     */
    Object.keys(cleanObj).forEach((key) => {
      if (Estudiantes.fieldsUpdateForStudent.includes(key)) {
        updateStudentsValues[key] = cleanObj[key];
      } else if (Domicilios.fieldsUpdateForStudent.includes(key)) {
        updateAdressValues[key] = cleanObj[key];
      }
    });
    /**
     * Falta verificar todos los nombres de los campos que pueden llegar a ser actualizados
     * pendientes los datos de escolaridad
     */
    if (Object.keys(updateStudentsValues).length > 0) {
      const [countStudent] = await Estudiantes.update(updateStudentsValues, {
        where: { curp: cleanObj.curp },
        limit: 1,
        validate: true,
      });
      updates.push(countStudent);
    }

    if (Object.keys(updateAdressValues).length > 0) {
      const { domicilio_id } = await this.getStudentDB(cleanObj.curp);
      const cleanUpdateAddress = this.setNameAddress(
        cleanObj,
        updateAdressValues
      );
      const [countAdress] = await Domicilios.update(cleanUpdateAddress, {
        where: { id: domicilio_id },
        limit: 1,
        validate: true,
        fields: Object.keys(cleanUpdateAddress),
      });
      updates.push(countAdress);
    }
    return {
      updated: updates.every((item) => item === 1),
    };
  }

  setNameAddress(inscriptionData, updatableValues) {
    if (updatableValues.municipio) {
      Object.defineProperty(updatableValues, "municipio_alcaldia", {
        value: inscriptionData.municipio,
        configurable: true,
        enumerable: true,
        writable: true,
      });
    }
    if (updatableValues.comprobanteDomicilio) {
      Object.defineProperty(updatableValues, "comprobante_domicilio", {
        value: inscriptionData.comprobanteDomicilio,
        configurable: true,
        enumerable: true,
        writable: true,
      });
    }
    return updatableValues;
  }

  /**
   *
   * @param {File[]} files - An Array of binary files to be uploaded
   * @param {string} curp - Name of user
   * @returns {Promise<Object[]>} - A promise that resolves to an array of results from the file uploads.
   */
  async uploadStorageDocs(files, curp) {
    return await Promise.all(
      files.map(async (file) => {
        return await this.uploadFile(file, curp);
      })
    );
  }

  /**
   *
   * @param {File} file - Binary file to be uploaded
   * @param {string} curp - Name to process file upload
   * @returns {Object} - Contains the original property of the file and the url for the database
   */
  async uploadFile(file, curp) {
    const ext = file.mimetype.split("/")[1];
    const nameFile = `${curp}-${file.fieldname}.${ext}`;
    const objInformationBlob = {
      file: file,
      name: nameFile,
      container: nameContainer.proof,
    };
    await uploadBlobStorage(objInformationBlob);
    const url = {};
    Object.defineProperty(url, file.fieldname, {
      value: nameFile,
      enumerable: true,
      writable: true,
      configurable: true,
    });
    return url;
  }
}
