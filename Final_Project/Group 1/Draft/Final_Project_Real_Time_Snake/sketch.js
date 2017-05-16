/*
Inspired  by and borrowed sample code from github users:
Daniel Schifman: https://github.com/CodingTrain/Rainbow-Code/tree/master/CodingChallenges/CC_03_Snake_game_p5.js
Strikemike2k: https://github.com/strikemike2k/snake
*/

var s;        // Snake
var scl = 20; // Scale is the dimensions we use throughout the program.
var food;     // Food group one
var img= [];  // Makes an image array
var r;        // Random function to pick a random picture in the array
var gameState = 'init'; // Keeps track of gamestate. Sets it to init by default
var count=0;  // food count
var nfood= []; // Food group two
var pics = []; // Picture array for the food
var currentFoodItems = []; // Keep tracks of the food
var myFont;    // Custom font

function preload(){
  myFont = loadFont('assets/8bit.ttf');
  for (var i = 0; i< 4; i++){
      img[i] = loadImage("assets/social" + i + ".png");
   }
  r=floor(random(0,img.length)); //Choses a random image
}


function setup() {
  createCanvas(800, 600);
  frameRate(10);
}

function initGame() {
  background(111,150,83);
	var title = 'SNAKE GAME';
  textFont(myFont);
	textSize(62);
	fill('BLACK');
	nameWidht = textWidth(title);
	text(title, (width - nameWidht)/2, height/2 - 40);
	startBtn = createButton('Start Game');
	startBtn.position(width/2 - startBtn.width/2, height/2);
	startBtn.mousePressed(startGame);
	noLoop();
}

function startGame() {
  removeElements();
	gameState = 'play';
	s = new Snake();
  count = 1;
  generateFood(count);
	loop();
}

function runGame() {
  background(111,150,83);

  s.update();
  s.show();

  //check if snake is eating and then if no food items are left add new ones
  // If count < 5 then add one more food. If count 5-50 add 5 new food. If count > 50 add 25 new food.
  checkIsSnakeEating();
  if (currentFoodItems.length < count) {
    if (count < 5) {
      count++;
    }

    else if (count >50) {
          count+=25;
    }

    else  {
      count+=5
    }
    generateFood(count)
  }

      //render all food items
      for(var i = 0; i < currentFoodItems.length; i++) {
      pics[i].display();
      }
}

function endGame(){
	background('BLACK');
  var msg = 'Game Over';
  textAlign(CENTER);
  var msg = 'Game Over';
  var msg2 = 'You drowned in';
  var msg3 = 'the Real-Time Streams';
	msgWidht = textWidth(msg);
  msg2Width = textWidth(msg2);
  msg3Width = textWidth(msg3);
	fill('LIMEGREEN');
  textSize(62);
	text(msg, (width/2), (height/2 - 80));
  textSize(19);
  text(msg2, (width/2), (height/2-10));
  textSize(19);
  text(msg3, (width/2), (height/2+30));
	startBtn = createButton('Restart Game');
	startBtn.position(width/2 - startBtn.width/2, height/2 + 60);
	startBtn.mousePressed(restartGame);
	noLoop();
}

function restartGame() {
  location.reload(true); //Reloads game by updating page
}


// Check if snake is at any of the current foods, then remove that food
function checkIsSnakeEating() {
  for(var i = 0; i < currentFoodItems.length; i++) {

    if(s.eat(currentFoodItems[i])) {
      currentFoodItems.splice(i, 1);
      pics.splice(i, 1); //
      i = currentFoodItems.length;
    }
  }
}

// Clears current food, ads new foods at random locations and adds to array, also sets pics array
function generateFood(count) {
  var cols = floor(width/scl);
  var rows = floor(height/scl);

  for(var i = currentFoodItems.length; i < count; i++) {
    currentFoodItems.push(new createVector(floor(random(cols)), floor(random(rows))));
    currentFoodItems[i].mult(scl);
    pics[i] = new Pic(currentFoodItems[i].x, currentFoodItems[i].y, img[floor(random(0, img.length))]);
  }
}

function draw() {
  if(gameState == 'init'){
  		initGame();
  	}

  	else if(gameState == 'play'){
  		runGame();
  	}

  	else if(gameState == 'end'){
  		endGame();
    }

    if (count>2500){
      gameState = 'end';
    }
}

function Pic (x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;

    this.display = function() {
        image(img, this.x, this.y);
    }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}
