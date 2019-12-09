const db = require("./conn");

class MedList {
  constructor(
    user_id,
    classname,
    drugname,
    strength,
    quantity,
    frequency,
    time,
    comments
  ) {
    this.user_id = user_id;
    this.classname = classname;
    this.drugname = drugname;
    this.strength = strength;
    this.quantity = quantity;
    this.frequency = frequency;
    this.time = time;
    this.comments = comments;
  }

  async addMed() {
    try {
      const response = db.none(
        `INSERT INTO medlist_id${user_id} (user_id, classname, drugname, strength, quantity, frequency, time, comments) 
                                        VALUES ($1, $2, $3, $4, $5, $6, $7) 
                                        RETURNING id;`,
        [
          this.user_id,
          this.classname,
          this.drugname,
          this.strength,
          this.quantity,
          this.frequency,
          this.time,
          this.comments
        ]
      );
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async getAllMeds(id) {
    try {
      const response = await db.any(`SELECT * FROM medlist_id${id};`);
      // console.log("all meds response:", response);
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

module.exports = MedList;
