// IMPORTS
const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

// MIDDLEWARE AND UTILITIES
const generateJwt = require("../utils/generateJwt");
const isValidInfo = require("../middleware/isValidInfo");
const isUserAuthorized = require("../middleware/isUserAuthorized");

// REQUESTS

// Register an account
router.post("/api/v1/auth/account/register", isValidInfo, async (req, res) => {
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      birthdate,
      department,
      project,
    } = req.body;

    // Check is account already exists in the database
    const [user] = await pool.query(
      `
        SELECT
            username
        FROM
            users
        WHERE
            username = ?
      `,
      [username]
    );

    if (user.length !== 0) {
      return res.status(409).json("USER ALREADY EXISTS!");
    }

    // Encrypt the password using hash and salt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const addNewUser = await pool.query(
      `
        INSERT INTO
          users (
              username,
              password,
              first_name,
              last_name,
              birthdate,
              department,
              project
          )
        VALUES
            (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        username,
        encryptedPassword,
        first_name,
        last_name,
        birthdate,
        department,
        project,
      ]
    );

    const [recentRegisteredUser] = await pool.query(
      `
        SELECT
            username
        FROM
            users
        WHERE
            user_id = LAST_INSERT_ID ();
      `
    );

    // Generate token session for new user
    const token = generateJwt(recentRegisteredUser[0].username);
    res.status(200).json({
      status: "success",
      results: 1,
      data: { token: token },
      message: "Account registered successfully!",
    });
  } catch (error) {
    console.error(error.message);
  }
});

// Log in of account
router.post("/api/v1/auth/account/login", isValidInfo, async (req, res) => {
  try {
    const { username, password } = req.body;

    const [user] = await pool.query(
      `
        SELECT
            username,
            password
        FROM
            users
        WHERE
            username = ?
      `,
      [username]
    );

    if (user.length == 0) {
      return res
        .status(401)
        .json("Password or Email is incorrect! Please Try Again.");
    }

    // Compare if inputted password is the same to password in Database
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json("Password is incorrect! Please try again.");
    }

    // Generate token session for new user
    const token = generateJwt(user[0].username);

    res.status(200).json({
      status: "success",
      results: 1,
      data: { token: token },
      message: "Logged in sucessfully",
    });
  } catch (error) {
    console.error(error.message);
  }
});

// Get list of all available users
router.get("/api/v1/auth/getUsers/all", async (req, res) => {
  try {
    const [getAllUsers] = await pool.query(
      `
        SELECT
            user_id,
            username,
            first_name,
            last_name,
            DATE_FORMAT(birthdate, '%m-%d-%Y') birthdate,
            department,
            project
        FROM
            attendance_record.users
      `
    );

    res.status(200).json({
      status: "success",
      results: 1,
      data: getAllUsers,
      message: "Account registered successfully!",
    });
  } catch (error) {
    console.error(error.message);
  }
});

// Verify the authenticity of the user
router.get("/api/v1/auth/isAuthorized", isUserAuthorized, async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: true,
      message: "User is verified to access requests.",
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
