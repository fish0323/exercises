let rectX = 0;
let fr = 30; //starting FPS
let clr;


function setup() {
    background(200);
    frameRate(fr); // Attempt to refresh at starting FPS
    clr = color(255, 0, 0);
  }


  function draw() {
    background(200);
    rectX = rectX += 1; // Move Rectangle
  
    if (rectX >= width) {
     // If you go off screen.
      if (fr === 30) {
        clr = color(0, 0, 255);
        fr = 10;
        frameRate(fr); // make frameRate 10 FPS
      } else {
        clr = color(255, 0, 0);
        fr = 30;
        frameRate(fr); // make frameRate 30 FPS
      }
      rectX = 0;
    }
    fill(clr);
    rect(rectX, 40, 20, 20);
  }