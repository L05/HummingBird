import p5 from 'p5';

export const MOUSE_X = 'MOUSE_X';
export const MOUSE_Y = 'MOUSE_Y';

class MouseInput {
    constructor() {
    }

    getMousePosition() {
        return {
            [MOUSE_X]: window.mouseX,
            [MOUSE_Y]: window.mouseY
        };
    }
}

export default MouseInput;
