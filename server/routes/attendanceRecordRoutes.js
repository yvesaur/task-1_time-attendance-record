// IMPORTS
const express = require("express");
const router = express.Router();
const pool = require("../db");

// MIDDLEWARE ANG UTILITIES
const isUserAuthorized = require("../middleware/isUserAuthorized");

// REQUESTS

// record user attendance
router.post("/api/v1/auth/user/:id/time-in", async (req, res, next) => {
  try {
    const { id } = req.params;
    const computer = "Desktop";

    // Check if there are any record of attendance for today for the current user
    const [record] = await pool.query(
      `
      SELECT
            *
        FROM
            attendance_records
        WHERE
            user_id = ? 
            AND 
            DATE(date) = CURDATE()
      `,
      [id]
    );

    if (record[0]) {
      // If there are already existing records in the DB for today's date
      // Record only for time out, update the existing record
      if (record[0].time_out) {
        res.status(200).json({
          status: "error",
          results: 1,
          data: "time-out",
          message: "You have already timed out for today.",
        });
      } else {
        const updateRecordTimeOut = await pool.query(
          `
          UPDATE attendance_records
          SET
              time_out = CURTIME()
          WHERE
              user_id = ?
              AND
              DATE(date) = CURDATE()
          `,
          [id]
        );

        res.status(200).json({
          status: "success",
          results: 1,
          data: "time-out",
          message: "Timed Out successfully.",
        });
      }
    } else {
      // If there are no existing record for today's date
      // Make a attendance record and time in a user (don't record time out yet)
      const insertAttendanceRecord = await pool.query(
        `
            INSERT INTO
                attendance_records(user_id, date, time_in, time_out, computer)
            VALUES
                (?, CURDATE(), CURTIME(), null, ?)
        `,
        [id, computer]
      );

      res.status(200).json({
        status: "success",
        results: 1,
        data: "time-in",
        message:
          "Attendance record for today successfully created. Timed In Successfully.",
      });
    }
  } catch (error) {
    console.error(error.message);
  }
});

// Get user existing records
router.get("/api/v1/auth/user/:id/records", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if there are any record of attendance for today for the current user
    const [records] = await pool.query(
      `
      SELECT
            *
        FROM
            attendance_records
        WHERE
            user_id = ? 
      `,
      [id]
    );

    res.status(200).json({
      status: "success",
      results: records.length,
      data: records,
      message: "User successfuly timed in for attendance.",
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
