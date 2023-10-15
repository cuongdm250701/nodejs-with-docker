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
const verify_token = async (access_token) => {
  try {
    const data = await jwt.verify.apply(access_token, process.env.SECRET_KEY);
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generate_token, verify_token };
