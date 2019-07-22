import p5 from 'p5';

import HummingBird from './hummingBird';
import Obstacle from "./obstacle";
import {
    COLOR_WHITE_VALUE,
    GAME_OVER_TEXT_SIZE,
    PAUSED_TEXT_SIZE,
    OBSTACLE_SPAN,
    SCORE_TEXT_HEIGHT,
    SCORE_TEXT_WIDTH,
    SCORE_TEXT_X_POS,
    SCORE_TEXT_Y_POS,
    RESET_TEXT_X_POS,
    RESET_TEXT_Y_POS,
    RESET_TEXT_WIDTH,
    RESET_TEXT_HEIGHT
} from "./constants";
import Player from "./player";
import {CONTROL, R_KEY, SPACE} from "./keyboardInput";

class Game {
    constructor() {
        this.hummingBird = null;
        this.player = null;
        this.obstacles = [];
        this.lastObstacle = null;
        this.obstacleSpan = OBSTACLE_SPAN;
        this.gamePaused = false;
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
        const width = Game.getWindowWidth();
        const height = Game.getWindowHeight();

        createCanvas(width, height);

        background(0);
        frameRate(60);
        textSize(16);

        this.hummingBird = new HummingBird(width, height);
        this.player = new Player();
    }

    reset() {
        const width = Game.getWindowWidth();
        const height = Game.getWindowHeight();

        this.obstacles = [];
        this.hummingBird = new HummingBird(width, height);
    }

    windowResized() {
        resizeCanvas(Game.getWindowWidth(), Game.getWindowHeight());
        this.reset();
    }

    update() {
        const width = Game.getWindowWidth();
        const height = Game.getWindowHeight();

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

        this.hummingBird.update(this.player);

        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].update(this.hummingBird.getSpeed());
            this.obstacles[i].isColliding(this.hummingBird);
            this.obstacles[i].isCleared(this.hummingBird);
        }
    }

    updatePlayState() {
        const input = this.player.getInput();
        if (input[CONTROL] && input[R_KEY]) {
            this.reset();
        }

        if (input[SPACE] && !this.gamePaused) {
            this.gamePaused = true;
        }

        // if (input[SPACE] && this.gamePaused) {
        //     this.gamePaused = false;
        // }
    }

    draw() {
        const width = Game.getWindowWidth();
        const height = Game.getWindowHeight();

        background(0);

        this.hummingBird.draw();

        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw();
        }

        fill(COLOR_WHITE_VALUE);
        text(`Score: ${this.hummingBird.getObstaclesCleared()}`, SCORE_TEXT_X_POS, SCORE_TEXT_Y_POS, SCORE_TEXT_WIDTH, SCORE_TEXT_HEIGHT);
        fill(COLOR_WHITE_VALUE);
        text('Reset: [CTRL + R]\nPause: [SPACE]', width + RESET_TEXT_X_POS, RESET_TEXT_Y_POS, RESET_TEXT_WIDTH, RESET_TEXT_HEIGHT);

        this.updatePlayState();

        if (!this.gamePaused) {
            this.update();
        }


        if (!this.hummingBird.isAlive()) {
            fill(COLOR_WHITE_VALUE);
            textSize(GAME_OVER_TEXT_SIZE);
            textAlign(CENTER, CENTER);
            text('Game Over!', 0, 0, width, height);
            return;
        }

        if (this.gamePaused) {
            fill(COLOR_WHITE_VALUE);
            textSize(PAUSED_TEXT_SIZE);
            textAlign(CENTER, CENTER);
            text('Paused', 0, 0, width, height);
        }

    }
}

export default Game;
