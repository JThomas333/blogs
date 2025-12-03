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

export const savePost = (userId,title, content) =>
  db
    .prepare("INSERT into posts (userId,title, content) values (?,?,?)")
    .run(userId,title, content);
export const updatePost = (id,userId, title, content) =>
  db
    .prepare("UPDATE posts set userId = ?, title = ?, content = ? where id = ?")
    .run(userId, title, content, id);
export const getDeletePost = (id) =>
  db.prepare("DELETE FROM posts where id = ?").run(id);

const posts = [
  {userId: 1, title:"title1", content:"valami"}
]

if (getPosts.length == 0) {
  posts.forEach(e => {
    savePost(e.userId, e.title, e.content)
  });
}