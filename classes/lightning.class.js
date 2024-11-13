class Lightning extends MovableObject {
    lightningSprite = new SpriteSheet('assets/sprites/wanderer_magician/Charge_2.png', 6, false)
    x
    y = 120
    width = 200
    height = 128
    speed = 10
    direction

    /** Initializes a new Lightning object with the specified x position and direction. */
    constructor(x, direction) {
        super();
        this.x = x;
        this.direction = direction;
        this.animate(this.lightningSprite, 50)
        this.travel();
    }

    /** Updates the lightning object's position based on its direction and speed. */
    travel() {
        if (this.direction == 'right') {
            this.x += this.speed;
        } else if (this.direction == 'left') {
            this.x -= this.speed;
        };
        requestAnimationFrame(() => this.travel())
    }

    /** Returns the hitbox of the lightning object. */
    getHitbox() {
        return new Hitbox(this.x + this.width / 3, this.y + this.height / 2 - 4, this.width / 2 - 10, this.height / 16)
    }
}