import p5 from 'p5';

import 'p5/lib/addons/p5.sound';

class HummingBird {
  constructor(viewportWidth, viewportHeight) {
    this.viewport = {x: viewportWidth, y: viewportHeight};
    this.speed = 5;

    this.xPosition = viewportWidth / 10;
    this.yPosition = window.mouseY;
    this.xDelta = 50;
    this.yDelta = 50;

    this.fillColor = color('rgb(0,255,0)');
    this.strokeColor = color(255);

    this.alive = true;
    this.obstaclesCleared = 0;
  }

  setAlive(alive) {
    this.alive = alive;
  }

  isAlive() {
    return this.alive;
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

  getObstaclesCleared() {
    return this.obstaclesCleared;
  }

  incrementObstaclesCleared() {
    this.obstaclesCleared = this.obstaclesCleared + 1;
  }

  update() {
    this.yPosition = window.mouseY;
  }

  getX() {
    return this.xPosition;
  }

  getY() {
    return this.yPosition;
  }

  getWidth() {
    return this.xDelta;
  }

  getHeight() {
    return this.yDelta;
  }
}

export default HummingBird;
