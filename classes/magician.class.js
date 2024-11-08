class Magician extends MovableObject {
    width = 128;
    height = 128;
    startPositionX = 120;
    startPositionY = 100;
    x = this.startPositionX;
    y = this.startPositionY;
    sWidth = 128;
    world;
    speed = 5;
    direction = 'right';
    goingDownwards = false;
    jumpYFactor = 5;
    jumpMaxHeight = 120
    idleSprite = new SpriteSheet('assets/sprites/wanderer_magician/Idle.png', 896, 128);
    runSprite = new SpriteSheet('assets/sprites/wanderer_magician/Run.png', 896, 128);
    jumpSprite = new SpriteSheet('assets/sprites/wanderer_magician/Jump.png', 1024, 128);

    constructor() {
        super().loadImage('assets/sprites/wanderer_magician/Idle.png');
        this.idle();
    }

    idle() {
        this.stopMoving();
        this.animate(this.idleSprite);
    }

    run(direction) {
        this.animate(this.runSprite);
        if (direction == 'right') this.moveRight(true);
        if (direction == 'left') this.moveLeft(true);
        this.direction = direction;
    }

    jump() {
        this.animate(this.jumpSprite, 752 / 8, false, 752);
        // let goingDownwards = false;
        let jumpTime = setInterval(() => {
            this.goingDownwards == false ? (this.y -= this.jumpYFactor) : (this.y += this.jumpYFactor);
            if (this.y <= this.startPositionY - this.jumpMaxHeight) this.goingDownwards = true;
            if (this.y == this.startPositionY) {
                clearInterval(jumpTime);
                keyboard.keyblock = false;
                this.goingDownwards = false;
            }
        }, 1000 / 60)
    }

    sleep() {

    }

    /**
     * Returns the hitbox of the Magician object.
     * 
     * The hitbox is a rectangle that represents the area of the object that can collide with other objects.
     * 
     * @returns {Hitbox} A new Hitbox object representing the hitbox of the Magician.
     */
    getHitbox() {
        return new Hitbox(this.x + this.width / 3, this.y + this.height / 2, this.width / 4, this.height / 2)
    }
}