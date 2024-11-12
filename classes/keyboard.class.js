class Keyboard {
    UP = false
    RIGHT = false
    DOWN = false
    LEFT = false
    SPACE = false
    keyboardBlock = false

    keyPressed(key) {
        if (!this[key] && !this.keyboardBlock) {
            this[key] = true;
            this.keyAction();
        }
    }

    keyReleased(key) {
        this[key] = false;
        if(!this.SPACE) {
            world.magician.resetAttackCharge();
            world.magician.idle();
        } 
        this.keyAction();
    }

    keyAction() {
        if(this.SPACE && !world.magician.isChargingAttack) world.magician.attack();
        if(!this.SPACE) {
            if(this.RIGHT) world.magician.run('right');
            if(this.LEFT) world.magician.run('left');
            if(this.UP) world.magician.jump();
        }
    }
}