const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const MESSAGE = {
  INVALID_PARAMS: "Params is invalid",
}

const REST_FULL_API_CODE = {
  GET_SUCCESS: { code: 1, status: 200, message: 'Thành công' },
  CREATED_SUCCESS: { code: 1, status: 201, message: 'Thành công' },
  DELETED_SUCCESS: { code: 1, status: 204, message: 'Xoá thành công' },
}

module.exports = {
  REGEX_EMAIL,
  MESSAGE,
  REST_FULL_API_CODE
};
