'use strict'

//chart script from chartjs.org

function renderChart() {
  var ctx = document.getElementById('scoreChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Score 1', 'Score 2', 'Score 3', 'Score 4', 'MScore 5', 'Score 6', 'Score 7'],
        datasets: [{
            label: 'High Score',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});
}





