'use strict'

var Chart = require('chart.js');

<script>
  var ctx = document.getElementById('myChart').getContext('2d');

  var myChart = new Chart(ctx, {
    type: 'bar',
    data:{
      labels:[]
      datasets: [{
        label:
        data:
        backgroundColor: []
        borderColor:[]
        borderWidth: 1
      }]
    },
    options: {
      events: ['click'];
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero: true
          }
        }]
      }
    }
  });
</script>

var handleClick(event){
  var activeElement = ctx.getElementAtEvent(event);
  console.log(activeElement);

}
