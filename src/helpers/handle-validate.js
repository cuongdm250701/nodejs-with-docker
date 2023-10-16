class AppError extends Error {
      constructor(code, message) {
            super(message);
            this.code = code;
            this.message = message;
      }
}

Error.create = ({ code, message }) => {
      const error = new AppError(code, message);
      return error;
}

Error.prototype.error_invalid_params = (params) => {
      return Error.create({ code: 9, message: `params ${params} invalid` });
}

const API_CODE = {
      INVALID_PARAMS: Error.create({code: 9, message: "params invalid"}),
}

module.exports = {
      AppError,
      API_CODE,
};
