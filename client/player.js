import p5 from 'p5';

import 'p5/lib/addons/p5.sound';
import KeyboardInput from "./keyboardInput";
import MouseInput from "./mouseInput";
import {
    GAME_OVER_TEXT_SIZE,
    PAUSED_TEXT_SIZE,
    COLOR_WHITE_VALUE,
    RESET_TEXT_HEIGHT,
    RESET_TEXT_WIDTH,
    RESET_TEXT_X_POS,
    RESET_TEXT_Y_POS,
    SCORE_TEXT_HEIGHT,
    SCORE_TEXT_WIDTH,
    SCORE_TEXT_X_POS,
    SCORE_TEXT_Y_POS
} from "./constants";
import {GAME_OVER, PAUSED} from "./game";
import Game from "./game";

class Player {
    constructor() {
        this.score = 0;
        this.hiScore = 0;

        // this.keyboardInput = new KeyboardInput();
        this.mouseInput = new MouseInput();
    }

    update(score) {
        this.score = score;
        this.hiScore = Math.max(this.hiScore, this.score);
    }

    getInput() {
        return {
            // ...this.keyboardInput.getKeys(),
            ...this.mouseInput.getMousePosition()
        }
    }

    draw(gameState) {
        const width = Game.getWindowWidth();
        const height = Game.getWindowHeight();

        if (gameState === PAUSED) {
            fill(COLOR_WHITE_VALUE);
            textSize(PAUSED_TEXT_SIZE);
            textAlign(CENTER, CENTER);
            text('Paused', 0, 0, width, height);
        }

        if (gameState === GAME_OVER) {
            fill(COLOR_WHITE_VALUE);
            textSize(GAME_OVER_TEXT_SIZE);
            textAlign(CENTER, CENTER);
            text('Game Over!', 0, 0, width, height);
        }

        fill(COLOR_WHITE_VALUE);
        textSize(16);
        textAlign(LEFT, TOP);
        text(`Score: ${this.score}\nHi-Score: ${this.hiScore}`, SCORE_TEXT_X_POS, SCORE_TEXT_Y_POS, SCORE_TEXT_WIDTH, SCORE_TEXT_HEIGHT);

        fill(COLOR_WHITE_VALUE);
        textSize(16);
        textAlign(LEFT, TOP);
        text('Reset: [CTRL + R]\nPause: [SPACE]', width + RESET_TEXT_X_POS, RESET_TEXT_Y_POS, RESET_TEXT_WIDTH, RESET_TEXT_HEIGHT);
    }
}

export default Player;
