import p5 from 'p5';

export const R_KEY = 'R_KEY';
export const SPACE = 'SPACE';
export const CONTROL = 'CONTROL';

class KeyboardInput {
    constructor() {
        this.currentValueInQueue = {
            [CONTROL]: false,
            [SPACE]: false,
            [R_KEY]: false
        };
        this.keydownHandler = this.keydownHandler.bind(this);
        this.keyupHandler = this.keyupHandler.bind(this);

        document.addEventListener('keydown', this.keydownHandler);
        document.addEventListener('keyup', this.keyupHandler);
    }

    getKeys() {
        return this.currentValueInQueue;
    }

    detach() {
        document.removeEventListener('keydown', this.keydownHandler);
        document.removeEventListener('keyup', this.keyupHandler);
    }

    getKeyMapping(keyCode) {
        switch (keyCode) {
        case 17:
            return CONTROL;
        case 32:
            return SPACE;
        case 82:
            return R_KEY;
        default:
            return;
        }
    }

    keyupHandler(keyboardEvent) {
        const keyUp = this.getKeyMapping(keyboardEvent.keyCode);
        if (keyUp) {
            this.currentValueInQueue = {...this.currentValueInQueue, [keyUp]: false};
        }
    }

    keydownHandler(keyboardEvent) {
        let keyDown = this.getKeyMapping(keyboardEvent.keyCode);
        if (keyDown) {
            this.currentValueInQueue = {...this.currentValueInQueue, [keyDown]: true};
        }
    }
}

export default KeyboardInput;
