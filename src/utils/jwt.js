const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    "secret_key",
    { expiresIn: "1d" }
  );
};

module.exports = { generateToken };