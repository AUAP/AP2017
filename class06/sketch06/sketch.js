//sketch06

var angle;
var getindex = 0;
var myFont;
var getlongstring = "";
var longstring;

function preload() {
  myFont = loadFont("data/MorePerfectDOSVGA.ttf");
  longstring = loadStrings("data/questions.txt"); 
}

function setup() {
 createCanvas(800, 600);   //create a drawing canvas
 background(0);
 noStroke();
 frameRate(10);
 loadlongstring();
}

function draw() {
  background(0);
  textFont(myFont);
  writeText();  //function without an argument
  displaychar();
}

function writeText() {
	var words = []  //array -> starts with 0
		words[0] = "hello world";
		words[1] = "what is code aesthetics?";
		words[2] = "array";
		words[3] = "using match";
		words[4] = "to draw";

  for (var i=0; i<words.length; i++) {  //for loop
     
     var m1 = match(words[i], "to");
     if (m1 != null) {  // If not null, then a match was found (boolean expression)
        fill(255, 255, 0);  //yellow color
     } else {
        fill(255);
     }
     
    textSize(13);
    text(words[i], width/4, (height/4)+50*i); //display text
    var size = words[i].length;  //include space character counting
    drawRect(size, i);  //invoke a function with an argument
  }
}

function drawRect(getSize, geti) {
  rect(width/4, (height/4)+50*geti, getSize*5, 10);  //rect visualization underneath the text
 
}

function loadlongstring() {
 	 	
 	for (var i = 0; i <longstring.length; i++) {
 	 getlongstring = getlongstring + longstring[i];
 	}
 	

}

function displaychar() {
   var lengthcount = getlongstring.length;
   var one = getlongstring.charAt(getindex); 
   getindex++;     
   if (getindex == lengthcount) {  //restart the text when it reaches the max //i didn't use a for loop because the text is running too fast within a loop
     	getindex = 0;
   }
   fill(255);
   textSize(16);
   text(">>> " + one, width/2, height/1.2);  //you can see text can be added. a text adds another text. 
}

