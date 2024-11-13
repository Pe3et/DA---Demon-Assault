class Hitbox {
    x;
    y;
    width;
    height;
    topLine;
    rightLine;
    bottomLine;
    leftLine;

    /** Initializes a new Hitbox instance with the specified coordinates and dimensions. */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.topLine = { x1: this.x, y1: this.y, x2: this.x + this.width, y2: this.y };
        this.rightLine = { x1: this.x + this.width, y1: this.y, x2: this.x + this.width, y2: this.y + this.height };
        this.bottomLine = { x1: this.x, y1: this.y + this.height, x2: this.x + this.width, y2: this.y + this.height };
        this.leftLine = { x1: this.x, y1: this.y, x2: this.x, y2: this.y + this.height };
    }


    /** Checks if the magician's jump has landed on the zombie's head or dropable within a given offset. */
    magicianJumpedOnSomething(botLine, topLine, offset) {
        if (botLine.x1 < topLine.x2 + offset && botLine.x2 > topLine.x1 - offset && botLine.y1 < topLine.y2 + offset && botLine.y2 > topLine.y1 - offset) {
            return true;
        }
        return false;
    }


    /** Checks if two pairs of side-lines from two hitboxes collide horizontally with a tolerance. */
    checkHorizontalCollide(leftLine1, rightLine1, leftLine2, rightLine2) {
        const tolerance = 5;
        if ((leftLine1.x1 < rightLine2.x2 + tolerance && leftLine1.x2 > rightLine2.x1 - tolerance && leftLine1.y1 < rightLine2.y2 + tolerance && leftLine1.y2 > rightLine2.y1 - tolerance) ||
            (leftLine1.x1 < leftLine2.x2 + tolerance && leftLine1.x2 > leftLine2.x1 - tolerance && leftLine1.y1 < leftLine2.y2 + tolerance && leftLine1.y2 > leftLine2.y1 - tolerance) ||
            (rightLine1.x1 < rightLine2.x2 + tolerance && rightLine1.x2 > rightLine2.x1 - tolerance && rightLine1.y1 < rightLine2.y2 + tolerance && rightLine1.y2 > rightLine2.y1 - tolerance) ||
            (rightLine1.x1 < leftLine2.x2 + tolerance && rightLine1.x2 > leftLine2.x1 - tolerance && rightLine1.y1 < leftLine2.y2 + tolerance && rightLine1.y2 > leftLine2.y1 - tolerance)) {
            return true;
        }
        return false;
    }
}