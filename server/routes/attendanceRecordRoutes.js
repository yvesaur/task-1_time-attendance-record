// IMPORTS
const express = require("express");
const router = express.Router();
const pool = require("../db");

// MIDDLEWARE ANG UTILITIES
const isUserAuthorized = require("../middleware/isUserAuthorized");

// REQUESTS

// record user attendance
router.post("/api/v1/auth/user/:id/time-in", async (req, res) => {
  try {
    const { userId, computer } = req.body;

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
      [userId]
    );
    if (record.length > 0) {
      // If there are already existing records in the DB for today's date
      // Record only for time out, update the existing record
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
        [userId]
      );

      res.status(200).json({
        status: "success",
        results: 1,
        data: "omsim 1",
        message: "Timed Out successfully.",
      });
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
        [userId, computer]
      );
      res.status(200).json({
        status: "success",
        results: 1,
        data: "omsim",
        message:
          "Attendance record for today successfully created. Timed In Successfully.",
      });
    }

    console.log(record);
    res.status(200).json({
      status: "success",
      results: 2,
      data: record,
      message: "User successfuly timed in for attendance.",
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
