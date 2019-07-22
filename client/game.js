import p5 from 'p5';

import HummingBird from './hummingBird';
import Obstacle from "./obstacle";
import {
    GAME_FPS,
    OBSTACLE_SPAN
} from "./constants";
import Player from "./player";
import {CONTROL, R_KEY, SPACE} from "./keyboardInput";
import AudioOverlay from "./audioOverlay";

export const PLAY = 'PLAY';
export const PAUSED = 'PAUSE';
export const GAME_OVER = 'GAME_OVER';

class Game {
    constructor() {
        this.hummingBird = null;
        this.audio = null;
        this.player = null;
        this.obstacles = [];
        this.lastObstacle = null;
        this.obstacleSpan = OBSTACLE_SPAN;
        this.page = null;

        this.gameState = PLAY;
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
        frameRate(GAME_FPS);

        this.player = new Player();
        this.audio = new AudioOverlay(this.player, createGraphics(width, height));
        this.hummingBird = new HummingBird(this.player, width, height);
    }

    reset() {
        const width = Game.getWindowWidth();
        const height = Game.getWindowHeight();

        this.obstacles = [];
        this.hummingBird = new HummingBird(this.player, width, height);

        this.gameState = PLAY;
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
            this.obstacles[i].check(this.hummingBird);
        }

        if (!this.obstacles[0].isOnScreen()) {
            this.obstacles.shift();
        }

        if (!this.hummingBird.isAlive()) {
            this.gameState = GAME_OVER;
        }
    }

    updateGameStatus() {
        const input = this.player.getInput();
        if (input[CONTROL] && input[R_KEY]) {
            this.reset();
        }

        if (input[SPACE] && this.gameState === PLAY) {
            this.gameState = PAUSED;
        }
    }

    draw() {
        this.updateGameStatus();

        background(0);

        this.hummingBird.draw();

        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw();
        }

        this.player.draw(this.gameState);
        this.audio.draw(this.gameState);

        if (this.gameState === PLAY) {
            this.update();
        }
    }
}

export default Game;
