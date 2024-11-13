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
    idleSprite = new SpriteSheet('assets/sprites/wanderer_magician/Idle.png', 896, 128);
    runSprite = new SpriteSheet('assets/sprites/wanderer_magician/Run.png', 896, 128);
    jumpSprite = new SpriteSheet('assets/sprites/wanderer_magician/Jump_short.png', 640, 128, false, false);
    deadSprite = new SpriteSheet('assets/sprites/wanderer_magician/Dead.png', 512, 128, false, false);
    hurtSprite = new SpriteSheet('assets/sprites/wanderer_magician/Hurt.png', 512, 128, false, false);
    attackSprite = new SpriteSheet('assets/sprites/wanderer_magician/Attack_2.png', 1152, 128, false, true);
    currentSprite = this.idleSprite;

    /** Initializes a new instance of the Magician class. Loads the idle sprite and sets the magician to an idle state. */
    constructor() {
        super().loadSprite(this.idleSprite);
        this.idle();
        this.godmode();
    }

    /** Puts the magician in an idle state, stopping any movement and animating the idle sprite. */
    idle() {
        this.stopMoving();
        this.animate(this.idleSprite, 200);
    }

    /**
     * Makes the magician run in the specified direction.
     * @param {string} direction - The direction to run in. Can be either 'right' or 'left'.
     */
    run(direction) {
        this.animate(this.runSprite, 100);
        if (direction == 'right') this.moveRight(true);
        if (direction == 'left') this.moveLeft(true);
        this.direction = direction;
    }

    jump() {
        const timeBetweenFrames = 157;
        if (this.animationBlocker == false && this.isJumping == false) {
            this.animate(this.jumpSprite, timeBetweenFrames);
            this.isJumping = true;
            this.jumpAnimation();
        }
    }

    jumpAnimation() {
        if (this.goingDownwards == false) this.y -= this.jumpYFactor;
        if (this.y <= this.startPositionY - this.jumpMaxHeight) {
            this.fallToGround();
        } else {
            requestAnimationFrame(() => this.jumpAnimation());
        }
    }

    fallToGround() {
        this.goingDownwards = true;
        this.fallAnimation();
    }

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

    attack() {
        if(!this.isJumping && this.mana >= 20) {
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

    castLightning() {
        this.updateMana(-20);
        const lightning = new Lightning(this.x, this.direction);
        world.lightnings.push(lightning);
    }

    resetAttackCharge() {
        this.isChargingAttack = false;
        clearTimeout(this.attackChargeTimeout);
    }

    sleep() {

    }

    dies() {
        this.stopMoving();
        this.animate(this.deadSprite, 300);
        keyboard.keyboardBlock = true;
    }

    /**
     * The hitbox is a rectangle that represents the area of the object that can collide with other objects.
     * @returns {Hitbox} A new Hitbox object representing the hitbox of the Magician.
     */
    getHitbox() {
        return new Hitbox(this.x + this.width / 3, this.y + this.height / 2, this.width / 4, this.height / 2)
    }

    updateHealth(percent) {
        this.health += percent;
        if (this.health > 100) this.health = 100;
        if (this.health <= 0) this.dies();
        if (this.health > 0 && percent > 0) this.hurt();
        updateStatusBar('healthBar', this.health)
    }

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

    updateMana(percent) {
        this.mana += percent;
        if (this.mana > 100) this.mana = 100;
        updateStatusBar('manaBar', this.mana)
    }

    gainProgress(percent) {
        this.progress += percent;
        updateStatusBar('progressBar', this.progress)
    }

    godmode() {
        this.health = 100;
        updateStatusBar('healthBar', this.health)
        requestAnimationFrame(()=>this.godmode())
    }
}