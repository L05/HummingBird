import p5 from 'p5';

import HummingBird from './hummingBird';
import AudioInput from './audioInput';

class Sketch {
    constructor() {
        this.hummingBird = null;
    }

    static getWindowWidth() {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.getElementsByTagName('body')[0].clientWidth
    }

    static getWindowHeight() {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.getElementsByTagName('body')[0].clientWidth
    }

    setup() {
        createCanvas(Sketch.getWindowWidth(), Sketch.getWindowHeight());
        noFill();
    }

    windowResized() {
        resizeCanvas(Sketch.getWindowWidth(), Sketch.getWindowHeight());
        noFill();
    }

    update() {

    }

    draw() {

    }

    pitchTest() {

    }
}

export default Sketch;
