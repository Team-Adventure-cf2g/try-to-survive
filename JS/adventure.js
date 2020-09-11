//globals for adventure html
var card = document.querySelector('.card');
var secondCard = document.querySelector('.cardTwo');


function renderSurv() {
  var healthDis = document.getElementById('content-containter');
  var survivor = localStorage.getItem('survivor');


  survivorArray = JSON.parse(survivor);
  renderHealth();
  popScen();
  choiceCard();

  var choices = document.getElementById('choiceCont');
  // Handler for choice cards
  function choiceHandler(event) {

    var resultCont = document.getElementById('results');
    //logic for item choice

    //Assigning item to survivor
    itemChoice();

    if (event.target.alt === 'badChoice') {
      var resultTxt = document.createElement('p');
      resultTxt.textContent = scenarioOne[survivorArray[0].checkpointCounter][5]; //Result txt
      resultCont.append(resultTxt);
      //For item choice
      if (survivorArray[0].checkpointCounter === 0) {
        foxCard();
        resultTxt.setAttribute('class', 'neutral');
      } else {
        survivorArray[0].healthCounter--;
        resultTxt.setAttribute('class', 'bad');
      }

      choices.removeEventListener('click', choiceHandler);
      survivorArray[0].checkpointCounter += 1;


    } else if (event.target.alt === 'goodChoice') {
      if (survivorArray[0].checkpointCounter === 0) {
        foxCard();
        resultTxt.setAttribute('class', 'neutral');
      } else {
        var resultTxt = document.createElement('p');
        resultTxt.setAttribute('class', 'good');
      }
      resultTxt.textContent = scenarioOne[survivorArray[0].checkpointCounter][6];
      survivorArray[0].checkpointCounter += 1; //Result TXT
      resultCont.append(resultTxt);
      choices.removeEventListener('click', choiceHandler);
    }

    var serializedSurv = JSON.stringify(survivorArray);
    localStorage.setItem('survivor', serializedSurv);

    //End screen logic

    // Adding a continue Button
    var continueBtn = document.createElement('a');
    continueBtn.textContent = 'Continue';
    resultCont.append(continueBtn);

    // Continue button Event handler
    function continueHandle(event) {
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
renderSurv();

//Scenario Functions



function renderHealth() {
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ['Health'],
      datasets: [{
        barThickness: 30,
        label: `${survivorArray[0].name}'s Vitality`,
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
    localStorage.clear();
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
  //Randomly Changing Cards
  var rand = ((Math.floor(Math.random() * (4 - 2)) + 2) + 1);
  cardReset();


  var choiceOne = document.getElementById('choiceOne');
  var choiceTwo = document.getElementById('choiceTwo');
  var choiceOneBack = document.getElementById('choiceOneBack');
  var choiceTwoBack = document.getElementById('choiceTwoBack');


  //Card back alt test
  choiceOneBack.alt = 'A card with green text on it,';
  choiceTwoBack.alt = 'A card with red text on it,';

  if (rand === 4) {
    choiceOne.src = scenarioOne[survivorArray[0].checkpointCounter][rand];
    choiceTwo.src = scenarioOne[survivorArray[0].checkpointCounter][rand - 1];

    choiceOneBack.src = './img/GoodCard.png';
    choiceTwoBack.src = './img/BadCard.png';
    choiceOne.alt = 'goodChoice';
    choiceTwo.alt = 'badChoice';
  } else {
    choiceOne.src = scenarioOne[survivorArray[0].checkpointCounter][rand];
    choiceTwo.src = scenarioOne[survivorArray[0].checkpointCounter][rand + 1];

    choiceOneBack.src = './img/BadCard.png';
    choiceTwoBack.src = './img/GoodCard.png';
    choiceOne.alt = 'badChoice';
    choiceTwo.alt = 'goodChoice';
  }
}

function cardReset() {
  //Flip Cards back to front
  var resetCardOne = document.getElementsByClassName('card is-flipped')[0];

  var resetCardTwo = document.getElementsByClassName('cardTwo is-flipped')[0];


  if (resetCardOne) {  //if resetCardOne exists flip back to front
    resetCardOne.className = 'card';
  } else if (resetCardTwo) {
    resetCardTwo.className = 'cardTwo';
  }

  //reseting event listeners for flip
  card.addEventListener('click', oneflip);

  secondCard.addEventListener('click', twoFlip);
}


function oneflip(event) {
  card.classList.toggle('is-flipped');
  card.removeEventListener('click', oneflip);
  secondCard.removeEventListener('click', twoFlip);
}

function twoFlip(event) {
  secondCard.classList.toggle('is-flipped');
  card.removeEventListener('click', oneflip);
  secondCard.removeEventListener('click', twoFlip);
}

function itemChoice() {
  if (event.target.src.slice(-10) === 'ntCard.png') {
    survivorArray[0].item = 'flint';
  } else if (event.target.src.slice(-10) === 'etcard.png') {
    survivorArray[0].item = 'jacket';
  }

}

function foxCard() {
  choiceOneBack.src = './img/foxcard.png';
  choiceTwoBack.src = './img/foxcard.png';
}
// card flipp
card.addEventListener('click', oneflip);

secondCard.addEventListener('click', twoFlip);
