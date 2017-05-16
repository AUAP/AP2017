function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0; // "The head of the snake"
  this.tail = [];

// If the distance from the snake head to something is less than 1 pixel
// then add one more to the tail if tail<4
  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      if(this.tail.length<4) {
      this.total++;
    }
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.update = function() {

    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

// Makes the snake move according to the grid.
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

// Makes it possible for the snake to pass through the walls.
    if (this.x > width-5) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height-5) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
  }

  this.show = function() {
    fill('BLACK');
    stroke(111,150,83);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
}
