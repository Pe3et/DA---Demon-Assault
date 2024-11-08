class Keyboard {
    UP = false
    RIGHT = false
    DOWN = false
    LEFT = false
    SPACE = false
    keyblock = false
    keyboardBlock = false

    keyPressed(key) {
        if (!this[key] && !this.keyboardBlock) {
            this[key] = true;
            this.keyAction();
        }
    }

    keyReleased(key) {
        this[key] = false;
        world.magician.idle();
        this.keyAction();
    }

    keyAction() {
        if(this.RIGHT) world.magician.run('right');
        if(this.LEFT) world.magician.run('left');
        if(this.UP && this.keyblock == false) {
            this.keyblock = true;
            world.magician.jump();
        }
    }
}