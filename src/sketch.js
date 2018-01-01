
import p5 from 'p5';
import AudioInput from './audioInput';

class Sketch {
  constructor() {
    this.audioInput = new AudioInput();
  }

  setup() {
    createCanvas(900, 800);
    noFill();
  }

  draw(){
    background(200);

    let ac = this.audioInput.autoCorrelate();

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

    // console.log(freq.value);
    // console.log("TEST");

    if (freq) {
      stroke(255,0,0);
      beginShape();

      vertex(freq.index * 28, map(255, 0, 255, height, 0));
      vertex(freq.index * 28, map(0, 0, 255, height, 0));
      endShape();
    }

    if (ac > -1) {
      stroke(0);
      text(str(int(ac)) + " Hz", 10, 30);
    }
  }
}

module.exports = Sketch;
