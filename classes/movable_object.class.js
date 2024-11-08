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
    movingInterval;
    animationInterval;
    interruptableAnimation = true;
    currentSprite;

    constructor(x, y, width, height) {
        this.x = x;
        if (y) this.y = y;
        this.width = width;
        this.height = height;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadSprite(sprite) {
        this.img = new Image();
        this.img.src = sprite.src;
        this.currentSprite = sprite;
        sprite.reset();
    }

    animate(sprite, animationSpeed, interruptable = true, animationDuration = 1000) {
        if (interruptable == false && this.interruptableAnimation == true) {
            this.interruptableAnimation = false;
            this.loopAnimation(sprite, animationSpeed);
            setTimeout(() => {
                this.interruptableAnimation = true;
                this.resetAnimation();
                this.idle();
                keyboard.keyAction();
            }, animationDuration)
        } else if (this.interruptableAnimation) {
            this.loopAnimation(sprite, animationSpeed);
        }
    }

    loopAnimation(sprite, animationSpeed = 1000 / 6) {
        this.resetAnimation();
        this.loadSprite(sprite);
        this.animationInterval = setInterval(() => {
            this.sX += sprite.frameWidth;
            if (this.sX == sprite.spriteWidth) this.sX = 0;
        }, animationSpeed);
    }

    resetAnimation() {
        clearInterval(this.animationInterval);
        this.interruptableAnimation = true;
        this.sX = 0;
        this.sY = 0;
    }

    playDeathAnimation(sprite, timeBetweenFrames) {
        if(this.interruptableAnimation == true) {
            this.resetAnimation();
            this.interruptableAnimation = false;
            this.loadSprite(sprite);
            let frameCount = 1;
            this.animationInterval = setInterval(()=> {
                this.sX = sprite.x;
                sprite.getNextFrameX();
                console.log(frameCount);
                frameCount++;
                frameCount > sprite.totalFrames && clearInterval(this.animationInterval);
            }, timeBetweenFrames)
        }
    }

    stopMoving() {
        clearInterval(this.movingInterval);
    }

    moveRight(scrollX = false) {
        this.stopMoving();
        this.movingInterval = setInterval(() => {
            let walkAllowed = this.checkIfGoingRightIsAllowed();
            let scrollAllowed = this.checkIfScrollingRightIsAllowed();
            if (walkAllowed) this.x += this.speed;
            if (scrollX && this.x > this.startPositionX && scrollAllowed) world.cameraScroll();
        }, 1000 / 60);
    }

    moveLeft(scrollX = false) {
        this.stopMoving();
        this.movingInterval = setInterval(() => {
            let movingAllowed = this.checkIfGoingLeftIsAllowed();
            let scrollAllowed = this.checkIfScrollingLeftIsAllowed();
            if (movingAllowed) this.x -= this.speed;
            if (scrollX && this.x < (world.level.endPosX - canvas.width) && scrollAllowed) world.cameraScroll();
        }, 1000 / 60);
    }

    checkIfGoingLeftIsAllowed() {
        return this.x > -40;
    }

    checkIfScrollingLeftIsAllowed() {
        return this.x > this.startPositionX;
    }

    checkIfGoingRightIsAllowed() {
        return this.x < world.level.endPosX - (this.startPositionX + this.width);
    }

    checkIfScrollingRightIsAllowed() {
        return this.x < world.level.endPosX - world.canvas.width;
    }
}