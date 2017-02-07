//sketch04

var loading_createimg;

function preload() { 
 loading_createimg = createImg("images/loading.gif");  //img ref: http://i.imgur.com/omGnqz7.gif
}

function setup() {
 console.log("Hello World");
 createCanvas(820, 600);   //create a drawing canvas
 background(10);
 frameRate (15);  //try to change this parameter

}

function draw() {
 loading_createimg.position(width/3,0); //loads GIF 
 fill(10,80);  //check this syntax with alpha value
 rect(0, 0, width, height);
 drawThrobber(9);  //pass to another function, try changing this number


}

function drawThrobber(num) {  
  push();
  translate(width/2, height/2);
  var cir = 360/num*(frameCount%num);  //360/num >> degree of each ellipse' move ;frameCount%num >> get the remainder that indicates the movement of the ellipse 
  rotate(radians(cir));
  noStroke();
  fill(255,255,0); 
  ellipse(35,0,22,22);  //the moving dot(s), the y is the distance from the center
  pop();
  
  /*
  stroke(255,0,0);
  line(60,0,60,600);   //a static line
  */
}
