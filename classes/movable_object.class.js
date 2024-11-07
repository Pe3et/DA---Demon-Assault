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

    animate(sprite, animationSpeed, interruptable = true) {
        if (interruptable == false && this.interruptableAnimation == true) {
            this.interruptableAnimation = false;
            this.playAnimation(sprite, animationSpeed);
            setTimeout(()=> {
                this.interruptableAnimation = true;
                this.resetAnimation();
                this.idle();
                keyboard.keyAction();
            }, 1000)
        } else if (this.interruptableAnimation){
            this.playAnimation(sprite, animationSpeed);
        }
    }

    playAnimation(sprite, animationSpeed = 1000 / 6) {
        this.resetAnimation();
        this.loadImage(sprite.src);
        this.animationInterval = setInterval(() => {
            this.sX += sprite.frameWidth;
            if (this.sX == sprite.spriteWidth) this.sX = 0;
        }, animationSpeed);
    }

    resetAnimation(){
        clearInterval(this.animationInterval);
        this.sX = 0;
        this.sY = 0;
    }

    stopMoving() {
        clearInterval(this.movingInterval);
    }

    moveRight(scrollX = false) {
        this.stopMoving();
        this.movingInterval = setInterval(() => {
            let walkAllowed = this.checkIfWalkingRightIsAllowed();
            let scrollAllowed = this.checkIfScrollingRightIsAllowed();
            if (walkAllowed) this.x += this.speed;
            if (scrollX && this.x > this.startPosition && scrollAllowed) world.cameraScroll();
        }, 1000 / 60);
    }

    moveLeft(scrollX = false) {
        this.stopMoving();
        this.movingInterval = setInterval(() => {
            let walkAllowed = this.checkIfWalkingLeftIsAllowed();
            let scrollAllowed = this.checkIfScrollingLeftIsAllowed();
            if (walkAllowed) this.x -= this.speed;
            if (scrollX && this.x < (world.level.endPosX - canvas.width) && scrollAllowed) world.cameraScroll();
        }, 1000 / 60);
    }

    checkIfWalkingLeftIsAllowed() {
        if (this.x == -40) {
            return false;
        } else {
            return true;
        };
    }

    checkIfScrollingLeftIsAllowed() {
        if (this.x > this.startPosition) {
            return true
        }
    }

    checkIfWalkingRightIsAllowed() {
        if (this.x >= world.level.endPosX - (this.startPosition + this.width)) {
            return false
        } else {
            return true
        }
    }

    checkIfScrollingRightIsAllowed() {
        if (this.x >= (world.level.endPosX - world.canvas.width)) {
            return false
        } else {
            return true
        }
    }
}