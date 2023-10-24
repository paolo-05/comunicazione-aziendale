// userModel.js
const db = require("./db");
const bcrypt = require("bcrypt");

const User = {
  findByEmail: async (email) => {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM admins WHERE email = ?", [email]);
    return rows[0];
  },
  createUser: async (email, password, name, lastName) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .promise()
      .query(
        "INSERT INTO admins (email, password, name, lastname) VALUES (?, ?, ?, ?)",
        [email, hashedPassword, name, lastName]
      );
  },
  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
};

module.exports = User;
