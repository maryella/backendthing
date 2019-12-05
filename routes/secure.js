var express = require("express");
var router = express.Router();

const withAuth = require("../middleware");
//const SecureModel = require("../models/secureModel");
/* GET home page. */

router.get("/", withAuth, (req, res) => {
  res.sendStatus(500);
});

module.exports = router;
