import p5 from 'p5';

import 'p5/lib/addons/p5.sound';

class Obstacle {

  // Constructors
  constructor(x_, low_, high_, gapSize_, dx_) {
    this.low        = low_;
    this.high       = high_;
    this.gapSize    = gapSize_;
    this.x          = x_;
    this.dx         = dx_;
    this.w          = 168;
    this.gapY       = random(this.low, this.high);
    this.onScreen   = true;
    this.cleared    = false;

    this.fillClr    = color(0);
    this.strokeClr  = color(255);
  }

// Draw pipes
  draw() {

    let x1 = this.x;
    let y1 = 0;
    let h1  = this.gapY - this.gapSize/2;

    let x2 = this.x;
    let y2 = h1 + this.gapSize;
    let h2  = height - y2;

    stroke(this.strokeClr);
    fill(this.fillClr);
    rect(x1, x1 - 10, this.w, h1 - 10);
    rect(x2, y2 - 10, this.w, h2 + 10);
  }

  update() {
    this.x -= this.dx;

    if (this.x < (0 - this.w)) {
      this.onScreen = false;
    }
  }

// Get/Set
  setSpeed(dx_) {
    this.dx = dx_;
  }

  setGapSize(gapSize_) {
    this.gapSize = gapSize_;
  }

  isColliding(player_) {
    const playerX = player_.getX();
    const playerY = player_.getY();
    const playerW = player_.getWidth();
    const playerH = player_.getHeight();

    if (
      (((playerX + playerW/2) > x && (playerX + playerW/2) < (this.x + this.w)) && (playerY + playerH/2) > (this.gapY + this.gapSize/2)) ||
      (((playerX + playerW/2) > x && (playerX + playerW/2) < (this.x + this.w)) && (playerY - playerH/2) < (this.gapY - this.gapSize/2)) ||
      (((playerX - playerW/2) > x && (playerX - playerW/2) < (this.x + this.w)) && (playerY + playerH/2) > (this.gapY + this.gapSize/2)) ||
      (((playerX - playerW/2) > x && (playerX - playerW/2) < (this.x + this.w)) && (playerY - playerH/2) < (this.gapY - this.gapSize/2))
      ) {

      player_.setAlive(false);
      return true;
    } else {
      return false;
    }
  }

  isCleared(player_) {
    const playerX = player_.getX();
    const playerW = player_.getWidth();

    if (((playerX - playerW/2) > (this.x + this.w)) && player_.isAlive() && this.cleared == false) {

      player_.addPoint();
      this.cleared = true;
      return this.cleared;
    } else {

      return this.cleared;
    }
  }

  isOnScreen() {
    return this.onScreen;
  }
}

export default Obstacle;
