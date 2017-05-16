//REMEMBER: local server - (load through github)

//FROM HTML FILE
var textfield;
var output; //paragraph with statusupdates
var postbutton; 

var likebutton; 

var time = 3000; //3 sec

var count = new Counter(); 
var countLetter = new Lettercounter(); 
var characterCount = 0;
var letterCount = 0; 

function preload () {
    facebookFont = loadFont("data/klavika_bold_opentype.otf");  
}

function setup() { 
    createCanvas(displayWidth, displayHeight);
    output = select("#output"); //indicator for id is # - loads it from HTML file 
    textfield = select("#textArea"); //accessing HTML
    textfield.input(myInputEvent); 
    postbutton = select("#post");
    postbutton.mousePressed(newText);  
  
    //Likebutton - the rest is modified in document 'style.css' 
    likebutton = createButton('Like');
    likebutton.position(innerWidth / 2.10, innerHeight / 1.5);
    likebutton.mousePressed(increment);
    likebutton.class("like"); //assigning a class so it can be modified in 'style.css'

}

function paragraph() {
    output.html(textfield.value()); 
}

function eraseText() { //initialized in HTML file
    textfield.value(""); 
}

function draw () {
    background(59, 89, 152); 

    //facebook logo
    fill(255); 
    textSize(45); 
    textFont(facebookFont); 
    textAlign(LEFT); 
    text("facebook", 50, 50); 
    
    count.limit();
    count.display(); 
    
    //Appears when charactercount is equal or more than 200
    if (characterCount == 0) {
        textSize(20); 
        textAlign(CENTER); 
        textfield.attribute("maxlength", "0"); 
        text("Click like to speak!  ", innerWidth / 2, innerHeight / 1.8); //nudging...
 }
    
    if (characterCount >= 1 && characterCount <= 600) { 
        textSize(20); 
        textAlign(CENTER); 
        text("You can speak now. What's on your mind?", innerWidth / 2, innerHeight / 1.8); 
  } 
    if (characterCount >= 600 && characterCount <= 2000) {
        textSize(20); 
        textAlign(CENTER); 
        text("You can speak now. Tell your friends a story.", innerWidth / 2, innerHeight / 1.8); 
  }
 
}

function myInputEvent() {
    //What you are typing appears in the console 
    console.log('you are typing: ', this.value()); 
} 

function Counter() {
    this.posx = innerWidth / 2;
    this.posy = innerHeight / 2; 
    
    window.setInterval(
        this.decrement = function() {
        if(characterCount >= 1) { //only decrements when bigger than 1
        characterCount = characterCount - 1;
        }
        if(characterCount >= 1000){
           characterCount = characterCount - 50; 
        }
        }, 1000); //decrements 1 every second 
    
    this.limit = function() {
        if (characterCount < 0) { //so it doesn't go below 0
            characterCount = 0; 
        }
    };
    
    this.display = function() {
        textSize(36);
        textAlign(CENTER); 
        text("Numbers of characters:   " + characterCount, this.posx, this.posy);
        textFont(facebookFont); 
        fill(255); 
    }
}

function Lettercounter() {
    window.setInterval(
        this.decrement = function() {
        if(letterCount >= 1) { //only decrements when bigger than 1
        letterCount = letterCount - 1;
        }
        if(letterCount >= 1000){
           letterCount = letterCount - 50; 
        }
        }, 1000);
    
     this.limit = function() {
        if (letterCount < 0) { //so it doesn't go below 0
            letterCount = 0; 
        }
    };
}

function increment() {
    //round() = no decimals 
    letterCount = round(letterCount*1.17)+3; 
    characterCount = round(characterCount*1.17) + 3; //+3 so the characterCount doesn't stay at 0, and so the user imediatly will see the countdown and feel stressed out 
    fill(255); 
    textfield.attribute("maxlength", letterCount);
    textSize(36); 
    console.log(characterCount);
    console.log(letterCount); 
}

function newText() {
    time = time+(letterCount*10); 
    setTimeout(paragraph, time); 
    output.html(textfield.value()); //HTML function can be called to access the existing content of a DOM element or place existing content in it 
    console.log(time); 
}
