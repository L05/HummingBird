import p5 from 'p5';

import 'p5/lib/addons/p5.sound';

class Obstacle {

  // Constructors
  constructor(viewportWidth, viewportHeight) {
    this.viewport = {x: viewportWidth, y: viewportHeight};
    this.xPosition = viewportWidth;
    this.yPosition = viewportHeight;
    this.gapSize = 100;
    this.gapPosition = random(0, viewportHeight - this.gapSize);

    this.xDelta = 100;
    this.onScreen = true;
    this.cleared = false;

    this.fillColor = color('rgb(0,0,255)');
    this.strokeColor = color(255);
  }

  draw() {
    stroke(this.strokeColor);
    fill(this.fillColor);

    rect(this.xPosition, this.gapPosition, this.xDelta, -this.gapPosition);
    rect(this.xPosition, this.gapPosition + this.gapSize, this.xDelta, this.yPosition - (this.gapPosition + this.gapSize));
  }
}

export default Obstacle;
