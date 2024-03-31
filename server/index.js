require("dotenv").config({ path: require("find-config")(".env") });

// IMPORTS
const express = require("express");
const cors = require("cors");
const accountRoutes = require("./routes/accountRoutes.js");
const attendanceRecordRoutes = require("./routes/attendanceRecordRoutes.js");

// SERVER CONNECTION
const app = express();
const port = process.env.PORT || 5001;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// SERVER ROUTES
app.use("/", accountRoutes);
app.use("/", attendanceRecordRoutes);

// SERVER INSTANCE
app.listen(port, () => {
  console.log(`SERVER IS UP AND LISTENING TO PORT: ${port}`);
});
