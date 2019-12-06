const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
//fix this secret later for security
const secret = "secret";
const jwt = require("jsonwebtoken");
const withAuth = require("../middleware");

router.post("/signup", async (req, res, next) => {
  const { user_name, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new userModel(user_name, email, hash);
  const addUser = await user.saveNewUser();
  console.log("user added", addUser);

  if (addUser) {
    res.status(200);
  } else {
    res.status(500);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = new userModel(null, email, password);
  const response = await user.login();

  if (!!response.isValid) {
    const payload = { email };
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h"
    });
    console.log("log in successful ");
    res.cookie("token", token, { httpOnly: true }).sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.get("/secret", withAuth, async function(req, res, next) {
  res.send("The password is potato");
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.status(200).redirect("/");
});

module.exports = router;
