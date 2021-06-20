const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: (process.env.NODE_ENV = 'production' ? null : err.stack),
  });
};

// the first middleware is triggered whenever there is an error in the application.
// example: database issue etc.
// the second middleware is run when there is no matching route.
// it creates an error object and passes it to the error handler middleware
// which throws the error.

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export { notFound, errorHandler };
