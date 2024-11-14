class Magician extends MovableObject {
    width = 128;
    height = 128;
    startPositionX = 120;
    startPositionY = 100;
    x = this.startPositionX;
    y = this.startPositionY;
    sWidth = 128;
    speed = 5;
    direction = 'right';
    goingDownwards = false;
    jumpYFactor = 5;
    jumpMaxHeight = 120;
    isJumping = false;
    health = 100;
    mana = 0;
    progress = 0;
    jumpInterval;
    isChargingAttack = false;
    attackChargeTimeout;
    idleSprite = new SpriteSheet('assets/sprites/wanderer_magician/Idle.png', 8);
    runSprite = new SpriteSheet('assets/sprites/wanderer_magician/Run.png', 8);
    jumpSprite = new SpriteSheet('assets/sprites/wanderer_magician/Jump_short.png', 5, false, false);
    deadSprite = new SpriteSheet('assets/sprites/wanderer_magician/Dead.png', 4, false, false);
    hurtSprite = new SpriteSheet('assets/sprites/wanderer_magician/Hurt.png', 4, false, false);
    attackSprite = new SpriteSheet('assets/sprites/wanderer_magician/Attack_2.png', 9, false, true);
    currentSprite = this.idleSprite;

    /** Initializes a new instance of the Magician class. Loads the idle sprite and sets the magician to an idle state. */
    constructor() {
        super().loadSprite(this.idleSprite);
        this.idle();
        // this.godmode();
    }

    /** Puts the magician in an idle state, stopping any movement and animating the idle sprite. */
    idle() {
        this.stopMoving();
        this.animate(this.idleSprite, 200);
    }

    /** Makes the magician run in the specified direction. */
    run(direction) {
        this.animate(this.runSprite, 100);
        if (direction == 'right') this.moveRight(true);
        if (direction == 'left') this.moveLeft(true);
        this.direction = direction;
    }

    /** Initiates the magician's jump action, animating the jump sprite and updating the jump state. */
    jump() {
        const timeBetweenFrames = 157;
        if (this.animationBlocker == false && this.isJumping == false) {
            this.animate(this.jumpSprite, timeBetweenFrames);
            this.isJumping = true;
            this.jumpAnimation();
        }
    }

    /** Animates the magician's jump action, updating the position and state. */
    jumpAnimation() {
        if (this.goingDownwards == false) this.y -= this.jumpYFactor;
        if (this.y <= this.startPositionY - this.jumpMaxHeight) {
            this.fallToGround();
        } else {
            requestAnimationFrame(() => this.jumpAnimation());
        }
    }

    /** Initiates the magician's falling action, setting the downwards direction and starting the fall animation. */
    fallToGround() {
        this.goingDownwards = true;
        this.fallAnimation();
    }

    /** Animates the magician's falling action, updating the position and state. */
    fallAnimation() {
        if (this.y == this.startPositionY) {
            this.goingDownwards = false;
            this.animationBlocker = false;
            this.isJumping = false;
            this.idle();
            keyboard.keyAction();
        } else {
            this.y += this.jumpYFactor;
            requestAnimationFrame(() => this.fallAnimation());
        }
    }

    /** Initiates the magician's attack action, animating the attack sprite and casting lightning after a delay. */
    attack() {
        if (!this.isJumping && this.mana >= 20) {
            const castDelay = 700;
            const castFrame = 7;
            this.isChargingAttack = true;
            this.stopMoving();
            this.animate(this.attackSprite, castDelay / castFrame);
            this.attackChargeTimeout = setTimeout(() => {
                this.isChargingAttack && this.castLightning()
            }, castDelay);
        }
    }

    /** Casts a lightning bolt, reducing the magician's mana by 20. */
    castLightning() {
        this.updateMana(-20);
        const lightning = new Lightning(this.x, this.direction);
        world.lightnings.push(lightning);
        setTimeout(()=> {
            this.currentSprite == this.attackSprite && this.resetAnimation()
        }, 200); 
    }

    /** Resets the magician's attack charge state and clears the attack timeout. */
    resetAttackCharge() {
        this.isChargingAttack = false;
        clearTimeout(this.attackChargeTimeout);
    }

    sleep() {
        //TODO:
    }

    dies() {
        this.stopMoving();
        this.animate(this.deadSprite, 300);
        keyboard.keyboardBlock = true;
    }

    /** Returns the hitbox of the Magician, a rectangle representing the area that can collide with other objects. */
    getHitbox() {
        return new Hitbox(this.x + this.width / 3, this.y + this.height / 2, this.width / 4, this.height / 2)
    }

    /** Updates the magician's health by the specified percentage, handling death and hurt states. */
    updateHealth(percent, disableRepeatedHurt = false) {
        this.health += percent;
        if (this.health > 100) this.health = 100;
        if (this.health <= 0) this.dies();
        if (this.health > 0 && percent < 0 && !disableRepeatedHurt) this.hurt();
        updateStatusBar('healthBar', this.health)
    }

    /** Handles the magician's hurt state, stopping movement, resetting attack charge, and animating the hurt sprite. */
    hurt() {
        this.stopMoving();
        this.resetAttackCharge();
        keyboard.keyboardBlock = true;
        this.animate(this.hurtSprite, 50);
        setTimeout(() => {
            this.animationBlocker = false;
            keyboard.keyboardBlock = false;
            keyboard.keyAction();
        }, 500)
    }

    /** Updates the magician's mana by the specified percentage, capping at 100. */
    updateMana(percent) {
        this.mana += percent;
        if (this.mana > 100) this.mana = 100;
        updateStatusBar('manaBar', this.mana)
    }

    /** Updates the magician's progress by the specified percentage. */
    gainProgress(percent) {
        this.progress += percent;
        updateStatusBar('progressBar', this.progress)
    }

    godmode() {
        this.health = 50;
        this.mana = 50;
        updateStatusBar('healthBar', this.health);
        updateStatusBar('manaBar', this.mana);
        requestAnimationFrame(() => this.godmode())
    }
}