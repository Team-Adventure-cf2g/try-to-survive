'use strict';

// globals
var survivorArray = [];
var scenarioArray = [];
var scenarioOne = [
  [
    './img/alone.jpeg',
    'spooky picture', //src, alt text
    'You wake up alone, a fox is trying to swipe your supplies you must choose one', //Whats happening
    './img/jacketcard.png',
    './img/flintCard.png', // Choices
    'You quickly take the jacket and the fox runs away with the flint, as you curse the fox for stealing you notice a noise, you turn with a sense of alertness that escapes you in everyday life. You notice a ominous sillhouette approaching', //Choice jacket
    'You quickly take the flint as the fox ripps the jackets to shreds, as the fox escapes you ',
  ], //Choice flint

  [
    './img/bear.jpg',
    'A gosh darn bear',
    'A Bear approaches, what will you do?',
    './img/fightCard.png',
    './img/throwCard.png',
    'In your new jacket you feel so fly that you think you can take on a fully grown bear, The bear claws at your leg and then is overcome with a sense of pity for you and moves along with its patrol. -3',
    'You for some Reason throw your jacket at the bear.Perhaps you thought it was cold ... a stoke of luck falls upon you and the bear gets tangled in the jacket long enough for you to escape. Although, you are now jacketless',
  ],

  [
    './img/hole.jpeg',
    'a hole that can only inspire thoughts of an abyss',
    'As you frantically run from the bear, you are lost in your adrenaline fueled haste, before you can react you find yourself falling into a pit.',
    './img/climbCard.png',
    './img/digCard.png',
    'Your adrenaline high is enough to get you through most of the climb you fall several times, towards the end of your ascent the goings on of the day catch up with you, exhaustion becomes you. -5',
    'You pop to your feet, your survival instinct is activated. You manage to find a stick sturdy enough to dig with, you dig stairs out of the hole out of sheer will.',
  ],

  [
    './img/cold.jpeg',
    'an icy forest',
    'You emerge from the hole and are overcome by a sense of disoreintation, it appears as if in the time it took you to dig yourself out of the hole the forest has become enguled in snow',
    './img/fireCard.png',
    './img/moveCard.png',
    'You attempt to start a fire. You encounter feelings of regret you let that fox get away with the flint. hyppthermia sets in',
    'You decide it is best to keep moving and you continue onward to try and find your way to a road',
  ],
];

var currentScene = scenarioOne;

var jacketFight =[
  [],
[],
[],
[
  './img/cold.jpeg',
  'an icy forest',
  'You emerge from the hole and are overcome by a sense of disoreintation, it appears as if in the time it took you to dig yourself out of the hole the forest has become enguled in snow',
  './img/fireCard.png',
  './img/moveCard.png',
  'You attempt to start a fire. You encounter feelings of regret you let that fox get away with the flint. hyppthermia sets in',
  'You decide it is best to keep moving you snuggle in your jacket and trek towards safety.',
],];
var scenarioFlint = [
  [], //Choice flint,
  [
    './img/bear.jpg',
    'A gosh darn bear',
    'A Bear approaches, what will you do?',
    './img/fightCard.png',
    './img/throwCard.png',
    'With your newfound flint, you decide to try and light a fire in the bears\' face... this angers the bear. The bear claws at your leg and then is overcome with a sense of pity for you and moves along with its patrol. -3',
    'You for some Reason throw your newfound Flint at the bear. Perhaps you thought it would like to start a fire ... a stoke of luck falls upon you as the flint strikes the bear in the eye, distracting it long enough for you to escape. Although, you are now without flint',
  ],

  [
    './img/hole.jpeg',
    'a hole that can only inspire thoughts of an abyss',
    'As you frantically run from the bear, you are lost in your adrenaline fueled haste, before you can react you find yourself falling into a pit.',
    './img/climbCard.png',
    './img/digCard.png',
    'Your adrenaline high is enough to get you through most of the climb you fall several times, towards the end of your ascent the goings on of the day catch up with you, exhaustion becomes you. -5',
    'You pop to your feet, your survival instinct is activated. You manage to find a stick sturdy enough to dig with, you dig stairs out of the hole out of sheer will.',
  ],

  [
    './img/cold.jpeg',
    'an icy forest',
    'You emerge from the hole and are overcome by a sense of disoreintation, it appears as if in the time it took you to dig yourself out of the hole the forest has become enguled in snow',
    './img/moveCard.png',
    './img/fireCard.png',
    'You decide it is best to keep moving and think back to how toasty you might be with that jacket the fox ruined',
    'You attempt to start a fire. You use your flint to make a crackling campfire that keeps you warm enough to wait for help',
  ],

];

var flintThrow = [
  [], //Choice flint,
  [],
  [
    './img/hole.jpeg',
    'a hole that can only inspire thoughts of an abyss',
    'As you frantically run from the bear, you are lost in your adrenaline fueled haste, before you can react you find yourself falling into a pit.',
    './img/climbCard.png',
    './img/digCard.png',
    'Your adrenaline high is enough to get you through most of the climb you fall several times, towards the end of your ascent the goings on of the day catch up with you, exhaustion becomes you. -5',
    'You pop to your feet, your survival instinct is activated. You manage to find a stick sturdy enough to dig with, you dig stairs out of the hole out of sheer will.',
  ],

  [
    './img/cold.jpeg',
    'an icy forest',
    'You emerge from the hole and are overcome by a sense of disoreintation, it appears as if in the time it took you to dig yourself out of the hole the forest has become enguled in snow',
    './img/fireCard.png',
    './img/moveCard.png',
    'You attempt to start a fire. You encounter feelings of regret you threw the flint at the bear, even though it was great throw. hyppthermia sets in',
    'You decide it is best to keep moving and you continue onward to try and find your way to a road',
  ],

  [
    './img/wilderness2.jpg',
    'another wilderness',
    'you have struggled to find clean water',
    './img/runCard.png',
    './img/stayCard.png',
    'something happens',
    'something else happened',
  ],
];

//index 0 is Win inxed 1 is die
var endScreens = [
  [
    './img/congratz.jpg',
    'congrats message laying on gravel',
    'Congrats you survived',
    './img/deathCard.png',
    './img/aboutCard.png',
  ],
  [
    './img/deathScreen.jpg',
    ' a picture say that the user sucks',
    'Congrats you should stay inside',
    './img/deathCard.png',
    './img/aboutCard.png ',
  ],
];

var cardOne = document.getElementById('choiceOne');
var cardTwo = document.getElementById('choiceTwo');
// survivor contrsuctor

function Survivor(name) {
  this.name = name;
  this.healthCounter = 2;
  this.checkpointCounter = 0;
  this.score = 0;
  this.item = '';

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
    console.log('check');
    window.open('adventure.html', '_self');
  } else if (radioValue === 'returningPlayer') {
    window.open('adventure.html', '_self');
  }
}
userForm.addEventListener('submit', handleUser);
