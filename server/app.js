const createError = require("http-errors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
//Req Session
const session = require("express-session");
//IMPORT ROUTERS
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
let sessionStore = [];
//SET MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "Shshshhss",
    resave: false,
    saveUninitialized: true,
    sessionStore: sessionStore,
    cookie: {
      hello: "I am a cookie!",
    },
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
