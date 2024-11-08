class SpriteSheet {
    src;
    spriteWidth;
    frameWidth;
    totalFrames;
    x = 0;
    y = 0;
    isLoopSprite;

    constructor(src, spriteWidth, frameWidth, isLoopSprite = true) {
        this.src = src;
        this.spriteWidth = spriteWidth;
        this.frameWidth = frameWidth;
        this.totalFrames = this.spriteWidth / this.frameWidth;
        this.isLoopSprite = isLoopSprite;
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