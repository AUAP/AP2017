
// Function responsible for making and storing file paths to ads
function newReklam(arg1) {
  var reklam;

  // Code block wrapped in IF-statement so it only executes if box is checked on each page
  if (person[catHeaders[cat]] != undefined) {
    if (arg1) {
      reklam = [];
      for (i = 0; i < person[catHeaders[cat]].length; i++) {
          //pushes popup ad (file path) to the images-array
        reklam.push('assets/reklam/' + catHeaders[cat] + '/' + person[catHeaders[cat]][i] + '.png');
      }
    }
    images.push(reklam);
  }
}

// Function to call when the sign-up process is complete (to show ads)
function popup() {
  var u     = 0;
  var t     = 0;
  var popupspeed = 5000;

  //we have ourselfs here a manual forloop inside a forloop. because we wanted the increasing speed. of the popup ads.
  
  
  function oneimage() {
      var temp;

    // if you dont check a box on a page, the ad will be generic ( from general folder)
      if (images[u][t] != undefined) {
        temp = createImg(images[u][t]);
      } else {
        temp = createImg("assets/reklam/General/" + genAds[floor(random(6))] + ".png");
      }
      temp.position(random(-150, window.innerWidth-500), random(-100, window.innerHeight-400));
      if (popupspeed < 200) {
        popupspeed = 199;
      } else {
        popupspeed *= 0.85;
      }
      t++;
      if (t >= images[u].length) {
        t = 0;
        u++;
      }
      if (u == images.length) {
        u = 0;
      }
      if (u <= images.length) {
        myLoop();
      }
    }
  
  function myLoop() {
    setTimeout(oneimage, popupspeed);
  }
  myLoop();
}
