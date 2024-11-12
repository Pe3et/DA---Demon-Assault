class Zombie extends MovableObject {
    width = 128;
    height = 128;
    y = 132;
    speed = 2 + Math.random()*2;
    runningThreshhold = 2.25;
    sWidth = 96;
    direction = 'left';
    isMoving = true;
    isAttacking = false;
    attackRange = 32;
    attackDamage = 20;
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
        this.animate(this.walkSprite, 100);
    }

    run() {
        this.animate(this.runSprite, 150);
    }

    moveTowardsPlayer() {
        if (this.isAttacking == false && this.isDead == false) {
            const zH = this.getHitbox();
            const mH = world.magician.getHitbox();
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
            const attackSprite = this.getRandomAttackSprite();
            const timeBetweenFrames = 100;
            this.isAttacking = true;
            this.stopMoving();
            this.animate(attackSprite, timeBetweenFrames);
            setTimeout(() => this.hitCheck(), this.biteSprite.totalFrames * timeBetweenFrames / 2);
            setTimeout(() => {
                this.isAttacking = false;
                this.isDead == false && this.move();
            }, this.biteSprite.totalFrames * timeBetweenFrames)
        }
    }

    hitCheck() {
        const zH = this.getHitbox();
        const mH = world.magician.getHitbox();
        const magicianMidX = mH.leftLine.x1 + (mH.width / 2);
        const attackLeftX = this.direction == 'left' ? zH.leftLine.x1 - this.attackRange : zH.rightLine.x1;
        const attackRightX = this.direction == 'left' ? zH.leftLine.x1 : zH.rightLine.x1 + this.attackRange;
        if (magicianMidX < attackRightX && magicianMidX > attackLeftX && mH.bottomLine.y1 > zH.topLine.y1) {
            world.magician.takeDamage(this.attackDamage);
        } 
    }

    getRandomAttackSprite() {
        const attackSprite = this.attackSprites[Math.floor(Math.random() * this.attackSprites.length)];
        return attackSprite
    }

    die() {
        if (this.isDead == false) {
            this.stopMoving();
            this.animate(this.deadSprite, 100);
            this.isDead = true;
            setTimeout(() => this.dropItem(), 1000);
        }
    }

    dropItem() {
        const zH = this.getHitbox();
        const dropX = zH.bottomLine.x1 - zH.width / 4;
        const droppedItem = new Dropable(dropX)
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