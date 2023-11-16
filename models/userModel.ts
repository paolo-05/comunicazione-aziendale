// Paolo Bianchessi, 29/10/2023
// The following code provides the methods about the user

import bcrypt from "bcrypt";
import { db } from "./db";
import { RowDataPacket } from "mysql2";
import { UserType } from "./types";

/**
 * This object is responsible for all the db interaction methods
 * about the User
 */
export const User = {
  findByEmail: async (email: string): Promise<UserType | undefined> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] as UserType | undefined;
  },
  findById: async (id: number): Promise<UserType | undefined> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] as UserType | undefined;
  },
  createUser: async (
    email: string,
    password: string | Buffer,
    canModifyUsers: boolean,
    name: string,
    lastName: string
  ): Promise<boolean> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .promise()
      .query(
        "INSERT INTO users (email, password, canModifyUsers, name, lastName) VALUES (?, ?, ?, ?, ?)",
        [email, hashedPassword, canModifyUsers, name, lastName]
      );
    return true;
  },
  comparePassword: async (
    password: string | Buffer,
    hashedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  },
  listAll: async (): Promise<UserType[]> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM users");
    return rows as UserType[];
  },
  editUser: async (
    id: number,
    email: string,
    password: string,
    canModifyUsers: boolean,
    name: string,
    lastName: string
  ): Promise<boolean> => {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      if (existingUser.id !== id) return false;
    }

    if (password !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db
        .promise()
        .query(
          "UPDATE users SET email = ?, password = ?, canModifyUsers = ?, name = ?, lastName = ? WHERE id = ?",
          [email, hashedPassword, canModifyUsers, name, lastName, id]
        );
    } else {
      await db
        .promise()
        .query(
          "UPDATE users SET email = ?, canModifyUsers = ?, name = ?, lastName = ? WHERE id = ?",
          [email, canModifyUsers, name, lastName, id]
        );
    }

    return true;
  },
  deleteUser: async (id: number): Promise<void> => {
    await db.promise().query("DELETE FROM users WHERE id = ?", [id]);
  },
};
