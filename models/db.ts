// Paolo Bianchessi, 24/10/2023
// The following code creates a new connection to the mysql server

import mysql from "mysql2";

/**
 * Rapresents the connection object
 */
export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
