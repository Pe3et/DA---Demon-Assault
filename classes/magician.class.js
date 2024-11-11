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
    health = 100;
    idleSprite = new SpriteSheet('assets/sprites/wanderer_magician/Idle.png', 896, 128);
    runSprite = new SpriteSheet('assets/sprites/wanderer_magician/Run.png', 896, 128);
    jumpSprite = new SpriteSheet('assets/sprites/wanderer_magician/Jump_short.png', 640, 128, false, false);
    deadSprite = new SpriteSheet('assets/sprites/wanderer_magician/Dead.png', 512, 128, false, false);
    currentSprite = this.idleSprite;

    /** Initializes a new instance of the Magician class. Loads the idle sprite and sets the magician to an idle state. */
    constructor() {
        super().loadSprite(this.idleSprite);
        this.idle();
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

    /** The magician jumps. With a jumpYFactor of 5, the duration of the magician being "in the air" is 783.333ms */
    jump() {
        const timeBetweenFrames = 157;
        if (this.animationBlocker == false) {
            this.animate(this.jumpSprite, timeBetweenFrames);
            let jumpTime = setInterval(() => {
                this.goingDownwards == false ? (this.y -= this.jumpYFactor) : (this.y += this.jumpYFactor);
                if (this.y <= this.startPositionY - this.jumpMaxHeight) this.goingDownwards = true;
                if (this.y == this.startPositionY) {
                    clearInterval(jumpTime);
                    this.goingDownwards = false;
                    this.animationBlocker = false;
                    this.idle();
                    keyboard.keyAction();
                }
            }, 1000 / 60)
        }
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

    getsDamage(dmgPercent) {
        this.health -= dmgPercent;
        if (this.health <= 0) this.dies();
        updateStatusBar('healthBar', this.health)
    }
}