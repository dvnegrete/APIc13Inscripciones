export function logErrors(err, req, res, next) {
  console.log(err);
  console.log("!!!!!!!>>>>==>>>>>!!!");
  next(err);
}

export function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

export function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
  });
}

