const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generate token
const generate_token = (payload) => {
  const access_token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "24h",
    algorithm: "HS256",
  });
  return access_token;
};

// Verify token
const verify_token = (access_token) => {
  const data = jwt.verify(access_token, process.env.SECRET_KEY);
  return data;
};

module.exports = { generate_token, verify_token };
