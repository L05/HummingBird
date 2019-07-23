import p5 from 'p5';
import {AUDIO_FFT, AUDIO_LEVEL} from "./player";
import {PLAY} from "./game";

const SAMPLE_RATE = 44100;
const INPUT_ACCEPTANCE_LEVEL = 0.1;
const NOTES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

const closestKey = (freq) => {
    const key = closestKeyIndex(freq);
    if (key <= 0) {
        return null;
    }
    const range = 1 + (key - 1) / NOTES.length;
    return NOTES[(key - 1) % NOTES.length] + range;
};

const closestKeyIndex = (freq) => {
    return 1 + (int)((12 * Math.log(freq / 440) / Math.log(2) + 49) - 0.5);
};

const process = (spectrum, sampleRate, numSamples, sigma) => {
    let average = 0.0;
    for (let i = 0; i < spectrum.length; i++) {
        average += spectrum[i];
    }
    average = average / spectrum.length;

    let sums = 0;
    for (let i = 0; i < spectrum.length; i++) {
        sums += (spectrum[i] - average) * (spectrum[i] - average);
    }

    let stdev = Math.sqrt(sums / (spectrum.length - 1));

    const found = [];
    let max = Number.MIN_SAFE_INTEGER;
    let maxFreq = -1;
    for (let f = 0; f < spectrum.length / 2; f++) {
        if (spectrum[f] > average + sigma * stdev) {
            if (spectrum[f] > max) {
                max = spectrum[f];
                maxFreq = f;
            }
        } else {
            if (maxFreq !== -1) {
                found.push(maxFreq * sampleRate / numSamples);
                max = Number.MIN_SAFE_INTEGER;
                maxFreq = -1;
            }
        }
    }

    return found;
};


// Reference for Processing functions:
// http://archive.oreilly.com/oreillyschool/courses/data-structures-algorithms/soundFiles.html
class AudioOverlay {
    constructor(player, page) {
        this.player = player;
        this.page = page;
    }

    drawTimeSpectrum() {
        const waveform = this.player.getInput()[AUDIO_FFT].waveform();

        this.page.beginShape();
        this.page.noFill();
        this.page.stroke(255, 0, 0);
        this.page.strokeWeight(5);

        for (let i = 0; i < waveform.length; i++) {
            const x = this.page.map(i, 0, waveform.length, 0, this.page.width);
            const y = this.page.map(waveform[i], -1, 1, 0, this.page.height / 2);
            this.page.vertex(x, y);
        }
        this.page.endShape();
    }

    drawFrequencySpectrum() {
        const spectrum = this.player.getInput()[AUDIO_FFT].analyze();

        this.page.noStroke();
        this.page.fill(color('rgb(0,0,255)'));

        for (let j = 0; j < spectrum.length; j++) {
            const x = this.page.map(j, 0, spectrum.length, 0, this.page.width);
            const h = -this.page.height + this.page.map(spectrum[j], 0, 255, this.page.height, 0);
            this.page.rect(x, this.page.height, this.page.width / spectrum.length, h);
        }
    }

    // Must draw after frequency spectrum
    drawKey() {
        const level = this.player.getInput()[AUDIO_LEVEL];
        if (level < INPUT_ACCEPTANCE_LEVEL) {
            return;
        }

        const spectrum = this.player.getInput()[AUDIO_FFT].analyze();

        const found = process(spectrum, SAMPLE_RATE, spectrum.length, 4);

        const keys = [];
        found.forEach((frequency) => {
            console.log(closestKey(frequency));
            keys.push(closestKey(frequency));
        });


        this.page.fill(0);
        this.page.textSize(64);
        this.page.textAlign(CENTER, CENTER);
        this.page.text(keys.join(","), 0, 0, this.page.width / 2, this.page.height / 2);

    }

    draw(gameState) {
        this.page.background(200);

        this.drawTimeSpectrum();
        this.drawFrequencySpectrum();
        this.drawKey();

        image(this.page, 0, this.page.height - 200, 200, 200);
    }
}

export default AudioOverlay;