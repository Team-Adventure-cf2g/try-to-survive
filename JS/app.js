'use strict';



// globals
var survivorArray = [];
var scenarioArray = [];
var scenarioOne = [
  ['./img/alone.jpeg', 'spooky picture', 'You wake up alone, a fox is trying to swipe your supplies you must choose one', './img/jacketcard.png', './img/flintCard.png', 'You quickly take the jacket and the fox runs away with the flint', 'You quickly take the flint as the fox ripps the jackets to shreds'],
  ['./img/cold.jpeg', 'A cold place', 'A biting cold overcomes you', './img/runCard.png', './img/stayCard.png', 'something happens', 'something else happened'],
  ['./img/wilderness.jpg', 'Wilderness', 'Famine is you problem', './img/runCard.png', './img/stayCard.png', 'something happens', 'something else happened'],
  ['./img/fire.jpg', 'a ragingfire', ' a raging wildfire surrounds you', './img/runCard.png', './img/stayCard.png', 'something happens', 'something else happened'],
  ['./img/wilderness2.jpg', 'another wilderness', 'you have struggled to find clean water', './img/runCard.png', './img/stayCard.png', 'something happens', 'something else happened'],

];

//index 0 is Win inxed 1 is die
var endScreens = [
  ['./img/congratz.jpg', 'congrats message laying on gravel', 'Congrats you survived', './img/nextScenario.png', './img/veiwScore.png', '', ''],
  ['./img/deathScreen.jpg', ' a picture say that the user sucks', 'Congrats you should stay inside', './img/tryAgain.png', './img/devTeam.png ']
];

var cardOne = document.getElementById('choiceOne');
var cardTwo = document.getElementById('choiceTwo');
// survivor contrsuctor

function Survivor(name) {
  this.name = name;
  this.healthCounter = 2;
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
    window.open('adventure.html', self);
  } else if (radioValue === 'returningPlayer') {
    window.open('adventure.html', self);
  }
}
userForm.addEventListener('submit', handleUser);


//Scenario Functions

function renderSurv() {
  //globals for adventure html
  var healthDis = document.getElementById('content-containter');
  var survivor = localStorage.getItem('survivor');

  // card flipp
  var card = document.querySelector('.card');
  card.addEventListener('click',
    function () {
      card.classList.toggle('is-flipped');
    });

  var secondCard = document.querySelector('.cardTwo');
  secondCard.addEventListener('click',
    function () {
      secondCard.classList.toggle('is-flipped');
    });

  survivorArray = JSON.parse(survivor);
  console.log('check');
  renderHealth();
  popScen();
  choiceCard();

  var choices = document.getElementById('choiceCont');
  // Handler for choice cards
  function choiceHandler(event) {

    var resultCont = document.getElementById('results');
    if (event.target.alt === 'badChoice') {
      var resultTxt = document.createElement('p');
      resultTxt.textContent = scenarioOne[survivorArray[0].checkpointCounter][5]; //Result txt
      resultCont.append(resultTxt);
      //For item choice
      if (scenarioOne[survivorArray[0].checkpointCounter] === 0) {
        console.log('choice');
      } else {
        survivorArray[0].healthCounter--;
      }
      choices.removeEventListener('click', choiceHandler);
    } else if (event.target.alt === 'goodChoice') {
      var resultTxt = document.createElement('p');
      resultTxt.textContent = scenarioOne[survivorArray[0].checkpointCounter][6]; //Result TXT
      resultCont.append(resultTxt);
      choices.removeEventListener('click', choiceHandler);
    } 



    //End screen logic

    // Adding a continue Button
    var continueBtn = document.createElement('a');
    continueBtn.textContent = 'Continue';
    resultCont.append(continueBtn);

    // Continue button Event handler
    function continueHandle(event) {
      survivorArray[0].checkpointCounter += 1;
      continueBtn.textContent = '';
      choiceCard();
      popScen();
      renderHealth();
      choices.addEventListener('click', choiceHandler);
    }

    continueBtn.addEventListener('click', continueHandle);
  }


  choices.addEventListener('click', choiceHandler);

}

function renderHealth() {
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ['Health'],
      datasets: [{
        barThickness: 30,
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

function popScen() {
  var scene = document.getElementById('scenarioImg');
  var sceneTxt = document.getElementById('sceneTxt');
  if (survivorArray[0].healthCounter === 0) { //Death Case
    scene.src = endScreens[1][0];
    scene.alt = endScreens[1][1];
    sceneTxt.textContent = endScreens[1][2];
  } else if (survivorArray[0].checkpointCounter === 4) { //Win Case
    scene.src = endScreens[0][0];
    scene.alt = endScreens[0][1];
    sceneTxt.textContent = endScreens[0][2];
  } else { //Default Case
    scene.src = scenarioOne[survivorArray[0].checkpointCounter][0];
    scene.alt = scenarioOne[survivorArray[0].checkpointCounter][1];


    sceneTxt.textContent = scenarioOne[survivorArray[0].checkpointCounter][2];
  }
}


//Choice Card Function

function choiceCard() {
  var randCardOne = ((Math.floor(Math.random() * (4 - 2)) + 2) + 1);
  if (randCardOne === 3) {
    var randCardTwo = 4;
  } else {
    var randCardTwo = 3;
  }
  console.log(randCardTwo, randCardOne);
  var choiceOne = document.getElementById('choiceOne');
  var choiceTwo = document.getElementById('choiceTwo');
  var choiceOneBack = document.getElementById('choiceOneBack');
  var choiceTwoBack = document.getElementById('choiceTwoBack');

  //Assigning card back paths
  choiceOneBack.src = './img/GoodCard.png';
  choiceTwoBack.src = './img/BadCard.png';
  //Card back alt test
  choiceOneBack.alt = 'A card with green text on it,';
  choiceTwoBack.alt = 'A card with red text on it,';

  choiceOne.src = scenarioOne[survivorArray[0].checkpointCounter][randCardOne];
  choiceTwo.src = scenarioOne[survivorArray[0].checkpointCounter][randCardTwo];

  if (randCardOne === 3) { //Assigning alt text so cards can be switched
    choiceOne.alt = 'goodChoice';
    choiceTwo.alt = 'badChoice';
  } else {
    choiceOne.alt = 'badChoice';
    choiceTwo.alt = 'goodChoice';
  }
}










