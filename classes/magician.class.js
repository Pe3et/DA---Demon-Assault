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
    jumpYFactor = 5;
    jumpMaxHeight = 120
    jumpspeedFactor = 1.2;
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
        this.speed = this.speed * this.jumpspeedFactor;
        let goingUpwards = true;
        let jumpTime = setInterval(() => {
            goingUpwards == true ? (this.y -= this.jumpYFactor) : (this.y += this.jumpYFactor);
            if (this.y <= this.startPositionY - this.jumpMaxHeight) goingUpwards = false;
            if (this.y == this.startPositionY) {
                clearInterval(jumpTime);
                this.speed = this.speed / this.jumpspeedFactor;
                keyboard.keyblock = false;
            }
        }, 1000 / 60)
    }

    sleep() {

    }
}