var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

const withAuth = require("../middleware");

router.get("/checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

router.get("/api/secret", withAuth, function(req, res) {
  const message = "potatoes";
  console.log(message);
  res.send(message);
});

module.exports = router;
