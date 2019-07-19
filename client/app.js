import Sketch from './sketch'

const sketch = new Sketch();
window.setup = () => sketch.setup();
window.draw = () => sketch.draw();
window.update = () => sketch.update();
window.windowResized = () => sketch.windowResized();