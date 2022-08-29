const createError = require("http-errors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
//Session stuff - Options to connect SQL store to DB -> MariaDB pool is not working - Bumped existing github issue
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};
const session = require("express-session"); //Get Session
const MySQLStore = require("express-mysql-session")(session); //Get MySQL store class
const sessionStore = new MySQLStore(options); //Create store (creates new db connection pool with max conn set to 1  by default)

//IMPORT ROUTERS
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//SET MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Cors stuff
//Define allowed origins
const origins = ["http://localhost:3000", "http://localhost:3050"];
const corsOptions = {
  origin: origins, //Pass in allowed origins array
  methods: ["GET", "POST"],
  optionsSuccessStatus: 200, // ???
  //withCredentials: true, // Could help to get cookie credentials -> Not making a differenc eon startup
  credentials: true, //--> This option allows client to identify with cookie!
};
app.use(cors(corsOptions)); //Make App use cors with above options
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Make app Use defined session
app.use(
  session({
    secret: process.env.SESSION_SECRET, //Loading Session secret from dotenv
    resave: false, //No need to save again if nothign changed ???
    saveUninitialized: true, //Save the session even if there is no data supplied
    store: sessionStore, //Use above defined SQL store to save session stuff (This way it persists if server crashes)
    cookie: {
      //Save session in a cookie thats max x age
      maxAge: 1000 * 60 * 60 * 24, //This is one day,
    },
  })
);
//Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//TODO:: Optimise error handler currently using express's built in one
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
