import p5 from 'p5';

import 'p5/lib/addons/p5.sound';
import KeyboardInput from "./keyboardInput";
import MouseInput from "./mouseInput";

class Player {
    constructor() {
        this.keyboardInput = new KeyboardInput();
        this.mouseInput = new MouseInput();
    }

    getInput() {
        return {
            ...this.keyboardInput.getKeys(),
            ...this.mouseInput.getMousePosition()
        }
    }
}

export default Player;
