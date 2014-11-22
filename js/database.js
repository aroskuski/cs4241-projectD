/**
 * Created by andrew on 11/22/14.
 */

var inspect = require('util').inspect;
var Client = require('mariasql');

function selectQuery(query, resultfunc){
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
            resultfunc(result);
        });

    c.end();

    //return result;
}



exports.requestJSON = function(req, res){
    selectQuery('SELECT * FROM sidewalk;', function (res){
        console.log(res);
    });

};

exports.requestTable = function(req, res){

};