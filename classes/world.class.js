class World {
    magician = new Magician();
    level = level1;
    zombies = this.level.enemies;
    backgroundObjects = this.level.backgroundObjects;
    canvas;
    ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawObjects(this.backgroundObjects);
        this.drawMagicican();
        this.zombies.forEach(zombie => this.drawFlippedObj(zombie));
        this.collisionDetection();
        requestAnimationFrame(() => this.draw());
    }

    cameraScroll() {
        let xScroll = this.magician.direction == 'right' ? -this.magician.speed : this.magician.speed;
        this.ctx.translate(xScroll, 0);
    }

    drawMagicican() {
        if (this.magician.direction == 'right') {
            this.ctx.drawImage(this.magician.img, this.magician.sX, this.magician.sY, this.magician.width, this.magician.height, this.magician.x, this.magician.y, this.magician.width, this.magician.height);
        } else {
            this.drawFlippedObj(this.magician)
        }
    }

    drawFlippedObj(obj) {
        this.ctx.save();
        this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
            obj.img,
            obj.sX, 0, obj.sWidth, obj.height,
            -obj.width / 2, -obj.height / 2, obj.width, obj.height);
        this.ctx.restore();
    }

    drawObjects(objects) {
        objects.forEach(obj => this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height))
    }

    collisionDetection() {
        const magicianHitbox = this.magician.getHitbox();
        let zombieHitboxArray = [];
        this.zombies.forEach(zombie => zombieHitboxArray.push(zombie.getHitbox()));
        zombieHitboxArray.forEach((zh, index) => {
            if (this.magician.goingDownwards == true
                && magicianHitbox.magicianJumpedOnZombieHead(magicianHitbox.bottomLine, zh.topLine, this.magician.jumpYFactor)) {
                this.zombies[index].dies();
            }
        });

        //for debugging
        this.drawHitboxForDebugging(magicianHitbox)
        zombieHitboxArray.forEach(z => this.drawHitboxForDebugging(z));
    }

    //for debugging
    drawHitboxForDebugging(hitbox) {
        this.ctx.beginPath();
        this.ctx.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
        this.ctx.stroke();
    }

    checkJumpingOnZombie() {

    }
}