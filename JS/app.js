'use strict';
// globals
survivorArray = [];
scenarioArray = [];
questionArray = [
  ['Bear Attack','run','fight' ],
  ['Stuck in hole', 'climb','dig stairs'],
  ["Cold",'keep moving','fire']
];

// survivor contrsuctor

function Survivor(name){
  this.name = name;
  this.healthCounter = 5;
  this.checkpointCounter = 0;
  this.score = 0;

  survivorArray.push(this);
}

// Scenario constructor
function Scenario(imgSrc,imgAlt){
  this.imgSrc = imgSrc;
  this.imgAlt = imgAlt;
  this.questionCounter = 0;

  scenarioArray.push(this);

}


//functions