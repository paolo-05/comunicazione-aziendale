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
   * This function search for an already registered user with the email we are passing.
   * @param email the email to check for.
   * @returns an user tuple if exists otherwise null.
   */
  findByEmail: async (email: string): Promise<UserType | undefined> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM admins WHERE email = ?", [email]);
    return rows[0] as UserType | undefined;
  },

  /**
   * Searching for an user by an id.
   * @param id the id we'rse searching.
   * @returns a user tuple without the password if found otherwise null.
   */
  findById: async (id: number): Promise<UserSecure | undefined> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(
        "SELECT id, email, role, name, lastName FROM admins JOIN roles on roles.adminId=admins.id WHERE id = ?",
        [id]
      );
    return rows[0] as UserSecure | undefined;
  },

  /**
   * Creating a user defining all its values.
   */
  createUser: async (
    email: string,
    password: string | Buffer,
    role: number,
    name: string,
    lastName: string
  ): Promise<boolean> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .promise()
      .query(
        "INSERT INTO admins (email, password, name, lastName) VALUES (?, ?, ?, ?)",
        [email, hashedPassword, name, lastName]
      );

    const user = await User.findByEmail(email);

    await db
      .promise()
      .query("INSERT INTO roles (adminId, role) VALUES (?, ?)", [
        user?.id,
        role,
      ]);

    return true;
  },

  /**
   * Comparing a plain text password with the hashed on stored in db.
   * @returns true if password are equal or false if the passwords are different.
   */
  comparePassword: async (
    password: string | Buffer,
    hashedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  },

  /**
   *
   * @returns All the users registered.
   */
  listAll: async (): Promise<UserSecure[]> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(
        "SELECT id, email, role, name, lastName FROM admins JOIN roles on roles.adminId=admins.id ORDER BY id"
      );
    return rows as UserSecure[];
  },

  /**
   * Edits a user.
   */
  editUser: async (
    id: number,
    email: string,
    role: number,
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
        "UPDATE admins SET email = ?, name = ?, lastName = ? WHERE id = ?",
        [email, name, lastName, id]
      );

    await db
      .promise()
      .query("UPDATE roles SET role = ? where adminId = ?", [role, id]);
    return true;
  },

  /**
   * Deletes a user by a given id.
   * @param id
   */
  deleteUser: async (id: number): Promise<void> => {
    await db.promise().query("DELETE FROM admins WHERE id = ?", [id]);
    await db.promise().query("DELETE FROM roles WHERE adminId = ?", [id]);
  },

  /**
   * Updates a password for a user by a given id.
   * All the checks need to be done before calling this function
   */
  updatePassword: async (id: number, newPassword: string) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db
      .promise()
      .query<RowDataPacket[]>("UPDATE admins SET password = ? WHERE id = ?", [
        hashedPassword,
        id,
      ]);
  },

  /**
   *
   * @param adminId
   * @returns a number indicating the role of that user (e.g. 0 for HR, 1 for Admin)
   */
  getRoleLevel: async (adminId: number): Promise<number | undefined> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT role FROM roles WHERE adminId = ?", [
        adminId,
      ]);
    return rows[0].role as number | undefined;
  },
};
