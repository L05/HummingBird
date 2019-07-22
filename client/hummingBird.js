import p5 from 'p5';

import 'p5/lib/addons/p5.sound';
import {
    HUMMINGBIRD_SPEED,
    HUMMINGBIRD_COLLISION_EDGE_LENGTH,
    HUMMINGBIRD_X_POS_FIXED,
    COLOR_WHITE_VALUE,
    COLOR_GREEN_VALUE
} from './constants';
import {MOUSE_Y} from "./mouseInput";


class HummingBird {
    constructor(player, viewportWidth, viewportHeight) {
        this.viewport = {x: viewportWidth, y: viewportHeight};
        this.speed = HUMMINGBIRD_SPEED * viewportWidth;

        this.xPosition = HUMMINGBIRD_X_POS_FIXED * viewportWidth;
        this.yPosition = player.getInput()[MOUSE_Y];
        this.yDelta = HUMMINGBIRD_COLLISION_EDGE_LENGTH * viewportHeight;
        this.xDelta = HUMMINGBIRD_COLLISION_EDGE_LENGTH * viewportHeight;

        this.fillColor = color(COLOR_GREEN_VALUE);
        this.strokeColor = color(COLOR_WHITE_VALUE);

        this.alive = true;
        this.obstaclesCleared = 0;
    }

    setAlive(alive) {
        this.alive = alive;
    }

    isAlive() {
        return this.alive;
    }

    draw() {
        stroke(this.strokeColor);
        fill(this.fillColor);

        rect(
            this.xPosition,
            this.yPosition,
            this.xDelta,
            this.yDelta);
    }

    getSpeed() {
        return this.speed;
    }

    getObstaclesCleared() {
        return this.obstaclesCleared;
    }

    incrementObstaclesCleared() {
        this.obstaclesCleared = this.obstaclesCleared + 1;
    }

    update(player) {
        const input = player.getInput();
        this.yPosition = input[MOUSE_Y];
        player.update(this.getObstaclesCleared());
    }

    getX() {
        return this.xPosition;
    }

    getY() {
        return this.yPosition;
    }

    getWidth() {
        return this.xDelta;
    }

    getHeight() {
        return this.yDelta;
    }
}

export default HummingBird;
