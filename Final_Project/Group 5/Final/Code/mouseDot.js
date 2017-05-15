function mouseDot(positionX, positionY, marker, date, sessionTime) {
    this.posX = positionX;
    this.posY = positionY;
    
    this.display = function () {
        //display the location marker
        image(marker, this.posX - 25, this.posY - 50);

        //data displayed
        noStroke();
        fill(0, 204, 0);
        textSize(16);
        text(this.posX + "," + this.posY, this.posX + 5, this.posY); //coordinate
        text(date.toLocaleDateString() + " " + date.toLocaleTimeString(), this.posX + 5, this.posY + 20); //current time
        text(sessionTime, this.posX + 5, this.posY + 40); //session time
    }
}