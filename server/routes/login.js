var express = require("express");
var router = express.Router();

//MiddleWare example
function middleware(req, res, next) {
  console.log("Logged @ login.js");
  console.log("Middleware Example");
  const { username, password } = req.body;
  console.table({
    usernameReceived: username,
    passwordReceived: password,
  });
  next();
}
//Errorhandler example
function errorHandler(err, req, res, next) {
  console.log("Logged @ login.js");
  console.log("Errorhandler Example");
  next();
}
//Say Hello from this route
router.get("/", function (req, res, next) {
  res.send("Message From Login! :D");
});

//Frontend Connection test
router.post("/", middleware, errorHandler, (req, res, next) => {
  const { username, password } = req.body;
  if (!username && password) {
    res.status(400);
  }
  res.send({
    message: "Request received at /login",
    usernameReceived: username,
    passwordReceived: password,
  });
});

module.exports = router;
