class SpriteSheet {
    spriteWidth;
    frameWidth;
    src;
    totalFrames;
    x = 0;
    y = 0;
    isLoop;
    isInterruptable;

    constructor(src, totalFrames, isLoop = true, isInterruptable = true) {
        this.src = src;
        this.setSpriteWidths();
        this.totalFrames = totalFrames;
        this.isLoop = isLoop;
        this.isInterruptable = isInterruptable;
    }

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