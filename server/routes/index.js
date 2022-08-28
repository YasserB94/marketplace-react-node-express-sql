var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.timesvisited) {
    req.session.timesvisited++;
  } else {
    req.session.timesvisited = 1;
  }
  res.render("index", {
    timesvisited: req.session.timesvisited,
    title: "shop",
  });
});

module.exports = router;
