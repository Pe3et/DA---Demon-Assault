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
    flickerImgs = []
    outburstImgs = []

    /** Initializes the flame object with a random x position and preloads images. */
    constructor() {
        this.x = world.boss.x + world.boss.width / 2 + Math.random() * canvas.width;
        this.preloadImages();
        this.flicker();
    }

    /** Preloads the flicker and outburst images for the flame animation. */
    preloadImages() {
        for (let i = 0; i < this.flickerFrames; i++) {
            const img = new Image();
            img.src = `assets/sprites/flame/flame_${i % 2 + 1}.png`;
            this.flickerImgs.push(img);
        }
        for (let i = 0; i < this.outburstImgAmount; i++) {
            const img = new Image();
            img.src = `assets/sprites/flame/flame_${i + 1}.png`;
            this.outburstImgs.push(img);
        }
    }

    /** Animates the flame's flicker effect before triggering an outburst. */
    flicker() {
        for (let i = 0; i < this.flickerFrames; i++) {
            setTimeout(() => {
                this.img = this.flickerImgs[i % 2];
            }, this.flameSpeed * i);
        }
        setTimeout(() => {
            this.outburst();
        }, this.flameSpeed * this.flickerFrames);
    }

    /** Triggers the flame's outburst animation and eventually extinguishes all flames. */
    outburst() {
        this.isBursting = true;
        for (let i = 0; i < this.outburstImgAmount; i++) {
            setTimeout(() => {
                this.img = this.outburstImgs[i];
            }, this.flameSpeed * i);
        }
        setTimeout(() => {
            this.extinguishAllFlames();
        }, this.flameSpeed * this.outburstImgAmount);
    }

    /** Extinguishes all flames in the world. */
    extinguishAllFlames() {
        world.flames = [];
    }

    /** Returns the flame's hitbox for collision detection. */
    getHitbox() {
        return new Hitbox(this.x + this.width / 4, this.y + this.y / 8, this.width / 2, this.height / 2)
    }
}