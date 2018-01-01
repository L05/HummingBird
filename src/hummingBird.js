import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import Lag from './lag';
import Player from './player';
import Obstacle from './obstacle';

class HummingBird {

  constructor() {
    this.DEBUG_MODE    = true;
    this.strokeWeight_ = 2;

    strokeWeight(this.strokeWeight_);

    this.freqLow       = 196; // G3
    this.freqHigh      = 2*this.freqLow;

    this.gateThreshold = 2;

    this.respawnCount  = 0;
    this.respawnTime   = 240;
    this.isRespawning  = false;
    this.pitchCount    = 0;
    this.pitchTime     = 30;
    this.isWaiting     = true;

    this.lagBirdY      = new Lag();

    this.pipeCount     = 0;
    this.pipeInterval  = 100;
    this.gapSize       = 230;
    this.pipeLow       = 200;
    this.pipeHigh      = 860;
    this.birdSpeed     = 0;
    this.landSpeed     = 7;

    this.player        = new Player(width/4, height/2, this.landSpeed);
    this.obstacles     = [];
    append(this.obstacles, new Obstacle(width + this.strokeWeight_, this.pipeLow, this.pipeHigh, this.gapSize, this.birdSpeed));
  }

  update() {

  }

  display() {

  }

  waitScreen() {

  }
}

module.exports = HummingBird;
