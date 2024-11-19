class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    width;
    height;
    img = new Image();

    /** Initializes a new BackgroundObject instance with the specified image path and position. */
    constructor(imgPath, x = 0, y = 0, width = 640, height = 288) {
        super();
        this.img.src = imgPath;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}