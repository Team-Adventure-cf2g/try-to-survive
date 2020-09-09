'use strict';


// globals
var survivorArray = [];
var scenarioArray = [];
var questionArray = [
  ['./img/bear.jpg','A vicious Bear','A Wild Bear approaches' ,'./img/runCard.png','./img/stayCard.png'],
  ['./img/cold.jpeg','A cold place','A biting cold overcomes you','./img/runCard.png','./img/stayCard.png'],
  ['./img/wilderness.jpg','Wilderness','Famine is you problem','./img/runCard.png','./img/stayCard.png'],
  ['./img/fire.jpg','a ragingfire',' a raging wildfire surrounds you','./img/runCard.png','./img/stayCard.png'],
  ['./img/wilderness2.jpg','another wilderness','you have struggled to find clean water','./img/runCard.png','./img/stayCard.png'],
];

// survivor contrsuctor

function Survivor(name) {
  this.name = name;
  this.healthCounter = 5;
  this.checkpointCounter = 0;
  this.score = 0;

  survivorArray.push(this);
}

// Scenario constructor
function Scenario(imgSrc, imgAlt) {
  this.imgSrc = imgSrc;
  this.imgAlt = imgAlt;
  this.questionCounter = 0;

  scenarioArray.push(this);

}


//functions
var userForm = document.getElementById('userForm');

//Event handler for index.html
function handleUser(event) {
  event.preventDefault();
  var radioValue;
  var radios = userForm.elements['option'];
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radioValue = radios[i].value;
      break;
    }
  }

//Radio handling leogic
  if (radioValue === 'newPlayer') {
    var newSurvivor = new Survivor(event.target.userName.value);
    var serilizedSurv = JSON.stringify(survivorArray);
    localStorage.setItem('survivor', serilizedSurv);
    window.open('adventure.html',self);
  } else if (radioValue === 'returningPlayer') {
    window.open('adventure.html',self);
  }
}
userForm.addEventListener('submit', handleUser);


//Scenario Functions

function renderSurv() {
  var healthDis = document.getElementById('content-containter');
  var survivor = localStorage.getItem('survivor');
  survivorArray = JSON.parse(survivor);
  console.log('check');
  renderHealth();
  popScen();
  choiceCard();

}

function renderHealth() {
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ['Health'],
      datasets: [{
        label: 'Health Remaining',
        data: [survivorArray[0].healthCounter],
        backgroundColor: [
          'red'
        ],
        borderColor: [
          '#fff'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

  });
}

//Scenario Population functions

function popScen(){
  var scene = document.getElementById('scenarioImg');
  var sceneTxt = document.getElementById('sceneTxt');
  scene.src = questionArray[survivorArray[0].checkpointCounter][0];
  scene.alt = questionArray[survivorArray[0].checkpointCounter][1];

  sceneTxt.textContent = questionArray[survivorArray[0].checkpointCounter][2];
}

//Choice Card Function

function choiceCard(){
  var choiceOne = document.getElementById('choiceOne');
  var choiceTwo = document.getElementById('choiceTwo');

  choiceOne.src = questionArray[survivorArray[0].checkpointCounter][3];
  choiceTwo.src = questionArray[survivorArray[0].checkpointCounter][4];
}




