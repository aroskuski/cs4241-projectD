var express = require('express');
var router = express.Router();
var dbinterface = require('../js/database.js');
var fs = require('fs');

/* GET home page. */
/*router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
*/

//Main dashboard html file
router.get('/dashboard.html', function(req, res){
  //dbinterface.requestJSON(req,res);
  res.render('dashboard', { title: 'Dashboard' });
});

//Paragraphs to load into dashboard
router.get('/paragraph/:id', function(req, res){
  fs.readFile("text/text" + req.params.id + ".txt", "utf8", function(err,data) {// read file
    //console.log(err);
    //console.log(data);
    //console.log(process.cwd());
    if (err) {// something went wrong, send error message
      res.send("Could not find paragraph");
    } else {
      res.render('paragraph', {paragraph: data, classname: "text" + req.params.id});
    }
  });
});

//Post data into database
router.post('/postdata', dbinterface.postData);

// All .json routes are really just wrappers for SQL queries
router.get('/helditem.json', dbinterface.heldItem);

router.get('/nature.json', dbinterface.nature);

router.get('/popular.json', dbinterface.popular);// requires query string ?id=<number 1-7>

router.get('/moveclass.json', dbinterface.moveClass);//optional query sting ?type=<type name(ex: fire water, etc)>



module.exports = router;
