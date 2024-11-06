class MovableObject {
    x;
    y;
    img;
    width;
    height;
    sX = 0;
    sY = 0;

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
        setInterval( () => {
            this.sX += sprite.frameWidth;
            if(this.sX == sprite.spriteWidth) this.sX = 0; 
        }, 1000 / 6);
    }

    moveRight() {
        this.x += 1;
    }

    moveLeft() {

    }
}