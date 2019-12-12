const db = require("./conn");

class MedList {
  constructor(
    user_id,
    classname,
    drugname,
    strength,
    quantity,
    frequency,
    timing,
    comments
  ) {
    this.user_id = user_id;
    this.classname = classname;
    this.drugname = drugname;
    this.strength = strength;
    this.quantity = quantity;
    this.frequency = frequency;
    this.timing = timing;
    this.comments = comments;
  }

  async addMed(id) {
    try {
      const user_id = id;
      console.log("add med userid", user_id);
      const response = db.none(
        `INSERT INTO medlist_id${id} (classname, drugname, strength, quantity, frequency, time, comments)
                                        VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [
          this.classname,
          this.drugname,
          this.strength,
          this.quantity,
          this.frequency,
          this.timing,
          this.comments
        ]
      );
      return "success";
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
