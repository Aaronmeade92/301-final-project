'use strict'
app = app || {};
// var Chart = require('chart.js');

var chartProperties = function(){
  var labels = app.userData.map(function(day){
    return day.date;
  })
  var data = app.userData.data.map(function(day){
    return day.mood;
  })
}

  var ctx = document.getElementById('myChart').getContext('2d');


  var myChart = new Chart(ctx, {
    type: 'bar',
    data:{
      labels:'tacos',
      datasets: [{
        label: 'tacos',
        data: 'data',
        backgroundColor: [],
        borderColor:[],
        borderWidth: 1
      }]
    },
    options: {
      events: ['click'],
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero: true
          }
        }]
      }
    }
  });


var handleClick = function(event){
  var activeElement = ctx.getElementAtEvent(event);
  console.log(activeElement);

}
