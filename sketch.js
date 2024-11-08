let spiralCircles = [];
let circleDiameter = 200;
let time = 0;
let bgColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(2, 85, 122); // Initialize background color
  background(bgColor);
  
  let xSpacing = circleDiameter + 15;
  let ySpacing = circleDiameter + 15;
  let xOffset = -width / 2; 
  
  // Create SpiralCircle objects in a grid
  for (let y = circleDiameter / 2; y <= height + circleDiameter; y += ySpacing) {
    for (let x = xOffset; x <= width + circleDiameter; x += xSpacing) {
      let spiralCircle = new SpiralCircle(x, y, circleDiameter);
      spiralCircles.push(spiralCircle);
    }
    xOffset += circleDiameter / 2; 
  }
}

function draw() {
  background(bgColor); //Change bg color 
  time += 0.05; // Increment time for smooth movement

  for (let i = 0; i < spiralCircles.length; i++) {
    spiralCircles[i].display(time); // Pass `time` to animate each SpiralCircle
    spiralCircles[i].checkMouseHover(); // Check if mouse is hovering over circles
  }
}

function keyPressed() {
  if (key === ' ') { // Check if space button is pressed
    bgColor = color(random(255), random(255), random(255)); // Randomize background color
  }
}

class SpiralCircle { // the class of spiral circles 
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.radius = diameter / 2;

    // Pre-generate random colors for the dots to avoid strobe effect
    this.dotColors = [];
    let dotCount = 40;
    for (let i = 0; i < dotCount; i++) {
      this.dotColors.push(color(random(255), random(100), random(255))); 
    }

    this.diametColors = [];
    let numCircles = 10;
    for (let i = 0; i < numCircles; i++) {
      this.diametColors.push(color(random(255), random(255), random(250)));
    }
  }

  display(time) {
    this.drawPattern(time);
    this.drawInterCircleCurves(); // Draw curves in the spaces between circles
    this.drawOuterRing(time);
    this.drawDynamicSpirals(time);
  }

  drawInnerCircles() { //inner black green white circles with fixed color 
    let sizes = [45, 25, 10];

    fill(0);
    noStroke();
    circle(this.x, this.y, sizes[0]);

    fill(0, 255, 100);
    noStroke();
    circle(this.x, this.y, sizes[1]);

    fill(255);
    noStroke();
    circle(this.x, this.y, sizes[2]);
  }

  drawOuterRing(time) {
    let outerDotCount = 32;
    let outerRadius = (this.diameter + 60) / 2.35;
    let colors = [color(255, 0, 0), color(255, 165, 0), color(255, 255, 0)];

    for (let j = 0; j < outerDotCount; j++) {
      let angle = map(j, 0, outerDotCount, 0, TWO_PI);
      let offset = cos(time + j * 0.1) * 10;
      let outerDotX = this.x + cos(angle) * (outerRadius + offset);
      let outerDotY = this.y + sin(angle) * (outerRadius + offset);

      fill(colors[j % colors.length]);
      noStroke();
      ellipse(outerDotX, outerDotY, 10, 8);
    }

    this.drawEightCircles(outerRadius);
  }

  drawEightCircles(outerRadius) {
    let outerCircleCount = 6;

    for (let i = 0; i < outerCircleCount; i++) {
      let angle = map(i, 0, outerCircleCount, 0, TWO_PI);
      let outerX = this.x + cos(angle) * outerRadius;
      let outerY = this.y + sin(angle) * outerRadius;

      this.drawThreeCircles(outerX, outerY);
    }
  }

  drawThreeCircles(x, y) { //the three circles on the outring with fixed color 
    let sizes = [20, 13, 5];

    fill(255, 69, 0);
    noStroke();
    circle(x, y, sizes[0]);

    fill(0);
    noStroke();
    circle(x, y, sizes[1]);

    fill(255);
    noStroke();
    circle(x, y, sizes[2]);
  }
  
  drawDynamicSpirals(time) { //the red dynamic spirals 
    let spiralSize = this.radius * 0.8;
    let angleStep = TWO_PI / 20;
    let angleOffset = PI / 190;

    stroke(255, 0, 0);
    strokeWeight(3.5);
    noFill();

    beginShape();
    for (let i = 0; i < 28; i++) {
      let angle = i * angleStep + time * 0.5 + angleOffset;
      let spiralX = this.x + cos(angle) * spiralSize * (i / 20);
      let spiralY = this.y + sin(angle) * spiralSize * (i / 20);
      vertex(spiralX, spiralY);
    }
    endShape();
  }

  drawPattern(time) {
    let numCircles = 10;
    let dotCount = 40;

    for (let i = 0; i < numCircles; i++) {
      let currentDiameter = this.diameter - i * 30;

      fill(this.diametColors[i]);
      noStroke();
      ellipse(this.x, this.y, currentDiameter);

      for (let j = 0; j < dotCount; j++) {
        let angle = map(j, 0, dotCount, 0, TWO_PI);
        let offset = sin(time + j * 0.1) * 5;
        let dotX = this.x + cos(angle) * (currentDiameter / 2 + offset);
        let dotY = this.y + sin(angle) * (currentDiameter / 2 + offset);

        fill(this.dotColors[j]);
        ellipse(dotX, dotY, 6);
      }
    }

    this.drawInnerCircles();
  }

  drawInterCircleCurves() {
    let curveCount = 15;
    let outerRadius = this.radius + 10;

    for (let i = 0; i < curveCount; i++) {
      let angleOffset = map(i, 0, curveCount, -2 * PI / 4, 2 * PI + PI / 4);
      let startX = this.x + cos(angleOffset) * outerRadius;
      let startY = this.y + sin(angleOffset) * outerRadius;
      let endX = this.x + cos(angleOffset + PI / 5) * outerRadius;
      let endY = this.y + sin(angleOffset + PI / 5) * outerRadius;

      stroke(255, 69, 0);
      strokeWeight(8);
      noFill();

      beginShape();
      vertex(startX, startY);
      quadraticVertex(
        this.x + cos(angleOffset + PI / 10) * (outerRadius + 10),
        this.y + sin(angleOffset + PI / 10) * (outerRadius + 10),
        endX,
        endY
      );
      endShape();
    }
  }

  // Check if mouse is hovering over the circle
  checkMouseHover() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < this.radius) {
      // If mouse is hovering, move the circle slightly
      this.x += random(-1, 1); //x and y move in the range
      this.y += random(-1, 1);
    }
  }
}
