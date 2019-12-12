var express = require("express");
var router = express.Router();
const medModel = require("../models/medModel");
const withAuth = require("../middleware");

router.get("/", withAuth, async function(req, res, next) {
  const user_id = req.user_id;
  console.log("get route user id", user_id);
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

router.post("/addmed", withAuth, async (req, res) => {
  const user_id = req.user_id;
  console.log("post route user id", user_id);
  const {
    classname,
    drugname,
    strength,
    quantity,
    frequency,
    timing,
    comments
  } = req.body;

  const new_med = new medModel(
    user_id,
    classname,
    drugname,
    strength,
    quantity,
    frequency,
    timing,
    comments
  );
  const addedMed = await new_med.addMed(user_id);

  if (addedMed) {
    console.log("added med");
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
