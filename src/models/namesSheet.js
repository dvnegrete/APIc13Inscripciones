import { config } from "../config/index.js";

export const nameSheet = {
    sheetCourses: "Cursos",
    sheetHomePage: "anunciosHomePage",
    sheetImage: "imagenes",
    sheetQuestions: "preguntas",
    sheetInscriptions: config.sheetPreinscript,
    sheetNumberControl: config.sheetMatricula,
  
    /**
     * PRODUCTION
     * sheetInscriptions: "preinscripciones",
     * sheetNumberControl: "matricula",
     *
     * DEVELOPMENT
     * sheetNumberControl: "pruebaMatricula"
     * sheetInscriptions: "pruebaPreinscripciones"
     */

  };
  