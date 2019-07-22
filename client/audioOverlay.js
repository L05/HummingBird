import p5 from 'p5';

class AudioOverlay {
    constructor(player, page) {
        this.player = player;
        this.page = page;
    }

    draw(gameState) {
        this.page.background(200);


        image(this.page, 0, this.page.height - 200, 200, 200);
    }
}

export default AudioOverlay;