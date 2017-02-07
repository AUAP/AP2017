function setup() {
 console.log("Hello World");
 createCanvas(800, 600);   //create a drawing canvas
}

function draw() {
  fill(100);  //check this syntax with alpha value
  rect(0, 0, width, height);
  ellipse(400, 300, 80, 80);  //draw an ellipse
}
