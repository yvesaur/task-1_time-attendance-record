// Validate user information for login and registering
module.exports = function (req, res, next) {
  const { email, name, password } = req.body;

  // Validate email address using RegEx.
  function isEmailValid(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      return res.status(400).json("Missing Credentials!");
    } else if (!isEmailValid(email)) {
      return res.status(422).json("Invalid Email!");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(400).json("Missing Credentials!");
    } else if (!isEmailValid(email)) {
      return res.status(422).json("Invalid Email!");
    }
  }

  next();
};
