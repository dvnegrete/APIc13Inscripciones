import { config } from "../config/index.js";

export const nameSheet = {
  sheetCourses: "Cursos",
  sheetHomePage: "anunciosHomePage",
  sheetImage: "imagenes",
  sheetQuestions: "preguntas",
  /**
   * PRODUCTION
   * sheetInscriptions: "preinscripciones",
   *
   * DEVELOPMENT
   * sheetInscriptions: "pruebaPreinscripciones"
   */
  sheetInscriptions: config.sheetPreinscript,
};
