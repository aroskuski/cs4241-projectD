/**
 * Created by andrew on 11/22/14.
 */

var inspect = require('util').inspect;
var Client = require('mariasql');

function selectQuery(query){
    var result = [];
    var c = new Client();

    c.connect({
        host: 'rous.wpi.edu',
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
        });

    c.end();

    return result;
}



exports.requestJSON = function(req, res){
    console.log(selectQuery('SELECT * FROM sidewalk'));

};

exports.requestTable = function(req, res){

};