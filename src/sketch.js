
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
    
    let freq = this.audioInput.getFundamentalFrequency(50);
    let spectrum = this.audioInput.getLowFrequencySpectrum();

    let mean = _.mean(spectrum);

    stroke(0,0,255);
    beginShape();
    for (let i = 0; i < spectrum.length; i++) {
      vertex(i*28, map(spectrum[i], 0, 255, height, 0));
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