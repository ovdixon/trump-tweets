
Plotly.d3.csv("data/export.csv", function (csv_data) {
    
  
    // map data from csv to variables
    var time = csv_data.map(d => '2020-01-08 ' + d.time);
    var sentiment = csv_data.map(d => d.sentiment);
    // tweeted whie playing golf
    var golf_play = csv_data.map(d => d.while_playing);
    // tweeted on a day golf was played
    var golf_day = csv_data.map(d => d.played_golf_date);
    // visited golf course but didn't play
    var golf_visit = csv_data.map(d => d.visit_golf);
    // any golf interaction either played or visited
    var golf_all = csv_data.map(d => d.any_golf);

    trace1 = {
        name: "golf_day",
        x: time,
        type: 'histogram',
        histnorm: 'percent',
        nbinsx: 24,
        transforms: [{
            type: 'filter',
            target: golf_day,
            operation: '=',
            value: 'true'
        },
        {
            type: 'filter',
            target: sentiment,
            operation: '<',
            value: '0'
        }],
        marker: {
            color: "rgba(255, 100, 102, 0.7)", 
             line: {
              color:  "rgba(255, 100, 102, 1)", 
              width: 1
            }
          },
        opacity: 0.5  
    };

    trace2 = {
        name: "no_golf_day",
        x: time,
        type: 'histogram',
        histnorm: 'percent',
        nbinsx: 24,
        transforms: [{
            type: 'filter',
            target: golf_all,
            operation: '=',
            value: 'false'
        },
        {
            type: 'filter',
            target: sentiment,
            operation: '<',
            value: '0'
        }],
        marker: {
            color: "rgba(100, 200, 102, 0.7)",
             line: {
              color:  "rgba(100, 200, 102, 1)", 
              width: 1
            } 
         },
        opacity: 0.75 
    };

    var data = [trace1,trace2];

    

    var layout = {
        xaxis: {
            tickformat: '%HH',
            title: "Time of day"
        },
        yaxis: {
            title: "percent of tweets"
        },
        barmode: "overlay"
        
    }


  
    Plotly.newPlot("tester", data, layout);
  });
  
