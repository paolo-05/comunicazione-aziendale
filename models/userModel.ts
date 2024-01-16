// Paolo Bianchessi, 29/10/2023
// The following code provides the methods about the user

import bcrypt from "bcrypt";
import { db } from "./db";
import { RowDataPacket } from "mysql2";
import { UserSecure, UserType } from "@/types/types";

/**
 * This object is responsible for all the db interaction methods
 * about the User
 */
export const User = {
  /**
   * This function search for an already registered user with the email we are passing
   * @param email the email to check for
   * @returns an user tuple if exists otherwise null
   */
  findByEmail: async (email: string): Promise<UserType | undefined> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM admins WHERE email = ?", [email]);
    return rows[0] as UserType | undefined;
  },
  /**
   * Searching for an user by an id
   * @param id the id we'rse searching
   * @returns a user tuple without the password if found otherwise null
   */
  findById: async (id: number): Promise<UserSecure | undefined> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(
        "SELECT id, email, canModifyUsers, name, lastName FROM admins WHERE id = ?",
        [id]
      );
    return rows[0] as UserSecure | undefined;
  },
  /**
   * Creating a user defining all its values
   */
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
        "INSERT INTO admins (email, password, canModifyUsers, name, lastName) VALUES (?, ?, ?, ?, ?)",
        [email, hashedPassword, canModifyUsers, name, lastName]
      );
    return true;
  },
  /**
   * Comparing a plain text password with the hashed on stored in db
   * @returns true if password are equal or false if the passwords are different
   */
  comparePassword: async (
    password: string | Buffer,
    hashedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  },
  /**
   *
   * @returns All the users registered
   */
  listAll: async (): Promise<UserSecure[]> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(
        "SELECT id, email, canModifyUsers, name, lastName FROM admins"
      );
    return rows as UserSecure[];
  },
  editUser: async (
    id: number,
    email: string,
    canModifyUsers: boolean,
    name: string,
    lastName: string
  ): Promise<boolean> => {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      if (existingUser.id !== id) return false;
    }
    await db
      .promise()
      .query<RowDataPacket[]>(
        "UPDATE admins SET email = ?, canModifyUsers = ?, name = ?, lastName = ? WHERE id = ?",
        [email, canModifyUsers, name, lastName, id]
      );
    return true;
  },
  deleteUser: async (id: number): Promise<void> => {
    await db.promise().query("DELETE FROM admins WHERE id = ?", [id]);
  },
  updatePassword: async (id: number, newPassword: string) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db
      .promise()
      .query<RowDataPacket[]>("UPDATE admins SET password = ? WHERE id = ?", [
        hashedPassword,
        id,
      ]);
  },
  getRoleLevel: async (adminId: number): Promise<number | undefined> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT role FROM roles WHERE adminId = ?", [
        adminId,
      ]);
    return rows[0].role as number | undefined;
  },
};
