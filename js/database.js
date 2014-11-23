/**
 * Created by andrew on 11/22/14.
 */

var inspect = require('util').inspect;
var Client = require('mariasql');

function selectQuery(query, res, resultfunc){
    var result = [];
    var c = new Client();

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



exports.requestJSON = function(req, res){
    selectQuery('SELECT * FROM sidewalk;', res, function (res, result){
        console.log(JSON.stringify(result));
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    });

};

exports.requestTable = function(req, res){
    var select = Client.escape(req.params.select);
    var where = Client.escape(req.params.where);
    var from = Client.escape(req.params.from);
    console.log('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';');
    selectQuery('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';', res,  function (res, result){
        console.log(JSON.stringify(result));
        //res.set('Content-Type', 'application/json');
        res.render('tabletest', {data: result});
    });
};

exports.postData = function (req, res) {

};