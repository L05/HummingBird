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
	}

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

		// const maximum = _.maxBy(maxima, (x) => x.value);
		// const ratios = _.map(maxima, (x) => Object.assign({}, x, {ratio: x.value / maximum.value}));
		// let theOne = 0;

		// for (let i = 0; i < maxima.length; i++) {
		// 	if (maxima[i].value > threshold) {
		// 		theOne = maxima[i].value;
		// 		console.log(theOne);
		// 	} else {
		// 		break;
		// 	}
		// }

		// // return _(ratios).filter((r) => r.ratio >= threshold).first();
		// return theOne;
	}

	getLowFrequencySpectrum() {
		return this.fft.analyze().slice(0, SPECTRUM_INDICES)
	}

	getSpectrum() {
		return this.fft.analyze();
	}
}

module.exports = AudioInput;

/*
  t++;
    float highest = 0;
    int highest_bin = 0;
    fft.forward(audio);
    int max_bin =  fft.freqToIndex(10000.0f);

    // Tweaked the implementation to check for the first peak past a
    // certain amplitude threshold. This will enable us to find the fundamental.
    // A little bit of a hack, but way more accurate once calibrated for
    // mic gain. -L05
    for (int n = 0; n < max_bin; n++) {
      if (fft.getBand(n) > threshold) {
        if (fft.getBand(n) > highest) {
          highest = fft.getBand(n);
          highest_bin = n;
        } else {
          break;
        }
      }
    }


    // OLD Implementation
    // println("////");
    // for (int n = 0; n < max_bin; n++) {
    //    if (fft.getBand(n) > highest) {
    //      highest = fft.getBand(n);
    //      highest_bin = n;
    //    }

    //    print("n: " + str(n) + "[" + str(fft.getBand(n)) + "], ");
    // }
    // println();

    float freq = highest_bin * 0.5 * sample_rate / float(audio.length);
    StoreFrequency(freq);
*/