class Flame {
    x
    y = 155
    width = 45
    height = 90
    img = new Image()
    flameSpeed = 150
    flickerFrames = 12
    outburstImgAmount = 12
    isBursting = false

    /** Initializes the flame object with a random x position and starts the flicker animation. */
    constructor() {
        this.x = world.boss.x + world.boss.width / 2 + Math.random() * canvas.width;
        this.flicker();
    }

    /** Animates the flame's flicker effect before triggering an outburst. */
    flicker() {
        for (let i = 0; i < this.flickerFrames; i++) {
            setTimeout(() => {
                this.img.src = `assets/sprites/flame/flame_${i % 2 + 1}.png`;
            }, this.flameSpeed * i);
        }
        setTimeout(() => {
            this.outburst();
        }, this.flameSpeed * this.flickerFrames);
    }

    /** Triggers an outburst animation, displaying a sequence of flame images before extinguishing all flames. */
    flicker() {
        for (let i = 0; i < this.flickerFrames; i++) {
            setTimeout(() => {
                this.img.src = `assets/sprites/flame/flame_${i % 2 + 1}.png`;
            }, this.flameSpeed * i);
        }
        setTimeout(() => {
            this.outburst();
        }, this.flameSpeed * this.flickerFrames);
    }

    /** Extinguishes all flames in the world. */
    extinguishAllFlames() {
        world.flames = [];
    }

    /** Returns the hitbox of the flame object. */
    getHitbox() {
        return new Hitbox(this.x + this.width / 4, this.y + this.y / 8, this.width / 2, this.height / 2)
    }
}