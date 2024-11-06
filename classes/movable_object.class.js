class MovableObject {
    x;
    y = 100;
    img;
    width;
    height;

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

    moveRight() {
        this.x += 1;
    }

    moveLeft() {

    }
}