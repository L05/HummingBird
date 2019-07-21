import p5 from 'p5';

import HummingBird from './hummingBird';
import Obstacle from "./obstacle";
import {
    COLOR_WHITE_VALUE,
    GAME_OVER_TEXT_SIZE,
    OBSTACLE_SPAN, SCORE_TEXT_HEIGHT, SCORE_TEXT_WIDTH,
    SCORE_TEXT_X_POS,
    SCORE_TEXT_Y_POS
} from "./constants";

class Sketch {
    constructor() {
        this.hummingBird = null;
        this.obstacles = [];
        this.lastObstacle = null;
        this.obstacleSpan = OBSTACLE_SPAN;
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

    reset() {
        const width = Sketch.getWindowWidth();
        const height = Sketch.getWindowHeight();

        this.obstacles = [];
        this.hummingBird = new HummingBird(width, height);
    }

    windowResized() {
        resizeCanvas(Sketch.getWindowWidth(), Sketch.getWindowHeight());
        this.reset();
    }

    update() {
        const width = Sketch.getWindowWidth();
        const height = Sketch.getWindowHeight();

        if (this.obstacles.length === 0) {
            const obstacle = new Obstacle(width, height);

            this.obstacles.push(obstacle);
            this.lastObstacle = obstacle;
        }

        if (width - this.lastObstacle.getX() > this.obstacleSpan * width) {
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

        fill(COLOR_WHITE_VALUE);
        text(`Score: ${this.hummingBird.getObstaclesCleared()}`, SCORE_TEXT_X_POS, SCORE_TEXT_Y_POS, SCORE_TEXT_WIDTH, SCORE_TEXT_HEIGHT);

        this.update();

        if (!this.hummingBird.isAlive()) {
            noLoop();
            fill(COLOR_WHITE_VALUE);
            textSize(GAME_OVER_TEXT_SIZE);
            textAlign(CENTER, CENTER);
            text('Game Over!', 0, 0, Sketch.getWindowWidth(), Sketch.getWindowHeight());
        }
    }
}

export default Sketch;
