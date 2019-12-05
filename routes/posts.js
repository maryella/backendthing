var express = require("express");
var router = express.Router();
const PostModel = require("../models/postModel");
/* GET home page. */

router.get("/", async function(req, res, next) {
  const all = await PostModel.getAllPosts();
  res.json(all);
});

router.get("/:post_id", async (req, res, next) => {
  const { post_id } = req.params;
  //    console.log("req param:", req.params)
  const post = await PostModel.getPostById(post_id);
  res.json(post);
});

router.get("/addpost", async (req, res, next) => {
  res.render("template", {
    locals: {
      title: "Add Post"
    },
    partials: {
      partial: "partial-addpost"
    }
  });
});

router.post("/addpost", async (req, res) => {
  const { title, body, author_id } = req.body;
  const new_post = new PostModel(title, body, author_id);
  const addPost = await new_post.addNewPost();

  if (addPost) {
    console.log("added");
    res.status(200);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
