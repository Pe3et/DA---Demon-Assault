class World {
    magician = new Magician(10);
    zombies = [
        new Zombie(300),
        new Zombie(400)
    ];
    backgroundObjects = [
        new BackgroundObject('assets/sprites/battleground/sky.png'),
        new BackgroundObject('assets/sprites/battleground/graves.png'),
        new BackgroundObject('assets/sprites/battleground/back_trees.png'),
        new BackgroundObject('assets/sprites/battleground/crypt.png'),
        new BackgroundObject('assets/sprites/battleground/wall.png', 25),
        new BackgroundObject('assets/sprites/battleground/ground.png', 60),
        new BackgroundObject('assets/sprites/battleground/bones.png', 60),
    ]
    canvas;
    ctx;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawObjects(this.backgroundObjects);
        this.ctx.drawImage(this.magician.img, this.magician.sX, this.magician.sY, this.magician.width, this.magician.height, this.magician.x, this.magician.y, this.magician.width, this.magician.height);
        this.zombies.forEach(zombie => this.drawFlippedObj(zombie));
        requestAnimationFrame(() => this.draw());
    }

    /**The zombie sprites have to be flipped, to go towards the magicican. */
    drawFlippedObj(obj) {
        this.ctx.save();
        this.ctx.translate(obj.x + obj.width/2, obj.y + obj.height/2);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
            obj.img,
            obj.sX, 0, obj.sWidth, obj.height,
            -obj.width/2, -obj.height/2, obj.width, obj.height);
        this.ctx.restore();
    }

    drawObjects(objects) {
        objects.forEach(obj => this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height))
    }
}