//VARIABLES
on = false																//switch between screens								

var textbox;															//textbox for start screen

var streams = [];														//picture stream

//speed variables
var speed;
var frameSpeed = 10;
var maxSpeed = 3;

//picture variables for the spawning pictures
var pictures = [];
var pictureLength =10;													//
var ceiling = 0;														//determines the amount of pictures spawning

//sound variables
var sound;																//sound-effect by counter
var count = 0; 

//background variables
var img; 																//start screen background
var img2;																//spawn screen background

//-----------------------------------------------------------------------------------------------------------------------------------------------------
//PRELOAD
function preload () {											
	for (var i = 0; i < 38; i++) {
		pictures[i] = loadImage('assets/img' + i + '.png');				//picture array (spawn screen)
	}
  sound = loadSound('sound/notification.mp3');							//sound for spawn screen
  
  img = loadImage('background/interface.png');							//background image
  
  img2 = loadImage('startasset/update.jpg');							//image on start screen
 }

//------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNCTION SETUP
function setup() {												
  createCanvas(window.innerWidth, window.innerHeight);					//canvas
  
  if (on) { 															//spawn screen
  
  increasePictures(1);										
  sound.play(); 														//first sound-effect
  
  } else { 																//start screen
  
  console.log("Hello World");
  background(215, 232, 347);											//start screen canvas colour
  
  textbox = createInput("What's happening?");							//start screen textbox and instruction text
  textbox.position(window.innerWidth/2-208, window.innerHeight/2-38);	//textbox position
  textbox.size(415, 71);										 		//textbox size
  textbox.style('font-size', '20px');									//textbox font
  textbox.style('color', '#bfc4cc');
  textbox.mousePressed(gone);											//removes "what's happening" when pressed (function below)
  }  
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNCTION DRAW
function draw() {												
	if (on) { 															//spawn screen

		textbox.hide();													//removes textbox from spawn screen
		
		background(250);
		image(img, window.innerWidth/2-img.width/2, window.innerHeight/2-img.height/2); 	//canvas image position
 	
		if (frameSpeed >= 10.5) { 										//frame-speed starts at 10 - it reaches 10.5 after about one second.
			var usertext = trim(textbox.value ()); 						//trim = removes spaces after the text, so if you make too many spaces, they are deleted in update
			textSize (24); 												//posting the written text (size)

			text (usertext, window.innerWidth/2-415, window.innerHeight/2 - 185, 345, 160); // " * 0.xx" = xx % from top and xx % from left  //last 4 arguments are coordinates of a rectangle
		}

		frameRate(frameSpeed);											//framerate starts at 10
		if (frameSpeed < 1000 && frameCount%2) {						//when framerate hits 1000 it starts increasing by 0.1 per frame
			frameSpeed +=0.1;
			count ++;
		}
		if (maxSpeed < 100 && frameCount%2) {
			maxSpeed ++;
		}
	
		speed = map(window.innerHeight, 0, window.innerWidth, 0, maxSpeed);

		if (count >= 5){												//sound-effect by counter
			sound.play();
			count = 0;
		}
  
		translate(window.innerWidth / 2, window.innerHeight / 2); 		//pics start at the middle of canvas
  	
		for (var i = 0; i < streams.length; i++) {
    
			streams[i].update();
			streams[i].show();

		}
		if (ceiling < 500) {increasePictures(1);}						//when 500 images are reached, no more are spawned
  
	} else { 															//start screen
		
		background(215, 232, 347);
		image(img2, window.innerWidth/2-221, window.innerHeight/2-75, 442, 150);	//start screen update image
		textbox.position(window.innerWidth/2-208, window.innerHeight/2-38);			//update textbox position
	}
}
  
//----------------------------------------------------------------------------------------------------------------------------------------------------
//FUNCTIONS
function increasePictures(amount) {
  
  for (var i = 0; i < amount; i++) {							//pictures increase by one, randomly from array
  	var r = floor(random(0, pictures.length));					//frames by module
  	var tStream = new Stream(pictures[r]);
	streams.push(tStream);										//pushes new image
  }
  ceiling ++;													//till 500
}

function gone(){												//removes text when clicked (start screen)
	textbox.value('');
	textbox.style('color', '#000000'); 							//changes text-colour when typing (start screen)
}

function mousePressed(){
	var postButtonLeft = window.innerWidth/2+132;				//
	var postButtonRight = window.innerWidth/2+206;
	var postButtonTop = window.innerHeight/2+39;
	var postButtonBottom = window.innerHeight/2+70;
	if (mouseX > postButtonLeft && mouseX < postButtonRight && mouseY > postButtonTop && mouseY < postButtonBottom && on == false){		//"button"-area to post/switch screens from start to spawn
		on = true
		
	}
	else if(on == true) {
		for(var i = 0; i < streams.length; i++) {
			streams[i].clicked(mouseX-innerWidth/2, mouseY-innerHeight/2);
		}
	}
}