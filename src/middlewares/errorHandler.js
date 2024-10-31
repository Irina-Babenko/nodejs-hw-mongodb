export const errorHendler = (error, req, res, next) => {
  const { status = 500, message = 'Internal Server Error' } = error;
  res.status(status).json({
    status,
    message,
  });
};
