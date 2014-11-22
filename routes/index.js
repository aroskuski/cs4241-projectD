var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/dashboard.html', function(req, res){
  res.render('index', { title: 'Success' });
});

module.exports = router;
