import p5 from 'p5';

import HummingBird from './hummingBird';
import Obstacle from "./obstacle";

class Sketch {
    constructor() {
        this.hummingBird = null;
        this.obstacles = [];
        this.lastObstacle = null;
        this.obstacleSpan = 800;
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
        textSize(16);

        this.hummingBird = new HummingBird(width, height);
    }

    windowResized() {
        resizeCanvas(Sketch.getWindowWidth(), Sketch.getWindowHeight());
    }

    update() {
        const width = Sketch.getWindowWidth();
        const height = Sketch.getWindowHeight();

        if (this.obstacles.length === 0) {
            const obstacle = new Obstacle(width, height);

            this.obstacles.push(obstacle);
            this.lastObstacle = obstacle;
        }

        if (width - this.lastObstacle.getX() > this.obstacleSpan) {
            const obstacle = new Obstacle(width, height);

            this.obstacles.push(obstacle);
            this.lastObstacle = obstacle;
        }

        this.hummingBird.update();

        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].update(this.hummingBird.getSpeed());
            this.obstacles[i].isColliding(this.hummingBird);
            this.obstacles[i].isCleared(this.hummingBird);
        }
    }

    draw() {
        background(0);

        this.hummingBird.draw();

        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw();
        }

        fill(255);
        text(`Score: ${this.hummingBird.getObstaclesCleared()}`, 10, 10, 100, 50);

        this.update();

        if (!this.hummingBird.isAlive()) {
            noLoop();
            fill(255);
            textSize(64);
            textAlign(CENTER, CENTER);
            text('Game Over!', 0, 0, Sketch.getWindowWidth(), Sketch.getWindowHeight());
        }
    }
}

export default Sketch;
