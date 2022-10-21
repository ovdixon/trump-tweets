var t = new Array(11).fill(0).map((d, i) => i / 10);

console.log(t)

Plotly.plot('tester', {
  data: [{
    x: t,
    y: t.map(t => t * t + Math.sin(t * 30)),
    id: t,
    mode: 'lines+markers',
    line: {simplify: false},
    transforms: [{
      type: 'filter',
      operation: '<=',
      target: t,
      value: 0.0
    }]
  }],
  layout: {
    xaxis: {autorange: false, range: [0, 1]},
    yaxis: {autorange: false, range: [-1, 2]},
    updatemenus: [{
      type: 'buttons',
      xanchor: 'left',
      yanchor: 'top',
      direction: 'right',
      x: 0,
      y: 0,
      pad: {t: 60},
      showactive: false,
      buttons: [{
        label: 'Play',
        method: 'animate',
        args: [null, {
          transition: {duration: 500},
          frame: {duration: 500, redraw: false},
          mode: 'immediate',
          fromcurrent: true,
        }]
      }, {
        label: 'Pause',
        method: 'animate',
        args: [[null], {
          transition: {duration: 500},
          frame: {duration: 500, redraw: false},
          mode: 'immediate',
        }]
      }]
    }],
    sliders: [{
      currentvalue: {
        prefix: 't = ',
        xanchor: 'right'
      },
      pad: {l: 130, t: 30},
      transition: {
        duration: 500,
      },
      steps: t.map(t => ({
        label: t,
        method: 'animate',
        args: [[t], {
          transition: {duration: 500},
          frame: {duration: 500, redraw: false},
          mode: 'immediate',
        }]
      }))
    }]
  },
  frames: t.map(t => ({
    name: t,
    data: [{'transforms[0].value': t}]
  }))
})


