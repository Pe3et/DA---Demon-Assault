class MovableObject {
    x;
    y;
    img;
    width;
    height;
    sX = 0;
    sY = 0;
    sWidth;
    speed;
    isMoving;
    movingInterval;
    animationInterval;
    animationBlocker = false;
    currentSprite;

    constructor(x, y, width, height) {
        this.x = x;
        if (y) this.y = y;
        this.width = width;
        this.height = height;
    }

    /** To load a new image for the object. */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /** To load a new spritesheet for the object. */
    loadSprite(sprite) {
        this.loadImage(sprite.src);
        this.currentSprite = sprite;
        sprite.reset();
    }

    /** Animates a sprite, handling looping and single animations with interruptability. */
    animate(sprite, timeBetweenFrames) {
        if (this.animationBlocker == false) {
            this.animationBlocker = !sprite.isInterruptable;
            this.currentSprite = sprite;
            if (sprite.isLoop) {
                this.loopAnimation(sprite, timeBetweenFrames)
            } else {
                this.playSingleAnimation(sprite, timeBetweenFrames)
            }
        }
    }

    /** Loops an animation. */
    loopAnimation(sprite, timeBetweenFrames) {
        this.resetAnimation();
        this.loadSprite(sprite);
        this.animationInterval = setInterval(() => {
            this.sX += sprite.frameWidth;
            if (this.sX >= sprite.spriteWidth) this.sX = 0;
        }, timeBetweenFrames);
    }

    /** Plays a single animation.*/
    playSingleAnimation(sprite, timeBetweenFrames) {
        this.resetAnimation();
        this.interruptableAnimation = sprite.isInterruptable;
        this.loadSprite(sprite);
        let frameCount = 1;
        this.animationInterval = setInterval(() => {
            this.sX = sprite.x;
            sprite.getNextFrameX();
            frameCount++;
            if (frameCount > sprite.totalFrames) {
                clearInterval(this.animationInterval);
                this.sX = sprite.spriteWidth - sprite.frameWidth;
            }
        }, timeBetweenFrames)
    }

    /** Resets an animation. */
    resetAnimation() {
        clearInterval(this.animationInterval);
        this.sX = 0;
        this.sY = 0;
    }

    /** Stop the movement of an Object. */
    stopMoving() {
        clearInterval(this.movingInterval);
        this.isMoving = false;
    }

    /**
     * Makes an object move to the right with the speed of that object.
     * @param {Boolean} scrollX - to call the camera scroll, when magician is moving
     */
    moveRight(scrollX = false) {
        this.stopMoving();
        this.isMoving = true;
        this.movingInterval = setInterval(() => {
            let walkAllowed = this.checkIfGoingRightIsAllowed();
            let scrollAllowed = this.checkIfScrollingRightIsAllowed();
            if (walkAllowed) this.x += this.speed;
            if (scrollX && this.x > this.startPositionX && scrollAllowed) world.cameraScroll();
        }, 1000 / 60);
    }

    /**
     * Makes an object move to the left with the speed of that object.
     * @param {Boolean} scrollX - to call the camera scroll, when magician is moving
     */
    moveLeft(scrollX = false) {
        this.stopMoving();
        this.isMoving = true;
        this.movingInterval = setInterval(() => {
            let movingAllowed = this.checkIfGoingLeftIsAllowed();
            let scrollAllowed = this.checkIfScrollingLeftIsAllowed();
            if (movingAllowed) this.x -= this.speed;
            if (scrollX && this.x < (world.level.endPosX - canvas.width) && scrollAllowed) world.cameraScroll();
        }, 1000 / 60);
    }

    /** To check if going left on the map is allowed */
    checkIfGoingLeftIsAllowed() {
        return this.x > -40;
    }

    /** To check if scrolling left on the map is allowed */
    checkIfScrollingLeftIsAllowed() {
        return this.x > this.startPositionX;
    }

    /** To check if going right on the map is allowed */
    checkIfGoingRightIsAllowed() {
        return this.x < world.level.endPosX - this.width * 2;
    }

    /** To check if scrolling right on the map is allowed */
    checkIfScrollingRightIsAllowed() {
        return this.x < world.level.endPosX - world.canvas.width;
    }
}