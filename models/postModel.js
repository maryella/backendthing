const db = require("./conn");

class Post {
  constructor(title, content, author_id) {
    (this.title = title),
      (this.content = content),
      (this.author_id = author_id);
  }

  async addNewPost() {
    try {
      const response = db.one(
        `INSERT INTO posts (title, content, author_id) 
                                        VALUES ($1, $2, $3) 
                                        RETURNING id;`,
        [this.title, this.content, this.author_id]
      );
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async getAllPosts() {
    console.log("getallposts");
    try {
      const response = await db.any(`SELECT * FROM posts;`);
      console.log("response:", response);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async getPostById(id) {
    try {
      const response = await db.one(
        `SELECT * FROM posts 
                                        WHERE id = $1; `,
        [id]
      );
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Post;
