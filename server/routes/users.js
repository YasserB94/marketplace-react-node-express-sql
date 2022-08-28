var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.session.timesvisited) {
    req.session.timesvisited++;
  } else {
    req.session.timesvisited = 1;
  }

  res.send(`Welcome back for the ${req.session.timesvisited} time`);
});

module.exports = router;
