class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    width;
    height;

    constructor(imgPath, x = 0, y = 0, width = 640, height = 288) {
        super().loadImage(imgPath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}