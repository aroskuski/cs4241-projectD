// File: piechart.js
// Date: 11/24/2014
//
// Description:
// This Javascript file is used for performing the following
// functionality:
// 1.) Listening to change buttons in the second div
// 2.) Updating the DOM to contain the appropriate pie chart in div 2

// This Javascript function adds event listeners to the two change buttons in div 2
function initialize() {
    document.getElementById("changebtn1").addEventListener("click", generateChart1, false);
    document.getElementById("changebtn2").addEventListener("click", generateChart2, false);
}

window.addEventListener("load", initialize, false);

// This Javascript function generates the chart for selecting changebtn1
function generateChart1() {
    var dataArray = new Array();
    var pieChart;

    // Retrieve the JSON for the required SQL data needed for producing
    // the pie chart in div 2 through a request object
    var xmlhttp = new XMLHttpRequest();

    // define a callback function to use later once a response is received
    xmlhttp.onreadystatechange = function() {

        // check to see if the response is fully received
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dataArray = JSON.parse(xmlhttp.responseText);
            buildchart1(dataArray);
        }
    }

    // prepare the request for the SQL data needed for
    // showing the first chart in div2
    xmlhttp.open("GET", "/helditem.json", true);

    // open the connection to the server and send the request
    xmlhttp.send();
    // callback function is triggered
}


// This Javascript function generates the chart for selecting changebtn2
function generateChart2() {
    var dataArray = new Array();
    var pieChart;

    // Retrieve the JSON for the required SQL data needed for producing
    // the second pie chart in div 2 through a request object
    var xmlhttp = new XMLHttpRequest();

    // define a callback function to use later once a response is received
    xmlhttp.onreadystatechange = function() {

        // check to see if the response is fully received
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dataArray = JSON.parse(xmlhttp.responseText);
            buildchart2(dataArray);
        }
    }

    // prepare the request for the SQL data needed for
    // showing the first chart in div2
    xmlhttp.open("GET", "/nature.json", true);

    // open the connection to the server and send the request
    xmlhttp.send();
    // callback function is triggered
}


// This Javascript function builds the first pie chart
function buildchart1(dataArray) {

    // JQuery function for populating Highchart with JSON data
    $(function (dataArray) {
        // Indicate that the graph1 DOM object will be updated with a highchart
        $('#graph1').highcharts({
            // Prepare some stylistic properties for the chart
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,
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
            series: dataArray
        });
    });
}


// This Javascript function builds the second pie chart
function buildchart2(dataArray) {

    // JQuery function for populating Highchart with JSON data
    $(function (dataArray) {
        // Indicate that the graph1 DOM object will be updated with a Highchart
        $('#graph1').highcharts({
            // Prepare some stylistic properties for the chart
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,
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
            series: dataArray
        });
    });
}

