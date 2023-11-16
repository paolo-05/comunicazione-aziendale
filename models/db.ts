// Paolo Bianchessi, 24/10/2023
// The following code creates a new connection to the mysql server

import { constants } from "@/constants";
import mysql from "mysql2";

/**
 * Rapresents the connection object
 */
export const db = mysql.createConnection({
  host: constants.dbHost,
  user: "root",
  password: "PasswordRoot",
  database: "comunicazione-aziendale",
});
