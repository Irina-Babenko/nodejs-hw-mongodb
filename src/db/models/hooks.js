export const handlerSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const setUpdateSettings = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};
