import p5 from 'p5';

import HummingBird from './hummingBird';
import AudioInput from './audioInput';
import Obstacle from "./obstacle";

class Sketch {
    constructor() {
        this.hummingBird = null;
        this.obstacles = [];
    }

    static getWindowWidth() {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.getElementsByTagName('body')[0].clientWidth
    }

    static getWindowHeight() {
        return window.innerHeight
            || document.documentElement.clientHeight
            || document.getElementsByTagName('body')[0].clientHeight
    }

    setup() {
        const width = Sketch.getWindowWidth();
        const height = Sketch.getWindowHeight();

        createCanvas(width, height);

        background(0);
        frameRate(60);

        this.hummingBird = new HummingBird(width, height);
    }

    windowResized() {
        resizeCanvas(Sketch.getWindowWidth(), Sketch.getWindowHeight());
    }

    update() {
        const width = Sketch.getWindowWidth();
        const height = Sketch.getWindowHeight();

        if (this.obstacles.length === 0) {
            const obstacle = new Obstacle(width / 2, height);

            this.obstacles.push(obstacle);
        }

        this.hummingBird.update();

        for (let i = 0; i < this.obstacles.length; i++) {
            // this.obstacles[i].update(this.hummingBird.getSpeed());
            // this.obstacles[i].isColliding(this.hummingBird);
            // this.obstacles[i].isCleared(this.hummingBird);
        }
    }

    draw() {
        this.update();

        background(0);

        this.hummingBird.draw();

        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw();
        }
    }
}

export default Sketch;
