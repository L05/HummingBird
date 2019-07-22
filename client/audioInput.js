import p5 from 'p5';

import 'p5/lib/addons/p5.sound';

class AudioInput {
	constructor() {
		this.mic = new p5.AudioIn();
		this.mic.start();

		this.fft = new p5.FFT();
		this.fft.setInput(this.mic)
	}

	getFFT() {
		return this.fft.analyze();
	}

	getWaveform() {
		return this.fft.waveform();

	}

	getLevel() {
		return this.mic.getLevel();
	}

}

export default AudioInput;
