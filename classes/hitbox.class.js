class Hitbox {
    x;
    y;
    width;
    height;
    topLine;
    rightLine;
    bottomLine;
    leftLine;

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

    /**
     * Checks if the magician's jump has landed on the zombie's head.
     * 
     * @param {Object} botLine - The line representing the magician's jump.
     * @param {Object} topLine - The line representing the zombie's head.
     * @param {number} offset - The offset to consider for the collision.
     * @returns {boolean} True if the magician's jump has landed on the zombie's head, false otherwise.
     */
    magicianJumpedOnZombieHead(botLine, topLine, offset) {
        if (botLine.x1 < topLine.x2 + offset && botLine.x2 > topLine.x1 - offset && botLine.y1 < topLine.y2 + offset && botLine.y2 > topLine.y1 - offset) {
            return true;
        }
        return false;
    }
}