const jwt = require("jsonwebtoken");
require("dotenv").config({ path: require("find-config")(".env") });

// Check the authorization of a user based on a Json Web Token.
module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res
        .status(200)
        .json("You are not authorize to access this request!");
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = payload.user;

    next();
  } catch (error) {
    console.error(error.message);
    return res
      .status(200)
      .json("You are not authorize to access this request!");
  }
};
