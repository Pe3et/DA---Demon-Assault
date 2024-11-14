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
    idleTimeAtGround = 1000
    idleSprite = new SpriteSheet('assets/sprites/demon_boss/idle.png', 4)
    flyingSprite = new SpriteSheet('assets/sprites/demon_boss/flying.png', 4)
    hurtSprite = new SpriteSheet('assets/sprites/demon_boss/hurt.png', 4)
    attackSprite = new SpriteSheet('assets/sprites/demon_boss/attack.png', 8, false)
    deathSprite = new SpriteSheet('assets/sprites/demon_boss/attack.png', 7)
    attackTimer = 0

    /** Initializes the demon boss, starting its animation and flight pattern. */
    constructor() {
        super();
        this.animate(this.flyingSprite, 100);
        this.flyAround();
    }

    /** Flies the demon boss around the screen, changing direction at the visible sides. */
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

    /** Enters the demon boss's idle state, stopping movement and animating the idle sprite. */
    idle() {
        this.stopMoving();
        this.animate(this.idleSprite, 100);
        if (this.y == this.groundY) setTimeout(() => this.flyUp(), this.idleTimeAtGround)
    }

    /** Initiates the demon boss's attack animation and summons or shoots flames based on its direction. */
    attack() {
        this.animate(this.attackSprite, 100);
        this.direction == 'right' ? this.summonFlame() : this.shootFireball();
    }

    summonFlame() {
        const flamesAmount = 5;
        for (let i = 0; i < flamesAmount; i++) {
            const flame = new Flame();
            world.flames.push(flame)
        }
        setTimeout(() => this.flyUp(),1000)
    }

    shootFireball() {
        world.fireball = new Fireball();
        setTimeout(() => this.flyUp(),1000)
    }

    /** Moves the demon boss upwards until it reaches the flight altitude. */
    flyUp() {
        if (this.currentSprite != this.idleSprite) this.idle();
        this.y--;
        if (this.y > this.flightY) {
            requestAnimationFrame(() => this.flyUp())
        } else if (this.y == this.flightY) {
            this.flyAround();
        } else if (this.y < this.flightY) {
            this.y++;
            requestAnimationFrame(() => this.flyUp())
        }
    }

    /** Moves the demon boss downwards until it reaches the ground. */
    flyDown() {
        if (this.isMoving) this.idle();
        this.y++;
        if (this.y != this.groundY) {
            requestAnimationFrame(() => this.flyDown())
        } else {
            Math.random() < 0.5 ? this.idle() : this.attack()
        }
    }

    /** Returns the hitbox of the demon boss. */
    getHitbox() {
        return new Hitbox(this.x, this.y, this.width, this.height)
    }

    gotHit() {
        this.hp -= 10;
        this.hp <= 0 && this.dies();
    }

    dies() {

    }
}