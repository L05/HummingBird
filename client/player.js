import p5 from 'p5';

import 'p5/lib/addons/p5.sound';
import AudioInput from './audioInput';
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

export const MOUSE_X = 'MOUSE_X';
export const MOUSE_Y = 'MOUSE_Y';
export const AUDIO_WAVEFORM = 'AUDIO_WAVEFORM';
export const AUDIO_LEVEL = 'AUDIO_LEVEL';
export const AUDIO_FFT = 'AUDIO_FFT';

class Player {
    constructor() {
        this.score = 0;
        this.hiScore = 0;
        this.audio = new AudioInput();
    }

    update(score) {
        this.score = score;
        this.hiScore = Math.max(this.hiScore, this.score);
    }

    getInput() {
        return {
            [MOUSE_X]: window.mouseX,
            [MOUSE_Y]: window.mouseY,
            [AUDIO_WAVEFORM]: this.audio.getWaveform(),
            [AUDIO_LEVEL]: this.audio.getLevel(),
            [AUDIO_FFT]: this.audio.getFFT()
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
        text('Reset: [R]\nPause: [SPACE]', width + RESET_TEXT_X_POS, RESET_TEXT_Y_POS, RESET_TEXT_WIDTH, RESET_TEXT_HEIGHT);
    }
}

export default Player;
