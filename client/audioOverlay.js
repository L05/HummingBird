import p5 from 'p5';
import {AUDIO_FFT, AUDIO_WAVEFORM} from "./player";
import {PLAY} from "./game";
import KeyLookup from './key/keyLookup';

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
        const centroid = this.player.getInput()[AUDIO_FFT].getCentroid();

        const key = KeyLookup.getKey(centroid);

        this.page.fill(0);
        this.page.textSize(64);
        this.page.textAlign(CENTER, CENTER);
        this.page.text(key.name(), 0, 0, this.page.width / 2, this.page.height / 2);

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