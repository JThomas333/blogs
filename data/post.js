import db from "./db.js"

db.prepare(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    content TEXT,
    FOREIGN KEY (userId) REFERENCEs users(id)
    )`).run()


    
/**
 * fetch posts data from database
 * @returns all posts data as an array
 */
export const getPosts = () => db.prepare("SELECT * FROM posts").all();
/**
 * fetch one post's data byid
 * @param {number} id 
 * @returns one post's data as an object
 */
export const getPostById = (id) =>
  db.prepare("SELECT * FROM posts where id = ?").get(id);

export const savePost = (title, content) =>
  db
    .prepare("INSERT into posts (title, content) values (?,?)")
    .run(title, content);
export const updatePost = (id, title, content) =>
  db
    .prepare("UPDATE posts set title = ?, content = ? where id = ?")
    .run(title, content, id);
export const getDeletePost = (id) =>
  db.prepare("DELETE FROM posts whee id = ?").run(id);
