//sketch08

// step 1. Declare Objects
var car = [];
var button;
var bg;


function preload() {
  bg = loadImage("data/road.jpg");
}
function setup() {
 createCanvas(windowWidth, windowHeight);
 button = createButton('add');
 button.mousePressed(add);
//step 2. Initialize object 
 car[0] = new Car(color(255,0,0), 10, 10, 100, 20);
 car[1] = new Car(color(0,0,255), 15, 20, 300, 10);

}

function draw() {
 background(bg);
 button.position(0,0);
 
  
//step 3. Use object 
 for (var i = 0; i <car.length; i++) {

  car[i].drive();
  car[i].display();
 }
}

function add() {

  car[car.length] = new Car(color(random(155,255)), random(2,10), random(10,20), random(10,500), random(30));
	
  //append can be used as well, which has the same effect as line 37	
  //append(car,  new Car(color(random(155,255)), random(2,10), random(10,20), random(10,500), random(30)));
}

function Car(getcolor, speed, xpos, ypos, size) {
   
	this.getcolor = getcolor;
	this.speed = speed;
	this.pos = new createVector(xpos, ypos);
	this.size = size;
	
	this.drive = function() {

		this.pos.x = this.pos.x + this.speed;
		
 		if (this.pos.x > width) {
 			 this.pos.x = 0;
 		} 

	}
		
	this.display = function() {
		noStroke();
 		fill(this.getcolor);
  		rect(this.pos.x,this.pos.y,this.size,this.size);
	}
	
}




