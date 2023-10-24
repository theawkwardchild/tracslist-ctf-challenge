var express = require('express');
var router = express.Router();

/* GET latest page. */
router.get('/', function(req, res, next) {
  res.render('latest');
});

module.exports = router;
