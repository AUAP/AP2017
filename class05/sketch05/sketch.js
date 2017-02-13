//sketch05
var fillVal = 0;


function setup() {
 createCanvas(820, 600);   //create a drawing canvas
 background(0);
}

function draw() {

footer(12,8);

	if (mouseIsPressed) {
		noStroke();
		fill(255);
		var size = map(mouseX, 0, width, 2, 15);
		rect(mouseX, mouseY, size, size);
    }
}

function keyPressed() {   //reset the background
	
   if (keyCode == 32) {  //spacebar check: http://keycode.info/
		fillVal = 0;   //black

   }else{ 
   		fillVal = 150;  //grey
   }

   fill(fillVal);
   rect(0,0,width, height);
}

function footer(distance, footersize) {
  for (var i = 0; i < width; i+=distance) {
  		fill (random(200));
  		ellipse(i, height/1.05, footersize,footersize);
  }

}