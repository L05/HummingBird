import p5 from 'p5';
import {AUDIO_FFT, AUDIO_WAVEFORM} from "./player";
import {PLAY} from "./game";

class AudioOverlay {
    constructor(player, page) {
        this.player = player;
        this.page = page;
    }

    drawWaveform() {
        const waveform = this.player.getInput()[AUDIO_WAVEFORM];

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

    drawFFT() {
        const fft = this.player.getInput()[AUDIO_FFT];

        this.page.noStroke();
        this.page.fill(color('rgb(0,0,255)'));

        for (let j = 0; j < fft.length; j++) {
            const x = this.page.map(j, 0, fft.length, 0, this.page.width);
            const h = -this.page.height + this.page.map(fft[j], 0, 255, this.page.height, 0);
            this.page.rect(x, this.page.height, this.page.width / fft.length, h);
        }
    }

    draw(gameState) {
        this.page.background(200);

        this.drawWaveform();
        this.drawFFT();

        image(this.page, 0, this.page.height - 200, 200, 200);
    }
}

export default AudioOverlay;