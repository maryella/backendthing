var express = require("express");
var router = express.Router();
const medModel = require("../models/medModel");
const withAuth = require("../middleware");

router.get("/", withAuth, async function(req, res, next) {
  const user_id = req.user_id;
  console.log("route user id", user_id);
  const all = await medModel.getAllMeds(user_id);
  res.json(all);
});

// router.get("/:post_id", async (req, res, next) => {
//   const { post_id } = req.params;
//   //    console.log("req param:", req.params)
//   const post = await PostModel.getPostById(post_id);
//   res.json(post);
// });

// router.get("/addpost", async (req, res, next) => {
//   res.render("template", {
//     locals: {
//       title: "Add Post"
//     },
//     partials: {
//       partial: "partial-addpost"
//     }
//   });
// });

router.post("/addmed", async (req, res) => {
  const {
    classname,
    drugname,
    strength,
    quantity,
    frequency,
    time,
    comments
  } = req.body;
  const new_med = new medModel(
    classname,
    drugname,
    strength,
    quantity,
    frequency,
    time,
    comments
  );
  const addPost = await new_post.addNewPost();

  if (addPost) {
    console.log("added");
    res.status(200);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
