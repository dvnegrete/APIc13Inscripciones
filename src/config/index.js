import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  idSheetCourses: process.env.ID_SHEET_COURSES,
  idGoogleRegisterInscription: process.env.ID_SHEET_REGISTER_INSCRIPTION,
  secret: process.env.SECRET,
  azureStorageConnection: process.env.AZURE_STORAGE_CONNECTION,
  dateForCurp: process.env.DATE_FOR_CURP,
  // Firebase
  realtimeDB: process.env.REALTIMEDB,
  //Google
  client_email: process.env.CLIENT_EMAIL_GOOGLE,
  private_key: process.env.PRIVATE_KEY_GOOGLE,
  // DB
  hostDB: process.env.HOST_DB,
  userDB: process.env.USER_DB,
  passDB: process.env.PASS_DB,
  portDB: process.env.PORT_DB,
  nameDB: process.env.NAME_DB,
};

export const configSession = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set this to true on production
  },
};
