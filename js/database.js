/**
 * Created by andrew on 11/22/14.
 */

var inspect = require('util').inspect;
var Client = require('mariasql');

function runQuery(query, res, resultfunc){
    var result = [];
    var c = new Client();
    //var query;

    c.connect({
        host: '127.0.0.1',
        user: 'ajroskuski',
        password: 'ajroskuski_pw',
        db: 'ajroskuski_db'

    });

    c.on('connect',function(){
        console.log('Connected to db');



    })
    .on('error', function (err){
        console.log('Client Error ' + err);
    })
    .on('close', function(){
        console.log('Client Closed');
    });

    c.query(query)
        .on('result', function (res){
            res.on('row',function(row){
                result.push(row);
            })
                .on('error', function(err){
                    console.log("result error " + inspect(err));
                })
                .on('end', function(){
                    console.log('Result finished successfully')
                });
        })
        .on('end', function(){
            console.log("Done with all results");
            resultfunc(res, result);
        });



    c.end();


    //return result;
}



function requestJSON(query, res){
    runQuery(query, res,  function (res, result){
        console.log(JSON.stringify(result));
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    });

}

/*
function requestTable(query , res){
    console.log(query);
    runQuery(query, res,  function (res, result){
        console.log(JSON.stringify(result));
        //res.set('Content-Type', 'application/json');
        res.render('tabletest', {data: result, headers: []});
    });
}
*/


exports.postData = function (req, res) {
    //req.body
    runQuery(query, res,  function (res, result){
        console.log(JSON.stringify(result));
        //res.set('Content-Type', 'application/json');

        res.status(204).send();
        //res.send();
    });
};

exports.heldItem = function(req, res){
  requestJSON('SELECT * FROM view_held;', res);

};

exports.nature = function(req, res){
    requestJSON('SELECT * FROM view_nature;', res);

};