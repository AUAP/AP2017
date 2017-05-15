function Stream(img) {													//pictures spawn
  this.x = random(-window.innerWidth, innerWidth);						//pictures spawn in a random location on screen
  this.y = random(-window.innerWidth, innerHeight);
  this.z = random(window.innerWidth);
  this.img = img;														//"this" is the pictures as objects
  
  this.sx = 0;															//
  this.sy = 0;
  this.size = 0;
  
  this.deleted = false;
  
  this.update = function() {											//checks and updates position
    this.z = this.z - speed;
    
    if (this.z < 1) { 													//returns to start when image hits edge. Therefore: this.z < 1
      this.z = width; 													//new position
      this.x = random(-window.innerWidth, window.innerWidth); 			//new position 
      this.y = random(-window.innerHeight, window.innerHeight);			//new position 
		this.deleted = false;
    }
  }

  this.show = function() {												//shows pictures
	if(this.deleted == false) {
		this.sx = map(this.x / this.z, 0, 1, 0, window.innerWidth); 	//pictures move towards the four corners, by division
		this.sy = map(this.y / this.z, 0, 1, 0, window.innerHeight);

		this.size = map(this.z, 0, window.innerWidth, 500, 17); 		//picture size relative to their closeness
		image(img, this.sx, this.sy, this.size, this.size);
	}
  }
  
  this.clicked = function(mX, mY) {										//checks if mouse is in picture area
	if (mX > this.sx && mX < this.sx+this.size && mY > this.sy && mY < this.sy+this.size){
		this.deleted = true;
	}
  }
}