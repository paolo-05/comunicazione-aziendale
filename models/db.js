// db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  // host: "localhost",
  host: "database",
  user: "root",
  password: "PasswordRoot",
  database: "comunicazione-aziendale",
});

module.exports = db;
