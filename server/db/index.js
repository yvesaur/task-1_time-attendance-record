const mysql = require("mysql2");
require("dotenv").config({ path: require("find-config")(".env") });

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })
  .promise();

/*
async function showDatabases() {
  const result = await pool.query("SHOW DATABASES");
  console.log(result);
}

showDatabases();
*/

module.exports = pool;
