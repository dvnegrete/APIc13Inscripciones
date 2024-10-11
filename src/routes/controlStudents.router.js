import { Router } from "express";
import passport from "passport";

import {
  checkRole,
  checkRoleAdmin,
  decodeOauthToken,
  msalTokenVerify,
  uploadDocs,
  notTheSameUser,
  userAllowedHandler,
} from "../middlewares/index.js";

import {
  changeTokenUser,
  deleteUserFromSystem,
  getUsers,
  updateRoleUser,
} from "../controller/user.controller.js";
import {
  getFile,
  getListBlobs,
  deleteFile,
  getRegistrationRecord,
  postFileInf,
  deleteFiPdf,
  deleteTableId,
  getInfoSISAE,
} from "../controller/controlStudents.controller.js";

const router = Router();

router.get(
  "/oauth",
  [decodeOauthToken, msalTokenVerify, userAllowedHandler],
  changeTokenUser
);

//users
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  checkRoleAdmin,
  getUsers
);

router.put(
  "/updateRole/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoleAdmin,
  notTheSameUser,
  updateRoleUser
);

router.delete(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoleAdmin,
  notTheSameUser,
  deleteUserFromSystem
);
//users

//control Escolar
router.get(
  "/listBlobs/:container",
  passport.authenticate("jwt", { session: false }),
  checkRole,
  getListBlobs
);

router.get(
  "/registrationRecord",
  passport.authenticate("jwt", { session: false }),
  checkRole,
  getRegistrationRecord
);

router.get(
  "/infosisae/:matricula",
  passport.authenticate("jwt", { session: false }),
  checkRole,
  getInfoSISAE
);

router.delete(
  "/tableId/:table",
  passport.authenticate("jwt", { session: false }),
  checkRole,
  deleteTableId
);

router.get(
  "/file/:filename",
  passport.authenticate("jwt", { session: false }),
  checkRole,
  getFile
);

router.delete(
  "/file/:filename",
  passport.authenticate("jwt", { session: false }),
  checkRole,
  deleteFile
);

router.post(
  "/fileInformation",
  passport.authenticate("jwt", { session: false }),
  uploadDocs,
  checkRole,
  postFileInf
);

router.delete(
  "/fileInformation/:filename",
  passport.authenticate("jwt", { session: false }),
  checkRole,
  deleteFiPdf
);
//control Escolar

export default router;
