import Game from './game'

const game = new Game();
window.setup = () => game.setup();
window.draw = () => game.draw();
window.update = () => game.update();
window.windowResized = () => game.windowResized();
window.keyTyped = () => game.keyTyped();