class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    width = canvas.width;
    height = canvas.height;

    constructor(imgPath, y = 0) {
        super().loadImage(imgPath);
        this.y = y
    }
}