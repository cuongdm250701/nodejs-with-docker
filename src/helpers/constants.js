const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const MESSAGE = {
  INVALID_PARAMS: "Params is invalid",
};

const REST_FULL_API_CODE = {
  GET_SUCCESS: { code: 1, status: 200, message: "Successfully" },
  CREATED_SUCCESS: { code: 1, status: 201, message: "Successfully" },
  DELETED_SUCCESS: { code: 1, status: 204, message: "Delete success" },
  CREATE_FAIL: { code: 2, status: 400, message: "Can't create user" },
  NOT_FOUND: { code: 3, status: 404, message: "Can't find user" },
  PASSWORD_INVALID: { code: 4, status: 400, message: "Password invalid" },
};

module.exports = {
  REGEX_EMAIL,
  MESSAGE,
  REST_FULL_API_CODE,
};
