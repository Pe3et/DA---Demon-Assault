class Demonboss extends MovableObject {
    flightY = 90
    groundY = 155
    x = world.level.endPosX
    y = this.flightY
    width = 81
    height = 71
    speed = world.magician.speed
    direction = 'left'
    hp = 100
    idleTimeAtGround = 2000
    idleSprite = new SpriteSheet('assets/sprites/demon_boss/idle.png', 4)
    flyingSprite = new SpriteSheet('assets/sprites/demon_boss/flying.png', 4)
    hurtSprite = new SpriteSheet('assets/sprites/demon_boss/hurt.png', 4)
    attackSprite = new SpriteSheet('assets/sprites/demon_boss/attack.png', 8, false)
    deathSprite = new SpriteSheet('assets/sprites/demon_boss/attack.png', 7)
    attackTimer = 0

    constructor() {
        super();
        this.animate(this.flyingSprite, 100);
        this.flyAround();
    }

    flyAround() {
        if (!this.isMoving) this.direction == 'left' ? this.moveLeft() : this.moveRight();
        if (this.isAtLeftVisibleSide() && this.direction == 'left') {
            this.direction = 'right';
            Math.random() < 0.5 ? this.flyDown() : this.moveRight();
        }
        if (this.isAtRightVisibleSide() && this.direction == 'right') {
            this.direction = 'left';
            Math.random() < 0.5 ? this.flyDown() : this.moveLeft();
        }
        requestAnimationFrame(() => this.isMoving && this.flyAround())
    }

    /** Checks if the demon boss is at the left visible side of the screen. */
    isAtLeftVisibleSide() {
        return (this.x < world.magician.x - world.magician.startPositionX + 10 &&
            this.x <= world.level.endPosX - canvas.width - world.magician.startPositionX) ||
            this.x < 10
    }

    /** Checks if the demon boss is at the right visible side of the screen. */
    isAtRightVisibleSide() {
        return (this.x > world.magician.x + (canvas.width - world.magician.startPositionX - this.width) &&
            !(this.x < canvas.width - this.width)) ||
            this.x >= world.level.endPosX - world.magician.startPositionX - this.width
    }

    getHitbox() {

    }

    gotHit() {
        this.hp -= 10;
        this.hp <= 0 && this.dies();
    }

    dies() {

    }

    idle() {
        this.stopMoving();
        this.animate(this.idleSprite, 100);
        if(this.y == this.groundY) setTimeout(() => this.flyUp(), this.idleTimeAtGround)
    }

    attack() {
        this.animate(this.attackSprite, 100);
        this.direction == 'right' ? this.summonFlame() : this.shootFlame();
    }

    summonFlame() {
        console.log('summon flame');
        this.flyUp()
    }

    shootFlame() {
        console.log('shoot flame');
        this.flyUp()
    }

    flyUp() {
        if(this.currentSprite != this.idleSprite) this.idle();
        this.y--;
        if(this.y > this.flightY) {
            requestAnimationFrame(() => this.flyUp())
        } else {
            this.flyAround();
        }
    }

    flyDown() {
        if(this.isMoving) this.idle();
        this.y++;
        if(this.y != this.groundY) {
            requestAnimationFrame(() => this.flyDown()) 
        } else {
            Math.random() < 0.5 ? this.idle() : this.attack()
        }
    }
}