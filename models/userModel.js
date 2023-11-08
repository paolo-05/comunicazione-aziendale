// Paolo Bianchessi, 29/10/2023
// The following code provides the methods about the user

import bcrypt from "bcrypt";
import { db } from "./db";

/**
 * This object is responsible for all the db interaction methods
 * about the User
 */
export const User = {
  findByEmail: async (email) => {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  },
  findById: async (id) => {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },
  createUser: async (email, password, canModifyUsers, name, lastName) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .promise()
      .query(
        "INSERT INTO users (email, password, can_modifiy_users, name, lastname) VALUES (?, ?, ?, ?, ?)",
        [email, hashedPassword, canModifyUsers, name, lastName]
      );
  },
  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
  listAll: async () => {
    const [rows] = await db.promise().query("SELECT * FROM users");
    return rows;
  },
  editUser: async (id, email, password, canModifyUsers, name, lastName) => {
    if (password !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db
        .promise()
        .query(
          "UPDATE users SET email = ?, password = ?, can_modifiy_users = ?, name = ?, lastname = ? WHERE id = ?",
          [email, hashedPassword, canModifyUsers, name, lastName, id]
        );
    } else {
      await db
        .promise()
        .query(
          "UPDATE users SET email = ?, can_modifiy_users = ?, name = ?, lastname = ? WHERE id = ?",
          [email, canModifyUsers, name, lastName, id]
        );
    }
  },
};
