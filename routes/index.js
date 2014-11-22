var express = require('express');
var router = express.Router();
var dbinterface = require('../js/database.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/dashboard.html', function(req, res){
  //dbinterface.requestJSON(req,res);
  res.render('index', { title: 'Success' });
});

router.get('/table', dbinterface.requestTable);

module.exports = router;
