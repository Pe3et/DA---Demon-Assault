class Zombie extends MovableObject {
    width = 128;
    height = 128;
    y = 132;
    speed = 0.5 + Math.random(0.5);
    runningThreshhold = 0.9;
    sWidth = 96;
    direction = 'left';
    isMoving = true;
    isAttacking = false;
    isDead = false;
    walkSprite = new SpriteSheet('assets/sprites/zombies/Zombie Man/Walk.png', 768, 96);
    runSprite = new SpriteSheet('assets/sprites/zombies/Zombie Man/Run.png', 672, 96);
    deadSprite = new SpriteSheet('assets/sprites/zombies/Zombie Man/Dead.png', 480, 96, false, false);
    biteSprite = new SpriteSheet('assets/sprites/zombies/Zombie Man/Bite.png', 1056, 96, false, true);
    attackSprites = [
        new SpriteSheet('assets/sprites/zombies/Zombie Man/Attack_1.png', 480, 96, false, true),
        new SpriteSheet('assets/sprites/zombies/Zombie Man/Attack_2.png', 384, 96, false, true),
        new SpriteSheet('assets/sprites/zombies/Zombie Man/Attack_3.png', 480, 96, false, true)
    ]
    currentSprite = this.walkSprite;

    constructor(x) {
        super(x);
        this.move();
    }

    /** Zombie starts walking/running in the direction it has. */
    move() {
        this.speed > this.runningThreshhold ? this.run() : this.walk();
        this.direction == 'left' ? this.moveLeft() : this.moveRight();
    }

    walk() {
        this.animate(this.walkSprite, 200);
    }

    run() {
        this.animate(this.runSprite, 150);
    }

    moveTowardsPlayer() {
        if(this.isAttacking == false && this.isDead == false) {

            const zH = this.getHitbox();
            const mH = world.magician.getHitbox();
            // const zombieMidX = this.x + this.width / 2;
            // const magicianMidX = world.magician.x + world.magician.width /2;
            let directionChange = false;
            if (zH.leftLine.x1 > mH.rightLine.x1) {
                if (this.direction == 'right') directionChange = true;
                this.direction = 'left';
            } else if (zH.rightLine.x1 < mH.leftLine.x1) {
                if (this.direction == 'left') directionChange = true;
                this.direction = 'right';
            }
            if (directionChange == true) this.move();
        }
    }

    attack() {
        if (this.isAttacking == false && this.isDead == false) {
            this.isAttacking = true; 
            const attackSprite = this.getRandomAttackSprite();
            const timeBetweenFrames = 100;
            this.stopMoving();
            this.animate(attackSprite, timeBetweenFrames);
            setTimeout(() => {
                this.isAttacking = false
                this.move();
            }, this.biteSprite.totalFrames * timeBetweenFrames)
        }
    }

    getRandomAttackSprite() {
        const attackSprite = this.attackSprites[Math.floor(Math.random()*this.attackSprites.length)];
        return attackSprite
    }

    die() {
        this.stopMoving();
        this.animate(this.deadSprite, 100);
        this.isDead = true;
    }

    /**
     * Returns the hitbox of the zombie.
     * 
     * The hitbox is a rectangle that represents the area of the zombie that can be hit by attacks.
     * It is calculated based on the zombie's position and size.
     * 
     * @returns {Hitbox} The hitbox of the zombie.
     */
    getHitbox() {
        return new Hitbox(this.x + this.width / 3, this.y + this.height / 4, this.width / 4, this.height / 2)
    }
}