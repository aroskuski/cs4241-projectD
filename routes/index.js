var express = require('express');
var router = express.Router();
var dbinterface = require('../js/database.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/dashboard.html', function(req, res){
  //dbinterface.requestJSON(req,res);
  res.render('dashboard', { title: 'Dashboard' });
});

router.post('/postdata', dbinterface.postData);

router.get('/helditem.json', dbinterface.heldItem);

router.get('/nature.json', dbinterface.nature);

router.get('/popular.json', dbinterface.popular);// requires query string ?id=<number 1-7>

router.get('/moveclass.json', dbinterface.moveClass);//optional query sting ?type=<type name(ex: fire water, etc)>

//router.get('/table', dbinterface.requestTable);

//router.get('/json', dbinterface.requestJSON);

module.exports = router;
