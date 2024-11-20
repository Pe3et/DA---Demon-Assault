class Keyboard {
    UP = false
    RIGHT = false
    LEFT = false
    SPACE = false
    keyboardBlock = false

    /** Handles key press events, updating the corresponding key state and triggering the key action. */
    keyPressed(key) {
        if (!this[key] && !this.keyboardBlock) {
            this[key] = true;
            this.keyAction();
        }
    }

    /** Handles key release events, updating the corresponding key state and triggering the key action. */
    keyReleased(key) {
        this[key] = false;
        if (!this.SPACE) {
            world.magician.resetAttackCharge();
            world.magician.idle();
        }
        this.keyAction();
    }

    /** Handles key press actions, such as movement and attack. */
    keyAction() {
        if (this.SPACE && !world.magician.isChargingAttack) world.magician.attack();
        if (!this.SPACE) {
            if (this.RIGHT) world.magician.run('right');
            if (this.LEFT) world.magician.run('left');
            if (this.UP) world.magician.jump();
        }
    }
}