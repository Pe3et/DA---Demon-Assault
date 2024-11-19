class SpriteSheet {
    spriteWidth;
    frameWidth;
    src;
    totalFrames;
    x = 0;
    y = 0;
    isLoop;
    isInterruptable;
    img = new Image();

    /** Initializes a new instance of the SpriteSheet class. */
    constructor(src, totalFrames, spriteWidth, isLoop = true, isInterruptable = true) {
        this.src = src;
        this.img.src = src;
        this.spriteWidth = spriteWidth;
        this.totalFrames = totalFrames;
        this.frameWidth = spriteWidth / totalFrames;
        this.isLoop = isLoop;
        this.isInterruptable = isInterruptable;
    }

    /** Returns the x-coordinate of the next frame in the sprite sheet. */
    nextFrame() {
        this.x += this.frameWidth;
        if (this.x >= this.spriteWidth) {
            this.x = 0;
        }
    }

    /** Resets the sprite sheet to its initial state. */
    reset() {
        this.x = 0;
    }
}