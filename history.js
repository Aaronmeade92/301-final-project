'use strict'

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
