const jwt = require("jsonwebtoken");
require("dotenv").config({ path: require("find-config")(".env") });

// Generates a JSON Web Token (JWT) for a given username for session management
function generateJwt(username) {
  const payload = {
    user: username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
}

module.exports = generateJwt;
