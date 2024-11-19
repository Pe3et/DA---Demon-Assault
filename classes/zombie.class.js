class Zombie extends MovableObject {
    width = 128;
    height = 128;
    y = 132;
    speed = 2 + Math.random() * 2;
    runningThreshhold = 2.25;
    sWidth = 96;
    direction = 'left';
    isMoving = true;
    isAttacking = false;
    attackRange = 32;
    attackDamage = 20;
    isDead = false;
    zombieType;
    currentSprite = this.walkSprite;

    /** Initializes a new zombie object with a random type and sets its sprite sheets. */
    constructor(x) {
        super(x);
        this.zombieType = Math.random() < 0.5 ? 'Zombie Man' : 'Zombie Woman';
        this.setSpriteSheets();
        this.move();
    }

    /** Initializes the zombie's sprite sheets for walking, running, attacking, and dying. */
    setSpriteSheets() {
        const walkFrames = this.zombieType == 'Zombie Man' ? 8 : 7;
        const walkWidth = this.zombieType == 'Zombie Man' ? 768 : 672;
        const atkFrames = this.zombieType == 'Zombie Man' ? [5, 4, 5] : [4, 4, 4];
        const atkWidth = this.zombieType == 'Zombie Man' ? [480, 384, 480] : [384, 384, 384];
        this.walkSprite = new SpriteSheet(`assets/sprites/zombies/${this.zombieType}/Walk.png`, walkFrames, walkWidth);
        this.runSprite = new SpriteSheet(`assets/sprites/zombies/${this.zombieType}/Run.png`, 7, 672);
        this.deadSprite = new SpriteSheet(`assets/sprites/zombies/${this.zombieType}/Dead.png`, 5, 480, false, false);
        this.attackSprites = [
            new SpriteSheet(`assets/sprites/zombies/${this.zombieType}/Attack_1.png`, atkFrames[0], atkWidth[0], false, true),
            new SpriteSheet(`assets/sprites/zombies/${this.zombieType}/Attack_2.png`, atkFrames[1], atkWidth[2], false, true),
            new SpriteSheet(`assets/sprites/zombies/${this.zombieType}/Attack_3.png`, atkFrames[2], atkWidth[3], false, true)
        ]
    }

    /** Zombie starts walking/running in the direction it has. */
    move() {
        this.speed > this.runningThreshhold ? this.run() : this.walk();
        this.direction == 'left' ? this.moveLeft() : this.moveRight();
    }

    /** Animates the zombie's walking sprite. */
    walk() {
        this.animate(this.walkSprite, 100);
    }

    /** Animates the zombie's running sprite. */
    run() {
        this.animate(this.runSprite, 150);
    }

    /** Moves the zombie towards the player, changing direction if necessary. */
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

    /** Initiates the zombie's attack animation and checks for collision with the magician. */
    attack() {
        if (this.isAttacking == false && this.isDead == false) {
            const attackSprite = this.getRandomAttackSprite();
            const timeBetweenFrames = 200;
            this.isAttacking = true;
            this.stopMoving();
            this.animate(attackSprite, timeBetweenFrames);
            world.audioZombieAttacks.playRandomSound();
            setTimeout(() => this.hitCheck(), attackSprite.totalFrames * timeBetweenFrames / 2);
            setTimeout(() => {
                this.isAttacking = false;
                this.isDead == false && this.move();
            }, attackSprite.totalFrames * timeBetweenFrames)
        }
    }

    /** Checks if the zombie's attack hits the magician. */
    hitCheck() {
        const zH = this.getHitbox();
        const mH = world.magician.getHitbox();
        const magicianMidX = mH.leftLine.x1 + (mH.width / 2);
        const attackLeftX = this.direction == 'left' ? zH.leftLine.x1 - this.attackRange : zH.rightLine.x1;
        const attackRightX = this.direction == 'left' ? zH.leftLine.x1 : zH.rightLine.x1 + this.attackRange;
        if (magicianMidX < attackRightX && magicianMidX > attackLeftX && mH.bottomLine.y1 > zH.topLine.y1) {
            world.magician.updateHealth(-this.attackDamage);
        }
    }

    /** Returns a random attack sprite from the zombie's attack sprite array. */
    getRandomAttackSprite() {
        const attackSprite = this.attackSprites[Math.floor(Math.random() * this.attackSprites.length)];
        return attackSprite
    }

    /** Kills the zombie, stopping its movement and playing the death animation. */
    die() {
        if (this.isDead == false) {
            this.stopMoving();
            this.animate(this.deadSprite, 100);
            this.playRandomDeathSound();
            this.isDead = true;
            setTimeout(() => this.dropItem(), 1000);
        }
    }

    /** Plays a random death sound effect for the zombie. For perfamce reasons the sounds are in the world class */
    playRandomDeathSound() {
        const randomIndex = Math.floor(Math.random() * world.audioZombieDeaths.length);
        world.audioZombieDeaths[randomIndex].volume = 0.2;
        if(world.audioZombieDeaths[randomIndex].paused) world.audioZombieDeaths[randomIndex].play();
    }

    /** Drops an item at the zombie's position after it dies. */
    dropItem() {
        const zH = this.getHitbox();
        const dropX = zH.bottomLine.x1 - zH.width / 4;
        const droppedItem = new Dropable(dropX)
    }

    /** Returns the zombie's hitbox, a rectangle representing its hittable area. */
    getHitbox() {
        return new Hitbox(this.x + this.width / 3, this.y + this.height / 4, this.width / 4, this.height / 2)
    }
}