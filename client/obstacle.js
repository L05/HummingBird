import p5 from 'p5';

import 'p5/lib/addons/p5.sound';

class Obstacle {

    // Constructors
    constructor(viewportWidth, viewportHeight) {
        this.viewport = {x: viewportWidth, y: viewportHeight};
        this.xPosition = viewportWidth;
        this.gapSize = 100;
        this.gapPosition = random(0, viewportHeight - this.gapSize);

        this.xDelta = 100;
        this.onScreen = true;
        this.cleared = false;

        this.fillColor = color('rgb(0,0,255)');
        this.strokeColor = color(255);
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
    }

    isColliding(bird) {
        if (this.cleared) {
            return false;
        }
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
            return true;
        } else {
            return false;
        }
    }

    isCleared(bird) {
        if (this.cleared) {
            return true;
        }

        const birdX = bird.getX();

        if (birdX > this.xPosition + this.xDelta) {
            this.cleared = true;
            bird.incrementObstaclesCleared();
            return true;
        } else {
            return false;
        }
    }
}

export default Obstacle;
