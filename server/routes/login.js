var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Message From Login! :D");
});

//Frontend Connection
router.post("/", (req, res, next) => {
  const { username, password } = req.body;
  console.log(`received:${username}`);
  res.send({
    message: "Request received at /login",
    usernameReceived: username,
    passwordReceived: password,
  });
});

module.exports = router;
