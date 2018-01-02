
import p5 from 'p5';
import HummingBird from './hummingBird';
import AudioInput from './audioInput';

class Sketch {
  constructor() {
    this.audioInput   = null;
    this.HummingBird  = null;
    this.freq         = -1;
  }

  setup() {
    createCanvas(900, 800);
    this.audioInput   = new AudioInput();
    this.HummingBird  = new HummingBird();
    noFill();
  }

  update() {
    this.freq         = this.audioInput.autoCorrelate();
  }

  draw(){
    this.update();

    background(200);

    this.pitchTest();

    if (this.freq > -1) {
      stroke(0);
      text(str(int(this.freq)) + " Hz", 10, 30);
    }
  }

  // Ark's pitch algorithm tests
  pitchTest() {
    let freq = this.audioInput.getFundamentalFrequency(0.5);
    let spectrum = this.audioInput.getLowFrequencySpectrum();

    let mean = _.mean(spectrum);

    stroke(0,0,255);
    beginShape();
    for (let i = 0; i < spectrum.length; i++) {
      vertex(i * 28, map(spectrum[i], 0, 255, height, 0));
    }
    endShape();

    stroke(0,255,0);
    beginShape();
    vertex(0, map(mean, 0, 255, height, 0));
    vertex(width, map(mean, 0, 255, height, 0));
    endShape();


    if (freq) {
      stroke(255,0,0);
      beginShape();

      vertex(freq.index * 28, map(255, 0, 255, height, 0));
      vertex(freq.index * 28, map(0, 0, 255, height, 0));
      endShape();
    }
  }
}

module.exports = Sketch;
