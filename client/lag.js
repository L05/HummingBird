import p5 from 'p5';
import 'p5/lib/addons/p5.sound';

class Lag {
  constructor() {
    this.lagLevel  = 0;
    this.firstTime = true;
  }

  level(in_, attack_, decay_) {
    if (this.firstTime) {
      this.lagLevel  = in_;
      this.firstTime = false;
    }

    let dl = 0;

    if (this.lagLevel < in_) {
      dl = in_ - this.lagLevel;
      this.lagLevel += dl * map(attack_, 0, 1, 1, 0.001);
    } else {
      dl = in_ - this.lagLevel;
      this.lagLevel += dl * map(decay_, 0, 1, 1, 0.001);
    }

    return lagLevel;
  }
}

export default Lag;
