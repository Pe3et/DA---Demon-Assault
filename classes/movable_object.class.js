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

    animate(sprite) {
        clearInterval(this.animationInterval);
        this.loadImage(sprite.src);
        this.animationInterval = setInterval(() => {
            this.sX += sprite.frameWidth;
            if (this.sX == sprite.spriteWidth) this.sX = 0;
        }, 1000 / 6);
    }

    moveRight(scrollX = false) {
        clearInterval(this.movingInterval);
        this.movingInterval = setInterval(() => {
            let walkAllowed = this.checkIfWalkingRightIsAllowed();
            let scrollAllowed = this.checkIfScrollingRightIsAllowed();
            if(walkAllowed) this.x += this.speed;
            if (scrollX && this.x > this.startPosition && scrollAllowed) world.cameraScroll();
        }, 1000 / 60);
    }

    moveLeft(scrollX = false) {
        clearInterval(this.movingInterval);
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
        if (this.x > this.startPosition ) {
            return true
        }
    }

    checkIfWalkingRightIsAllowed() {
        if (this.x >= world.level.endPosX - (this.startPosition + this.width)){
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