function MouseClickCircle(positionX, positionY) {
    this.posX = positionX;
    this.posY = positionY;
    this.radius = 5;
    this.fillOpacity = 150;
    this.strokeOpacity = 255; 

    this.display = function () {
        //display circle when radius is under 300 (when circle is faded)
        if (this.radius < 300) {
            
            //change radius: increase radius
            this.radius++;

            //change opacity: decrease opacity of fill and stroke (different speed)
            this.fillOpacity--;
            this.strokeOpacity -= 0.5; //slower than fill

            //display the circle
            stroke(0, 204, 0, this.strokeOpacity); 
            fill(0, 204, 0, this.fillOpacity);
            ellipse(this.posX, this.posY, this.radius, this.radius);
        }
    }
}