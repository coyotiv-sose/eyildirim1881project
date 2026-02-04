var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send([{name:'John234'}, {name:'Jane'}]);
});

module.exports = router;
