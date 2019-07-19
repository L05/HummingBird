import p5 from 'p5';

import 'p5/lib/addons/p5.sound';

class HummingBird {
  constructor(viewportWidth, viewportHeight) {
    this.viewport = {x: viewportWidth, y: viewportHeight};
    this.speed = 10;

    this.xPosition = viewportWidth / 16;
    this.yPosition = viewportHeight / 2;
    this.xDelta = 50;
    this.yDelta = 50;

    this.fillColor = color('rgb(0,255,0)');
    this.strokeColor = color(255);
  }

  draw() {
    stroke(this.strokeColor);
    fill(this.fillColor);

    rect(
        this.xPosition,
        this.yPosition,
        this.xDelta,
        this.yDelta);
  }

  getSpeed() {
    return this.speed;
  }

  update() {

  }

}

export default HummingBird;
