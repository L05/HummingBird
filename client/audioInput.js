// Check this out:
//  http://access.feld.cvut.cz/view.php?cisloclanku=2009060001

import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import _ from 'lodash';

const SPECTRUM_INDICES = 2048 / 28;

const validIndex = (list, index) => {
	return index >= 0 && index < list.length;
}

const getSpread = (spectrum, midIndex) => {
	let spread = [];
	spread.push(spectrum[midIndex]);
	if (validIndex(spectrum, midIndex - 1)) {
		spread.unshift(spectrum[midIndex - 1])
	}
	if (validIndex(spectrum, midIndex - 2)) {
		spread.unshift(spectrum[midIndex - 2])
	}
	if (validIndex(spectrum, midIndex + 1)) {
		spread.unshift(spectrum[midIndex + 1])
	}
	if (validIndex(spectrum, midIndex + 2)) {
		spread.unshift(spectrum[midIndex + 2])
	}
	return spread;
};

const std = (data) => {
	const mean = _.mean(data);
	const summation = _(data).map((x) => pow(x - mean , 2)).sum()
	return sqrt(summation / data.length);
};

const mean = (data) => {
	return _.mean(data);
}

class AudioInput {
	constructor() {
		this.mic = new p5.AudioIn();
		this.mic.start();
		this.fft = new p5.FFT();
		this.fft.setInput(this.mic);

    // For autoCorrelate implementation.
		this.rafID = null;
		this.tracks = null;
		// this.noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
		this.MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
		this.GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be
	}

	// Ark's AMDF implementation. This doesn't actually return a frequency in Hz. We need that.

	getFundamentalFrequency(threshold) {
		let spectrum = this.getLowFrequencySpectrum();
		let curr, prev, next;
		let maxima = [];

		for (prev = 0, curr = 1, next = 2; next < spectrum.length; prev++, curr++, next++) {
			// Clipping detection - treat as maxima
			if (spectrum[prev] < spectrum[curr] && spectrum[curr] == spectrum[next]) {
				maxima.push({index: curr, value: spectrum[curr], spread: getSpread(spectrum, curr)});
			}

			// Local Maxima
			if (spectrum[prev] < spectrum[curr] && spectrum[curr] > spectrum[next]) {
				maxima.push({index: curr, value: spectrum[curr], spread: getSpread(spectrum, curr)});
			}
		}

		_(maxima).map((m) => Object.assign({}, m, {mean: mean(m.spread), std: std(m.spread)})).map();

		const maximum = _.maxBy(maxima, (x) => x.value);
		const ratios = _.map(maxima, (x) => Object.assign({}, x, {ratio: x.value / maximum.value}));

		// Not sure why this line isn't working. vvv
		// return _(ratios).filter((r) => r.ratio >= threshold).first();

		for (let i = 0; i < ratios.length; i++) {
			// console.log(ratios[i].ratio);
			if (ratios[i].ratio > threshold) {
				return ratios[i];
			}
		}
	}

	getLowFrequencySpectrum() {
		return this.fft.analyze().slice(0, SPECTRUM_INDICES)
	}

	getSpectrum() {
		return this.fft.analyze();
	}

	// cwilso's correlation implementation, adapted. (https://github.com/cwilso/PitchDetect).
  // It doesn't work that great when there are louder upper harmonics. :(

	noteFromPitch( frequency ) {
		const noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
		return Math.round( noteNum ) + 69;
	}

	frequencyFromNoteNumber( note ) {
		return 440 * Math.pow(2,(note-69)/12);
	}

	centsOffFromPitch( frequency, note ) {
		return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
	}

	autoCorrelate() {
		const buf = this.fft.waveform();
		const rate = sampleRate();

		const SIZE = buf.length;
		const MAX_SAMPLES = Math.floor(SIZE/2);
		let best_offset = -1;
		let best_correlation = 0;
		let rms = 0;
		let foundGoodCorrelation = false;
		let correlations = new Array(MAX_SAMPLES);

		for (let i=0;i<SIZE;i++) {
			let val = buf[i];
			rms += val*val;
		}
		rms = Math.sqrt(rms/SIZE);
		if (rms<0.01) // not enough signal
			return -1;

		let lastCorrelation=1;
		for (let offset = this.MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
			let correlation = 0;

			for (let i=0; i<MAX_SAMPLES; i++) {
				correlation += Math.abs((buf[i])-(buf[i+offset]));
			}
			correlation = 1 - (correlation/MAX_SAMPLES);
			correlations[offset] = correlation; // store it, for the tweaking we need to do below.
			if ((correlation>this.GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
				foundGoodCorrelation = true;
				if (correlation > best_correlation) {
					best_correlation = correlation;
					best_offset = offset;
				}
			} else if (foundGoodCorrelation) {
				// short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
				// Now we need to tweak the offset - by interpolating between the values to the left and right of the
				// best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
				// we need to do a curve fit on correlations[] around best_offset in order to better determine precise
				// (anti-aliased) offset.

				// we know best_offset >=1,
				// since foundGoodCorrelation cannot go to true until the second pass (offset=1), and
				// we can't drop into this clause until the following pass (else if).
				let shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];
				return rate/(best_offset+(8*shift));
			}
			lastCorrelation = correlation;
		}
		if (best_correlation > 0.01) {
			// console.log("f = " + rate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
			return rate/best_offset;
		}
		return -1;
	//	let best_frequency = rate/best_offset;
	}



}

export default AudioInput;
