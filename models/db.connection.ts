// Paolo Bianchessi, 24/10/2023
// The following code creates a new connection to the mysql server

import mysql from "mysql2";

/**
 * Rapresents the connection object
 */
export const db = mysql.createConnection(process.env.STACKHERO_DB_URL);
