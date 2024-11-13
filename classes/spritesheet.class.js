class SpriteSheet {
    spriteWidth;
    frameWidth;
    src;
    totalFrames;
    x = 0;
    y = 0;
    isLoop;
    isInterruptable;

    /** Initializes a new instance of the SpriteSheet class. */
    constructor(src, totalFrames, isLoop = true, isInterruptable = true) {
        this.src = src;
        this.setSpriteWidths();
        this.totalFrames = totalFrames;
        this.isLoop = isLoop;
        this.isInterruptable = isInterruptable;
    }

    /** Sets the sprite width and frame width based on the sprite sheet image. */
    setSpriteWidths() {
        const img = new Image();
        img.src = this.src;
        img.onload = () => {
            document.body.appendChild(img);
            this.spriteWidth = img.naturalWidth;
            this.frameWidth = this.spriteWidth / this.totalFrames;
            img.remove();
        }
    }

    /** Returns the x-coordinate of the next frame in the sprite sheet. */
    getNextFrameX() {
        this.x += this.frameWidth;
        if (this.x >= this.spriteWidth) {
            this.x = 0;
        }
        return this.x
    }

    /** Resets the sprite sheet to its initial state. */
    reset() {
        this.x = 0;
    }
}