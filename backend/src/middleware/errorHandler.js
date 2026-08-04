const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  const response = {
    success: false,
    message,
    errors: [],
  };

  if (statusCode === 400 && err.errors) {
    response.errors = err.errors;
  }

  if (statusCode === 500) {
    response.errors = [{ message: 'Something went wrong on the server' }];
  }

  return res.status(statusCode).json(response);
};

module.exports = errorHandler;
