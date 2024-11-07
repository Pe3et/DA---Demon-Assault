class Keyboard {
    UP = false
    RIGHT = false
    DOWN = false
    LEFT = false
    SPACE = false

    keyPressed(key) {
        if (!this[key]) {
            this[key] = true;
            this.keyAction();
        }
    }

    keyReleased(key) {
        this[key] = false;
        world.magician.idle();
    }

    keyAction() {
        if(this.RIGHT) world.magician.walk('right');
        if(this.LEFT) world.magician.walk('left');
        if(this.UP) world.magician.jump();
    }
}