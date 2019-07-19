import p5 from 'p5';

import 'p5/lib/addons/p5.sound';
import Lag from './lag'

class Player {

  // Constructors
    constructor(x_, y_, dx_) {
      this.x          = x_;
      this.y          = y_;
      this.prevY      = y_;

      this.dx         = dx_;
      this.dy         = 0;

      this.r          = 0;

      this.lagDy      = new Lag();

      this.bounceFreq = 10;
      this.bounceAmp  = 4;

      this.alive      = true;

      this.w          = 90;
      this.h          = 63;

      this.score      = 0;

      this.strokeClr  = color(255);
      this.fillClr    = color(0);

      // particles = new ArrayList<Particle>();
    }

  // Draw player.
    draw() {
      // stroke(255);
      // text(str(dy), 50, 200);

      push();
        // compute flight bounce
        if (this.alive) {
          translate(0, this.bounceAmp*sin(this.bounceFreq*millis()/1000.0));
        }

        beginShape();
          // draw bird
          this.dy    = this.lagDy.level(this.y - this.prevY, 0.7, 0.7);

          translate(this.x, this.y);
          rotate(radians(this.dy));
          stroke(this.strokeClr);
          fill(this.fillClr);
          rect(-this.w/2, -this.h/2, this.w, this.h);
        endShape();
      popMatrix();
    }

    update() {
      this.prevY = this.y;
    }

  // Get/Set
    setX(x_) {
      this.x = x_;
    }

    setY(y_) {
      this.y     = y_;
    }

    setW(w_) {
      this.w = w_;
    }

    setH(h_) {
      this.h = h_;
    }

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

    getWidth() {
      return this.w;
    }

    getHeight() {
      return this.h;
    }

    addPoint() {
      this.score++;
    }

    setScore(score_) {
      this.score = score_;
    }

    getScore() {
      return this.score;
    }

    setOsc(oscAmp_, oscFreq_) {
      this.oscAmp  = oscAmp_;
      this.oscFreq = oscFreq_;
    }

    isAlive() {
      return this.alive;
    }

    setAlive(alive_) {
      this.alive = alive_;
    }
}

export default Player;
