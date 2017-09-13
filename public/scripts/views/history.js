'use strict';
var app = app || {};
var userData = userData || [];

(function(name){
  $.get(`/history/${name}`)
  .then(results =>{
    userData = results;
    app.labelData = userData.map(function(day){
      let label = new app.Day(day)
      return label.x;
    });
    app.dayData = userData.map(function(day){
      return new app.Day(day);
    })

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: app.labelData,
          datasets: [{
              label: 'Mood over time',
              data: app.dayData,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }],
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });

    var handleClick = function(event){
      var activeElement = myChart.getElementAtEvent(event);
      console.log('working');
    }

  });

  // // var handleClick = function(event){
  //   var activeElement = chart.getElementAtEvent(event);
  //   console.log('working');
  // }
})(localStorage.userName);
