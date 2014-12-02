// File: piechart.js
// Date: 11/24/2014
//
// Description:
// This Javascript file is used for performing the following
// functionality:
// 1.) Listening to change buttons in the second div
// 2.) Updating the DOM to contain the appropriate pie chart in div 2

var div2chart = 1;

// This Javascript function adds event listeners to the two change buttons in div 2
function initialize() {
    generateChart1();
    generateChart4();
    generateChart3Btn1();

    document.getElementById("changebtn1").addEventListener("click", generateChart1, false);
    document.getElementById("changebtn2").addEventListener("click", generateChart2, false);

    document.getElementById("changebtn3").addEventListener("click", generateChart3Btn1, false);
    document.getElementById("changebtn4").addEventListener("click", generateChart3Btn2, false);
    document.getElementById("changebtn5").addEventListener("click", generateChart3Btn3, false);

    document.getElementById("sel").addEventListener("change", generateChart4, false);
    document.getElementById("inp4").addEventListener("click", formsubmit, false);

    loadParagraphs();
}

//loads the three paragraphs
function loadParagraphs() {
    loadParagraph(1);
    loadParagraph(2);
    loadParagraph(3);
}

//Loads an individual paragraph
function loadParagraph(id){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4){
            document.getElementById("text" + id).innerHTML = xmlhttp.responseText;

        }
    };

    xmlhttp.open("GET", "paragraph/" + id, true);

    xmlhttp.send();
}

window.addEventListener("load", initialize, false);

//Handles the submit button in div1
function formsubmit(){
    var xmlhttp = new XMLHttpRequest();
    var name = document.getElementById("inp1").value;
    var item = document.getElementById("inp2").value;
    var nature = document.getElementById("inp3").value;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 204){
            document.getElementById("inp1").value = "";
            document.getElementById("inp2").value = "";
            document.getElementById("inp3").value = "";
            if (div2chart == 1){
                generateChart1();
            } else if (div2chart == 2){
                generateChart2();
            }

        }

        if (xmlhttp.readyState == 4 && xmlhttp.status == 400){
            window.alert("Invalid data entered");
        }
    };

    xmlhttp.open("POST", "postdata", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log("name=" + name + "&item=" + item + "&nature=" + nature);
    xmlhttp.send("name=" + name + "&item=" + item + "&nature=" + nature);
}

// This Javascript function generates the chart for selecting changebtn1
function generateChart1() {
    var response;
    var dataArray = new Array();

    // Retrieve the JSON for the required SQL data needed for producing
    // the pie chart in div 2 through a request object
    var xmlhttp = new XMLHttpRequest();

    // define a callback function to use later once a response is received
    xmlhttp.onreadystatechange = function() {

        // check to see if the response is fully received
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            div2chart = 1;
            response = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < response.length; i++) {
                var array = new Array();
                array[0] = response[i].name;
                array[1] = parseInt(response[i].y);
                dataArray[i] = array;
            }

            // JQuery function for populating Highchart with JSON data
            $(function () {
                // Indicate that the graph1 DOM object will be updated with a Highchart
                $('#graph1').highcharts({
                    // Prepare some stylistic properties for the chart
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        borderRadius: 5,
                        plotShadow: false
                    },
                    // Set the title of the chart
                    title: {
                        text: 'Pokemon - Most Commonly Held Items'
                    },
                    // Make it so that a tooltip appears showing the name of the series
                    // and the percentage composition of the currently hovered-over slice
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    // Add to the options list for the chart
                    plotOptions: {
                        // Allow for labeling and point selection for the pie chart
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    // Add the data series that will help to produce the Highchart
                    series: [{
                        type: 'pie',
                        name: 'Most Commonly Held Items',
                        data: dataArray
                    }]
                });
            });
        }
    };

    // prepare the request for the SQL data needed for
    // showing the first chart in div2
    xmlhttp.open("GET", "/helditem.json", true);

    // open the connection to the server and send the request
    xmlhttp.send();
    // callback function is triggered
}


// This Javascript function generates the chart for selecting changebtn2
function generateChart2() {
    var response;
    var dataArray = new Array();

    // Retrieve the JSON for the required SQL data needed for producing
    // the pie chart in div 2 through a request object
    var xmlhttp = new XMLHttpRequest();

    // define a callback function to use later once a response is received
    xmlhttp.onreadystatechange = function() {

        // check to see if the response is fully received
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            div2chart = 2;
            response = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < response.length; i++) {
                var array = new Array();
                array[0] = response[i].nature;
                array[1] = parseInt(response[i].nature_count);
                dataArray[i] = array;
            }

            // JQuery function for populating Highchart with JSON data
            $(function () {
                // Indicate that the graph1 DOM object will be updated with a Highchart
                $('#graph1').highcharts({
                    // Prepare some stylistic properties for the chart
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        borderRadius: 5,
                        plotShadow: false
                    },
                    // Set the title of the chart
                    title: {
                        text: 'Pokemon - Nature'
                    },
                    // Make it so that a tooltip appears showing the name of the series
                    // and the percentage composition of the currently hovered-over slice
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    // Add to the options list for the chart
                    plotOptions: {
                        // Allow for labeling and point selection for the pie chart
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    // Add the data series that will help to produce the Highchart
                    series: [{
                        type: 'pie',
                        name: 'Nature',
                        data: dataArray
                    }]
                });
            });
        }
    };

    // prepare the request for the SQL data needed for
    // showing the first chart in div2
    xmlhttp.open("GET", "/nature.json", true);

    // open the connection to the server and send the request
    xmlhttp.send();
    // callback function is triggered
}



// This Javascript / JQuery function generates the content for display in the div 4 chart
function generateChart4() {

    var response;
    var dataArray = new Array();
    var urlStart = "/moveclass.json";
    var queryStart = "?type=";

    var e = document.getElementById("sel");
    var changeVal = e.options[e.selectedIndex].value;
    if (e.selectedIndex == 0) {
        urlStart = urlStart;
    }
    else {
        urlStart = urlStart + queryStart + changeVal;
    }

    // JQuery function for performing AJAX to retrieve JSON string
    $.ajax({url: urlStart, success:function(result){
        response = result;
        for (var i = 0; i < response.length; i++) {
            var array = new Array();
            array[0] = response[i].Class;
            array[1] = parseInt(response[i].Class_count);
            dataArray[i] = array;
        }

        // JQuery function for populating Highchart with JSON data
        $(function () {
            // Indicate that the graph1 DOM object will be updated with a Highchart
            $('#graph2').highcharts({
                // Prepare some stylistic properties for the chart
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 1,
                    borderRadius: 5,
                    plotShadow: false
                },
                // Set the title of the chart
                title: {
                    text: 'Pokemon - Moveclass (' + changeVal + ')'
                },
                // Make it so that a tooltip appears showing the name of the series
                // and the percentage composition of the currently hovered-over slice
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                // Add to the options list for the chart
                plotOptions: {
                    // Allow for labeling and point selection for the pie chart
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                // Add the data series that will help to produce the Highchart
                series: [{
                    type: 'pie',
                    name: 'Moveclass',
                    data: dataArray
                }]
            });
        });
    }
    });
}



// This Javascript function generates the chart for selecting btn1 in div 3
function generateChart3Btn1() {
    var response;
    var dataArray1 = new Array();
    var dataArray2 = new Array();

    // Retrieve the JSON for the required SQL data needed for producing
    // the pie chart in div 2 through a request object
    var xmlhttp = new XMLHttpRequest();

    // define a callback function to use later once a response is received
    xmlhttp.onreadystatechange = function() {

        // check to see if the response is fully received
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            div2chart = 2;
            response = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < response.length; i++) {
                dataArray1[i] = response[i].Name;
                dataArray2[i] = parseInt(response[i].popnum);
            }

            // JQuery function for populating Highchart with JSON data
            $(function () {
                // Indicate that the graph1 DOM object will be updated with a Highchart
                $('#chart1').highcharts({
                    // Prepare some stylistic properties for the chart
                    chart: {
                        type: 'bar'
                    },
                    // Set the title of the chart
                    title: {
                        text: 'Most Popular Pokemon in Singles'
                    },
                    xAxis: {
                        categories: dataArray1
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number used',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },

                    // Make it so that a tooltip appears showing the name of the series
                    // and the percentage composition of the currently hovered-over slice
                    tooltip: {

                    },
                    // Add to the options list for the chart
                    plotOptions: {
                        bar: {
                            datalabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    // Add the data series that will help to produce the Highchart
                    series: [{
                        name: "Series1",
                        data: dataArray2
                    }]
                });
            });
        }
    };

    // prepare the request for the SQL data needed for
    // showing the first chart in div2
    xmlhttp.open("GET", "/popular.json?id=1", true);

    // open the connection to the server and send the request
    xmlhttp.send();
    // callback function is triggered
}



// This Javascript function generates the chart for selecting btn2 in div 3
function generateChart3Btn2() {
    var response;
    var dataArray1 = new Array();
    var dataArray2 = new Array();

    // Retrieve the JSON for the required SQL data needed for producing
    // the pie chart in div 2 through a request object
    var xmlhttp = new XMLHttpRequest();

    // define a callback function to use later once a response is received
    xmlhttp.onreadystatechange = function() {

        // check to see if the response is fully received
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            div2chart = 2;
            response = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < response.length; i++) {
                dataArray1[i] = response[i].Name;
                dataArray2[i] = parseInt(response[i].popnum);
            }

            // JQuery function for populating Highchart with JSON data
            $(function () {
                // Indicate that the graph1 DOM object will be updated with a Highchart
                $('#chart1').highcharts({
                    // Prepare some stylistic properties for the chart
                    chart: {
                        type: 'bar'
                    },
                    // Set the title of the chart
                    title: {
                        text: 'Most Popular Pokemon in Doubles'
                    },
                    xAxis: {
                        categories: dataArray1
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number used',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },

                    // Make it so that a tooltip appears showing the name of the series
                    // and the percentage composition of the currently hovered-over slice
                    tooltip: {

                    },
                    // Add to the options list for the chart
                    plotOptions: {
                        bar: {
                            datalabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    // Add the data series that will help to produce the Highchart
                    series: [{
                        name: "Series1",
                        data: dataArray2
                    }]
                });
            });
        }
    };

    // prepare the request for the SQL data needed for
    // showing the first chart in div2
    xmlhttp.open("GET", "/popular.json?id=2", true);

    // open the connection to the server and send the request
    xmlhttp.send();
// callback function is triggered
}



// This Javascript function generates the chart for selecting btn3 in div 3
function generateChart3Btn3() {
    var response;
    var dataArray1 = new Array();
    var dataArray2 = new Array();

    // Retrieve the JSON for the required SQL data needed for producing
    // the pie chart in div 2 through a request object
    var xmlhttp = new XMLHttpRequest();

    // define a callback function to use later once a response is received
    xmlhttp.onreadystatechange = function() {

        // check to see if the response is fully received
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            div2chart = 2;
            response = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < response.length; i++) {
                dataArray1[i] = response[i].Name;
                dataArray2[i] = parseInt(response[i].popnum);
            }
            console.log(dataArray1);
            console.log(dataArray2);

            // JQuery function for populating Highchart with JSON data
            $(function () {
                // Indicate that the graph1 DOM object will be updated with a Highchart
                $('#chart1').highcharts({
                    // Prepare some stylistic properties for the chart
                    chart: {
                        type: 'bar'
                    },
                    // Set the title of the chart
                    title: {
                        text: 'Most Popular Pokemon in Triples'
                    },
                    xAxis: {
                        categories: dataArray1
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number used',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },

                    // Make it so that a tooltip appears showing the name of the series
                    // and the percentage composition of the currently hovered-over slice
                    tooltip: {

                    },
                    // Add to the options list for the chart
                    plotOptions: {
                        bar: {
                            datalabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    // Add the data series that will help to produce the Highchart
                    series: [{
                        name: "Series1",
                        data: dataArray2
                    }]
                });
            });
        }
    };

    // prepare the request for the SQL data needed for
    // showing the first chart in div2
    xmlhttp.open("GET", "/popular.json?id=3", true);

    // open the connection to the server and send the request
    xmlhttp.send();
    // callback function is triggered
}