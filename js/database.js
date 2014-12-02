/**
 * Created by andrew on 11/22/14.
 */

var inspect = require('util').inspect;
var Client = require('mariasql');

//Runs the given query, then executes resultfunc
function runQuery(query, res, resultfunc){
    var out = [];
    var c = new Client();
    //var query;

    //login
    c.connect({
        host: '127.0.0.1',
        user: 'ajroskuski',
        password: 'ajroskuski_pw',
        db: 'ajroskuski_db'

    });

    //event handlers
    c.on('connect',function(){
        console.log('Connected to db');
    })
    .on('error', function (err){
        console.log('Client Error ' + err);
    })
    .on('close', function(){
        console.log('Client Closed');
    });

    //run query
    c.query(query)
        .on('result', function (result){
            result.on('row',function(row){
                out.push(row);
            })
                .on('error', function(err){
                    console.log("result error " + inspect(err));
                    res.status(400);// Something has gone wrong
                                    // Since all the SQL queries are hardcoded, it is probably not the server's fault
                })
                .on('end', function(){
                    console.log('Result finished successfully')
                });
        })
        .on('end', function(){
            console.log("Done with all results");
            //do callback
            resultfunc(res, out);
        });



    c.end();


    //return result;
}


//Wrapper for runquery to return JSON as the response
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

// Receive form data and insert into db
exports.postData = function (req, res) {
    //req.body
    //var query = "INSERT INTO div1 (pdexID, item, nature) VALUES (";
    var PokedexNo;
    var natureID;
    // Assume everything is going right until something goes wrong
    res.status(204);
    console.log("name " + req.body.name);
    console.log("item " + req.body.item);
    console.log("nature " + req.body.nature);
    //  Weird stuff happens when any of these is undefined, so this is just to short circuit that
    if(req.body.name == undefined || req.body.item == undefined || req.body.nature == undefined){
        res.status(400).send();
        return;
    }
    console.log("SELECT * FROM pkmn WHERE Name=\'" + req.body.name + '\';');
    //Get the pokedex number that corresponds to req.body.name
    runQuery("SELECT * FROM pkmn WHERE Name=\'" + req.body.name + '\';', res,  function (res, result){
        console.log(JSON.stringify(result));
        if (result[0] != undefined){//Check if a result exists
            PokedexNo = result[0].PokedexNo;
        } else {
            PokedexNo = 0;// This is invalid, there is no number zero
        }
        console.log("SELECT * FROM nature WHERE nature=\'" + req.body.nature + '\';');
        // Get the id of the nature in the post request
        runQuery("SELECT * FROM nature WHERE nature=\'" + req.body.nature + '\';', res, function(res, result) {
            console.log(JSON.stringify(result));
            if (result[0] != undefined){// Check if result exists
                natureID = result[0].id;
            } else {
                natureID = 100;// there are only like 20-something natures, so this will always be invalid
            }
            //build query string
            var query = "INSERT INTO div1 (pdexID, item, nature) VALUES (";
            query += PokedexNo;
            query += ',\'';
            query += Client.escape(req.body.item);
            query += '\',';
            query += natureID;
            query += ');';
            console.log(query);
            //run the insert query
            runQuery(query, res, function(res, result){
                console.log(JSON.stringify(result));
                // result will always be []
                // status code is all we are sending back, and that has already been set appropriately
                res.send();
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
    requestJSON('SELECT pkmn.Name, popular.popnum FROM popular JOIN pkmn WHERE pkmn.PokedexNo = popular.pdex AND popcat=' + Client.escape(req.query.id)
    + ' ORDER BY popular.popnum,pkmn.Name ASC;', res)
};

exports.moveClass = function(req, res){
    if(req.query.type != undefined){
        requestJSON('SELECT Class, COUNT(Class) AS Class_count  FROM Move WHERE type=\'' + Client.escape(req.query.type)
        +'\' GROUP BY CLass;', res);
    } else {
        requestJSON('SELECT Class, COUNT(Class) AS Class_count  FROM Move GROUP BY Class;', res);
    }
};