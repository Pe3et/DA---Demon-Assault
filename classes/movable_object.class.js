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
        if(y) this.y = y;
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
        this.animationInterval = setInterval( () => {
            this.sX += sprite.frameWidth;
            if(this.sX == sprite.spriteWidth) this.sX = 0; 
        }, 1000 / 6);
    }

    moveRight() {
        clearInterval(this.movingInterval);
        this.movingInterval = setInterval(() => this.x += this.speed, 1000 / 60);
    }

    moveLeft() {
        clearInterval(this.movingInterval);
        this.movingInterval = setInterval(() => this.x -= this.speed, 1000 / 60);
    }
}