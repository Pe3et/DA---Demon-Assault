class Zombie extends MovableObject {
    width = 128;
    height = 128;
    y = 132;
    speed = 0.5 + Math.random(0.5);
    runningThreshhold = 0.9;
    sWidth = 96;
    walkSprite = new SpriteSheet('assets/sprites/zombies/Zombie Man/Walk.png', 768, 96);
    runSprite = new SpriteSheet('assets/sprites/zombies/Zombie Man/Run.png', 672, 96);
    deadSprite = new SpriteSheet('assets/sprites/zombies/Zombie Man/Dead.png', 480, 96, false);
    currentSprite;

    constructor(x) {
        super(x);
        this.speed > this.runningThreshhold ? this.run() : this.walk();
    }

    walk() {
        this.animate(this.walkSprite);
        this.moveLeft();
    }

    run() {
        this.animate(this.runSprite);
        this.moveLeft();
    }

    dies() {
        this.stopMoving();
        this.playDeathAnimation(this.deadSprite, 100);
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