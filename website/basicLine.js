
Plotly.d3.csv("data/graph1.csv", function (csv_data) {
  
    var date = csv_data.map(d => d.date);
    var golf = csv_data.map(d => d.golf);
    var tweets = csv_data.map(d => d.tweets);
    var positive = csv_data.map(d => d.positive);
    var negative = csv_data.map(d => d.negative);


    var tweets_trace = {
        name: "tweets",
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
            showgrid: false,
            range: ['2018-09-01', '2021-01-01'],
            rangeslider: {
                thickness: 0.1
            }
        },
        yaxis2: {

          overlaying: 'y',
          side: 'right', 
          range: [0,25],
          showgrid: false,
          title: {
            text: "monthly<br>golf trips",
        }
        },
        yaxis:{
            range: [0,160],
            title: {
                text: "monthly<br>tweets",
                standoff: 500
            }
        }
      };
    

    Plotly.newPlot('plot1', data, layout);
  
  });
  
