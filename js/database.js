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
    console.log(query);
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
    //var query = "INSERT INTO div1 (pdexID, item, nature) VALUES (";
    var PokedexNo;
    var natureID;
    runQuery("SELECT * FROM pkmn WHERE Name=\'" + req.body.name + '\';', res,  function (res, result){
        console.log(JSON.stringify(result));
        PokedexNo = result[0].PokedexNo;
        runQuery("SELECT * FROM nature WHERE nature=\'" + req.body.nature + '\';', function(res, result) {
            console.log(JSON.stringify(result));
            natureID = result[0].id;
            var query = "INSERT INTO div1 (INSERT INTO div1 (pdexID, item, nature) VALUES (";
            query += PokedexNo;
            query += ',\'';
            query += Client.escape(req.body.item);
            query += '\',';
            query += natureID;
            query += ');';
            console.log(query);
            runQuery(query, function(res, result){
                console.log(JSON.stringify(result));

                res.status(204).send();
            });
            //res.set('Content-Type', 'application/json');

            //res.status(204).send();
            //res.send();
        });

    });
};

exports.heldItem = function(req, res){
    requestJSON('SELECT item AS name, COUNT(item) AS y FROM div1 GROUP BY item;', res);

};

exports.nature = function(req, res){
    requestJSON('SELECT nature.nature, COUNT(nature.nature) as nature_count FROM ' +
    '(div1 JOIN nature) WHERE div1.nature = nature.id GROUP BY nature.nature;', res);

};

exports.popular = function(req, res){
    requestJSON('SELECT * FROM view_popular WHERE type =' + Client.escape(req.query.id) + ';', res)
};

exports.moveClass = function(req, res){
    if(req.query.type != undefined){
        requestJSON('SELECT Class, COUNT(Class) AS Class_count  FROM Move WHERE type=\'' + Client.escape(req.query.type)
        +'\' GROUP BY CLass;', res);
    } else {
        requestJSON('SELECT Class, COUNT(Class) AS Class_count  FROM Move GROUP BY Class;', res);
    }
};