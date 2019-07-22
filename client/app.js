import Game from './game'

const sketch = new Game();
window.setup = () => sketch.setup();
window.draw = () => sketch.draw();
window.update = () => sketch.update();
window.windowResized = () => sketch.windowResized();