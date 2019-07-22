import p5 from 'p5';

import 'p5/lib/addons/p5.sound';
import {
    COLOR_BLUE_VALUE,
    COLOR_WHITE_VALUE, GAME_FPS, OBSTACLE_COLLISION_DETECT_FPS,
    OBSTACLE_GAP_SIZE,
    OBSTACLE_WIDTH
} from './constants';

class Obstacle {

    // Constructors
    constructor(viewportWidth, viewportHeight) {
        this.viewport = {x: viewportWidth, y: viewportHeight};
        this.xPosition = viewportWidth;
        this.gapSize = OBSTACLE_GAP_SIZE * viewportHeight;
        this.gapPosition = random(0, viewportHeight - this.gapSize);

        this.xDelta = OBSTACLE_WIDTH * viewportWidth;
        this.onScreen = true;
        this.cleared = false;

        this.fillColor = color(COLOR_BLUE_VALUE);
        this.strokeColor = color(COLOR_WHITE_VALUE);

        this.frameNum = 0;
        this.frameEval = parseInt(GAME_FPS / OBSTACLE_COLLISION_DETECT_FPS);
    }

    isOnScreen() {
        return this.onScreen;
    }

    getX() {
        return this.xPosition;
    }

    draw() {
        stroke(this.strokeColor);
        fill(this.fillColor);

        rect(this.xPosition, this.gapPosition, this.xDelta, -this.gapPosition);
        rect(this.xPosition, this.gapPosition + this.gapSize, this.xDelta, this.viewport.y - (this.gapPosition + this.gapSize));
    }

    update(birdSpeed) {
        this.xPosition = this.xPosition - birdSpeed;

        if (this.xPosition + this.xDelta < 0) {
            this.onScreen = false;
        }
    }

    check(bird) {
        if (this.cleared) {
            return;
        }

        this.frameNum++;

        if (this.frameNum === this.frameEval) {
            this.checkColliding(bird);
            this.checkCleared(bird);

            this.frameNum = 0;
        }
    }

    checkColliding(bird) {
        const birdX = bird.getX();
        const birdY = bird.getY();
        const birdW = bird.getWidth();
        const birdH = bird.getHeight();

        const isFrontColliding = (birdX + birdW >= this.xPosition && birdX + birdW <= this.xPosition + this.xDelta)
            && ((birdY <= this.gapPosition)
                || (birdY + birdH >= (this.gapPosition + this.gapSize)));
        const isTopColliding = birdY <= this.gapPosition
            && ((birdX > this.xPosition && birdX < this.xPosition + this.xDelta)
                || (birdX + birdW > this.xPosition && birdX + birdW < this.xPosition + this.xDelta));
        const isBottomColliding = birdY + birdH >= (this.gapPosition + this.gapSize)
            && ((birdX > this.xPosition && birdX < this.xPosition + this.xDelta)
                || (birdX + birdW > this.xPosition && birdX + birdW < this.xPosition + this.xDelta));

        if (isFrontColliding || isTopColliding || isBottomColliding) {
            bird.setAlive(false);
        }
    }

    checkCleared(bird) {
        const birdX = bird.getX();

        if (birdX > this.xPosition + this.xDelta) {
            this.cleared = true;
            bird.incrementObstaclesCleared();
        }
    }
}

export default Obstacle;
