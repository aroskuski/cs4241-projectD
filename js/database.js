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
    var query = '';
    console.log(req.query.select);
    query += 'SELECT ' + Client.escape(req.query.select);
    console.log(req.query.from);
    query += ' FROM ' + Client.escape(req.query.from);
    console.log(req.query.where);
    if (req.query.where != undefined) {
        query += ' WHERE ' + Client.escape(req.query.where);
    }
    query += ';';
    console.log(query);
    selectQuery(query, res,  function (res, result){
        console.log(JSON.stringify(result));
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    });

};

exports.requestTable = function(req, res){
    var query = '';
    console.log(req.query.select);
    query += 'SELECT ' + Client.escape(req.query.select);
    console.log(req.query.from);
    query += ' FROM ' + Client.escape(req.query.from);
    console.log(req.query.where);
    if (req.query.where != undefined) {
        query += ' WHERE ' + Client.escape(req.query.where);
    }
    query += ';';
    console.log(query);
    selectQuery(query, res,  function (res, result){
        console.log(JSON.stringify(result));
        //res.set('Content-Type', 'application/json');
        res.render('tabletest', {data: result, headers: []});
    });
};

exports.postData = function (req, res) {

};