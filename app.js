const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const Session = require("express-session");
//const FileStore = require("session-file-store")(session);
const es6Renderer = require("express-es6-template-engine"); //for testing
const cors = require("cors");

require("dotenv").config();

var session = Session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var secureRouter = require("./routes/secure");

const app = express();
app.engine("html", es6Renderer);
app.set("views", "./views");
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session);
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/secure", secureRouter);

module.exports = app;
