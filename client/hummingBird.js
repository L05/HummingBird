import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import Lag from './lag';
import Player from './player';
import Obstacle from './obstacle';

// This is a work in progress. I'm porting it and need to improve/optimize it as
// well. -L05

class HummingBird {

  constructor(pg_) {
    this.DEBUG_MODE         = true;
    this.strokeWeight_      = 2;
    this.difficultyScalar   = 0.1;

    strokeWeight(this.strokeWeight_);

    this.level              = 0;

    this.freqLow            = 196; // G3
    this.freqHigh           = 2*this.freqLow;

    this.gateThreshold      = 2;

    this.respawnCount       = 0;
    this.respawnTime        = 240;
    this.isRespawning       = false;
    this.pitchCount         = 0;
    this.pitchTime          = 30;
    this.isWaiting          = true;

    this.lagPlayerY         = new Lag();

    this.obstacleCount      = 0;
    this.obstacleInterval   = 100;
    this.gapSize            = 230;
    this.obstacleLow        = 200;
    this.obstacleHigh       = 860;
    this.playerSpeed        = 0;
    this.landSpeed          = 7;

    this.player             = new Player(width/4, height/2, this.landSpeed);
    this.obstacles          = [];
    append(this.obstacles, new Obstacle(width + this.strokeWeight_, this.pipeLow, this.pipeHigh, this.gapSize, this.birdSpeed));
  }

  //
  update() {
  //   updateGUI();
  //   updateSound();
  //   this.player.update();
  //
  //   // Normal flight
  //   if (!this.isRespawning && !this.isWaiting) {
  //
  //     // Increasing difficulty >:D
  //     this.playerSpeed = this.playerSpeed + this.difficultyScalar*(this.player.getScore());
  //
  //     for (let i = 0; i < obstacles.length; i++) {
  //       this.obstacles.[i].update();
  //       this.obstacles.[i].isColliding(this.player);
  //       this.obstacles.[i].setSpeed(this.playerSpeed);
  //       this.obstacles.[i].setGapSize(this.gapSize);
  //       this.obstacles.[i].isCleared(this.player);
  //
  //       if (!this.obstacles[i].isOnScreen()) {
  //         this.obstacles.splice(i , 1);
  //       }
  //     }
  //
  //     if (this.obstacleCount > this.obstacleInterval) {
  //       this.obstacleCount = 0;
  //       this.obstacles.append(new Obstacle(width+this.strokeWeight_, this.obstacleLow, this.obstacleHigh, this.gapSize, this.playerSpeed));
  //     } else {
  //       this.obstacleCount++;
  //     }
  //
  //     if (!this.player.isAlive()) {
  //       this.isRespawning = true;
  //     }
  //
  //   // Waiting for input
  // } else if (this.isWaiting) {
  //
  //     this.player.setAlive(true);
  //     this.landSpeed = 3;
  //
  //     // Look for mic input for a minimum of pitchTime (default = 30 frames).
  //     if (level > gateThreshold && pitchCount < pitchTime) {
  //       pitchCount++;
  //
  //     } else if (level > gateThreshold && pitchCount >= pitchTime) {
  //       pitchCount = 0;
  //       isWaiting = false;
  //
  //       // Set low and high pitch bounds based on input.
  //       freqLow  = int(pf.getLowFreq());
  //
  //       // Mininum frequency is 146 Hz. Lower creates issues due to
  //       // resonances in deep voices.
  //       if (freqLow < 146) {
  //         freqLow = 146;
  //       }
  //
  //       freqHigh = freqLow*2;
  //       birdSpeed = landSpeed;
  //
  //     } else {
  //
  //       pitchCount = 0;
  //     }
  //
  //   // Waiting for respawn
  //   } else {
  //
  //     birdSpeed = 0;
  //     landSpeed = 0;
  //
  //     for (int i = 0; i < pipes.size(); i++) {
  //       pipes.get(i).setSpeed(birdSpeed);
  //
  //       if (!pipes.get(i).isOnScreen()) {
  //         pipes.remove(i);
  //       }
  //     }
  //
  //     if (bird.getScore() > highScore) {
  //       highScore = bird.getScore();
  //     }
  //
  //     if (respawnCount > respawnTime) {
  //
  //       bird.setAlive(true);
  //       bird.resetScore();
  //
  //       respawnCount  = 0;
  //       pipeCount     = 0;
  //       isRespawning  = false;
  //       isWaiting     = true;
  //       landSpeed     = s_birdSpeed.getValue();
  //
  //       pipes.clear();
  //       pipes.add(new Pipe(px.width+strokeWeight_, pipeLow, pipeHigh, gapSize, birdSpeed, pipeImg1, pipeImg2));
  //
  //     } else {
  //
  //       respawnCount++;
  //     }
  //   }
  }

  updateSound() {
  }

  display() {

  }

  waitScreen() {

  }
}

export default HummingBird;
