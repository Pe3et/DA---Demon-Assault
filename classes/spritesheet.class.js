class SpriteSheet {
    src;
    spriteWidth;
    frameWidth;
    totalFrames;
    x = 0;
    y = 0;
    isLoop;
    isInterruptable;

    constructor(src, spriteWidth, frameWidth, isLoop = true, isInterruptable = true) {
        this.src = src;
        this.spriteWidth = spriteWidth;
        this.frameWidth = frameWidth;
        this.totalFrames = this.spriteWidth / this.frameWidth;
        this.isLoop = isLoop;
        this.isInterruptable = isInterruptable;
    }

    getNextFrameX() {
        this.x += this.frameWidth;
        if (this.x >= this.spriteWidth) {
            this.x = 0;
        }
        return this.x
    }

    reset() {
        this.x = 0;
    }
}