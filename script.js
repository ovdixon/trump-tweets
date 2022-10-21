Plotly.d3.csv("data/graph1.csv", function (csv_data) {

    var date = csv_data.map(d => d.date);
    var golf = csv_data.map(d => d.golf);
    var tweets = csv_data.map(d => d.tweets);
    var positive = csv_data.map(d => d.positive);
    var negative = csv_data.map(d => d.negative);


    var tweets_trace = {
        name: "negative<br>tweets",
        x: date,
        y: negative,
        type: 'scatter',
        line: {
            color: 'rgba(29, 161, 242, 0.7)',
            shape: 'spline',
            smoothing: 0.8
          }

    };

    var golf_trace = {
        name: "golf",
        x: date,
        y: golf,
        yaxis: 'y2',
        type: 'scatter',
        line: {
            color: "rgba(10, 110, 84, 0.8)",
            shape: 'spline',
            smoothing: 0.8
        }
    };

    var data = [golf_trace, tweets_trace];

    var layout = {
        title: {
            text:'Less golfing, more ranting',
            font: {
                family: 'Baskerville-Bold',
                size: 18
            },
        },
        font: {
            family: 'Baskerville',
            size: 13
        },
        legend: {
            x: 1.05,
            y: 1
          },
        xaxis: {
            title: "Month",
            range: ['2018-09-01', '2021-01-01'],
            rangeslider: {
                thickness: 0.1
            },
            fixedrange: true
        },
        yaxis2: {

          overlaying: 'y',
          side: 'right', 
          range: [0,25],
          showgrid: false,
          title: {
            text: "monthly<br>golf trips",
        },
        fixedrange: true
        },
        yaxis:{
            range: [0,160],
            title: {
                text: "monthly<br>negative<br>tweets",
                standoff: 500
            },
            fixedrange: true
        }
      };
    

    Plotly.newPlot('plot1', data, layout, {displayModeBar: false});
  
  });
  

Plotly.d3.csv("data/graph2.csv", function (csv_data) {

  var config = {responsive: true}
    
  
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

    no_golf = {
        name: "no golf",
        x: time,
        type: 'histogram',
        histnorm: 'percent',
        nbinsx: 24,
        transforms: [{
            type: 'filter',
            target: golf_day,
            operation: '=',
            value: 'false'
        },{
            type: 'filter',
            target: sentiment,
            operation: '<',
            value: '0'
        },{
            type: 'filter',
            target: time,
            operation: '>',
            value: "2020-01-08 0:00"
        }],
        marker: {
            color: "rgba(255, 180, 64, 0.6)",
            line: {
                color:  "rgba(255, 180, 64, 1)", 
                width: 2
            } 
         },
        opacity: 0.75 
    };

    golf = {
        name: "golf",
        x: time,
        type: 'histogram',
        histnorm: 'percent',
        nbinsx: 24,
        transforms: [{
            type: 'filter',
            target: golf_day,
            operation: '=',
            value: 'true'
        },{
            type: 'filter',
            target: sentiment,
            operation: '<',
            value: '0'
        }, {
            type: 'filter',
            target: time,
            operation: '>',
            value: "2020-01-08 0:00"
        }],
        marker: {
            color: "rgba(10, 110, 84, 0.6)", 
             line: {
              color:  "rgba(10, 110, 84, 1)", 
              width: 2
            }
          },
        opacity: 0.5  
    };

    

    var data = [no_golf, golf]


    var layout = {
        title: {
            text:'Trump tweets less at the tee',
            font: {
                family: 'Baskerville-Bold',
                size: 18
            },
          },
        font: {
            family: 'Baskerville',
            size: 13
          },
        xaxis: {
            showgrid: true,
            tickformat: '%HH',
            title: "Time",
            fixedrange: true
        },
        yaxis: {
            title: {
                text: "% of<br>daily<br>tweets",
                standoff: 100,
                fixedrange: true,
            },
            range: [0,16]
        },
        barmode: 'overlay',
        updatemenus: [{
            type: 'buttons',
            showactive: false,
            x: 1.05,
            xanchor: 'left',
            y: 0.55,
            yanchor: 'top',
            buttons: [{  
                label: 'negative<br>tweets',
                method: 'restyle',
                args: ['transforms[1]', [{
                    type: 'filter',
                    target: sentiment,
                    operation: '<',
                    value: '0'
                }], [0,1]]
            },{  
                label: 'positive<br>tweets',
                method: 'restyle',
                args: ['transforms[1]', [{
                    type: 'filter',
                    target: sentiment,
                    operation: '>',
                    value: '0'
                }], [0,1]]
              }
        ]
        }],
        annotations: [{
            xref: 'paper',
            yref: 'paper',
            x: 0.575,
            xanchor: 'right',
            y: 0.75,
            yanchor: 'bottom',
            text: "Average<br>playing<br>time",
            showarrow: false,
            font: {
                size: 15,
                color: '#0A6E54'
            },
          }],
          shapes: [
              // highlight typical golf hours
              {
                  type: 'rect',
                  xref: 'x',
                  yref: 'paper',
                  x0: '2020-01-08 10:02',
                  y0: 0,
                  x1: '2020-01-08 14:43',
                  y1: 1,
                  fillcolor: '#d3d3d3',
                  opacity: 0.3,
                  line: {
                      width: 0
                  }
              }]  
          
          
    }

    Plotly.newPlot('plot2', data, layout, {displayModeBar: false}).then(function() { // call update latyout after both plots have rendered
        window.requestAnimationFrame(function() {
          window.requestAnimationFrame(function() {
            mobileLayout();        
          });
        });
      });

  
  });

// update layout with larger text for mobile screens
var updatePlot1 = {
    font: {
            family: 'Baskerville',
            size: 17
    },
    title: {
            text:'Less golfing, more ranting',
            font: {
                family: 'Baskerville-Bold',
                size: 30
            }
    }
};

var updatePlot2 = {
    font: {
            family: 'Baskerville',
            size: 17
    },
     title: {
            text:'Trump tweets less at the tee',
            font: {
                family: 'Baskerville-Bold',
                size: 30
            }
        }
};

// check if user on mobile and if so relayout plots with larger text
function mobileLayout(){
  if(navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)){
    Plotly.relayout('plot1', updatePlot1);
    Plotly.relayout('plot2', updatePlot2);

 }
  
}

