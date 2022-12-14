const express = require("express");
const router = express.Router();

//MiddleWare example - Logs received username/password
// function middleware(req, res, next) {
//   console.log("Logged @ login.js");
//   console.log("Middleware Example");
//   const { username, password } = req.body;
//   console.table({
//     usernameReceived: username,
//     passwordReceived: password,
//   });
//   next();
// }
//MiddleWare enabled on base POST route -> Will set timesvisitedcounter
function visitedCounter(req, res, next) {
  if (req.session.timesvisited) {
    req.session.timesvisited++;
  } else {
    req.session.timesvisited = 1;
  }
  next();
}
//Errorhandler example
function errorHandler(err, req, res, next) {
  console.log("Logged @ login.js");
  console.log("Errorhandler Example");
  err ? next(err) : next();
}
//Say Hello from this route
router.get("/", function (req, res, next) {
  res.send("Message From Login! :D");
});

//Frontend Connection test
router.post("/", visitedCounter, errorHandler, (req, res, next) => {
  const { username, password } = req.body;
  if (!username && password) {
    res.status(400);
  }

  res.send({
    message: "Request received at /login",
    usernameReceived: username,
    passwordReceived: password,
    timesvisited: req.session.timesvisited,
  });
});

module.exports = router;
