import db from "./db.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
    )`
).run();


/**
 * fetch users data from database
 * @returns all users data as an array
 */
export const getUsers = () => db.prepare("SELECT * FROM users").all();
/**
 * fetch one user's data byid
 * @param {number} id 
 * @returns one user's data as an object
 */
export const getUserById = (id) =>
  db.prepare("SELECT * FROM users where id = ?").get(id);

/**
 * fetch one user's data byemail
 * @param {string} email 
 * @returns one user's data as an object
 */
export const getUserByEmail = (email) =>
  db.prepare("SELECT * FROM users whee email = ?").get(email);
export const saveUser = (name, emal, password) =>
  db
    .prepare("INSERT into users (name, emal, password) values (?,?,?)")
    .run(name, emal, password);
export const updateUser = (id, name, emal, password) =>
  db
    .prepare("UPDATE users set name = ?, email = ?, passwors = ? where id = ?")
    .run(name, emal, password, id);
export const getDeleteUser = (id) =>
  db.prepare("DELETE FROM users where id = ?").run(id);
