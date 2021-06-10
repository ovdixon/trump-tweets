
Plotly.d3.csv("data/export.csv", function (csv_data) {
    
  
    // map data from csv to variables
    var time = csv_data.map(d => '2020-01-08 ' + d.time);
    console.log(time)
    var sentiment = csv_data.map(d => d.sentiment);
    // tweeted whie playing golf
    var golf_play = csv_data.map(d => d.while_playing);
    // tweeted on a day golf was played
    var golf_day = csv_data.map(d => d.played_golf_date);
    // visited golf course but didn't play
    var golf_visit = csv_data.map(d => d.visit_golf);
    // any golf interaction either played or visited
    var golf_all = csv_data.map(d => d.any_golf);

    var trace = {
        x: time,
        y: sentiment,
        mode: 'markers',
        type: 'scatter',
        transforms: [{
            type: 'filter',
            target: golf_play,
            operation: '=',
            value: 'true'
        },
        {
            type: 'filter',
            target: sentiment,
            operation: '!=',
            value: '0'
        },
        {
            type: 'filter',
            target: sentiment,
            operation: '!=',
            value: '1'
        },
        {
            type: 'filter',
            target: time,
            operation: '>',
            value: "2020-01-08 8:00"
        },
        {
            type: 'filter',
            target: time,
            operation: '<',
            value: "2020-01-08 18:00"
        }
    ]
    }

    var data = [trace]

    

    var layout = {
        xaxis: {
            tickformat: '%HH',
            title: "Time of day"
        },
        yaxis: {
            title: "tweet sentiment"
        }  
        
    }


  
    Plotly.newPlot("tester", data, layout);
  });
  
