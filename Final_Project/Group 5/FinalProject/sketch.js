var circles = [];
var markers = [];

var numClicks = 0;
var currentDate;
var startDate;
var sessionTime;

var feed;
var marker;


function preload() {
    feed = loadImage("assets/feed.png"); //background picture
    marker = loadImage("assets/marker.png"); //location marker 
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    startDate = new Date();
}


function draw() {
    currentDate = new Date();
    background(feed);

    //data box behind green variables
    noStroke();
    fill(0, 0, 0, 150);
    rect(0, 0, 250, windowHeight);

    //mouse coordinate lines/cross hairs
    stroke(0, 204, 0);
    strokeWeight(3);
    line(mouseX, 0, mouseX, windowHeight);
    line(0, mouseY, windowWidth, mouseY);

    //text style
    noStroke();
    fill(0, 204, 0);
    textFont("Courier New");
    textSize(20);
    textStyle(BOLD);

    //display start date and time
    text(startDate.toLocaleDateString() + " " + startDate.toLocaleTimeString(), 10, 20);
    //display current date and time
    text(currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString(), 10, 50);
    //display session time
    sessionTime = currentDate - startDate;
    text(sessionTime, 10, 80);

    //mouse movement factor (pixels pr frame)
    text(mouseX + " , " + mouseY, 10, 110);
    text((mouseX - pmouseX) + " , " + (mouseY - pmouseY), 10, 140);

    //display number of clicks 
    text(numClicks, 10, 170);

    strokeWeight(1);
    //display all circles in array
    for (var i = 0; i < circles.length; i++) {
        circles[i].display();
    }

    //display coordinate markers
    for (var i = 0; i < markers.length; i++) {
        markers[i].display();
    }

}


function mouseClicked() {
    //create circle when mouse is clicked
    circles[circles.length] = new MouseClickCircle(mouseX, mouseY);

    //increases by one for each mouse click
    numClicks++;

    //draws a location marker where the mouse is when it is clicked
    markers[markers.length] = new mouseDot(mouseX, mouseY, marker, new Date(), sessionTime);

}