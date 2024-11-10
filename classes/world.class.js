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

    /** The main draw method to continuously draw on the world on the canvas */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.backgroundObjects.forEach(obj => this.drawObject(obj));
        this.drawMagicican();
        this.drawZombies();
        this.collisionDetection();
        requestAnimationFrame(() => this.draw());
    }

    /** For scrolling the camera. */
    cameraScroll() {
        let xScroll = this.magician.direction == 'right' ? -this.magician.speed : this.magician.speed;
        this.ctx.translate(xScroll, 0);
    }

    /** Draws the magician on the canvas */
    drawMagicican() {
        if (this.magician.direction == 'right') {
            this.ctx.drawImage(this.magician.img, this.magician.sX, this.magician.sY, this.magician.width, this.magician.height, this.magician.x, this.magician.y, this.magician.width, this.magician.height);
        } else {
            this.drawFlippedObj(this.magician)
        }
    }

    /** Draws the zombies on the canvas */
    drawZombies() {
        this.zombies.forEach(zombie => {
            zombie.direction == 'left' ? this.drawFlippedObj(zombie) : this.drawObject(zombie)
        });
    }

    /** Draws an object on the canvas flipped in the other direction, than it is on the spritesheet */
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

    /** Draws an object on the canvas. Works for spritesheets and single images. */
    drawObject(obj) {
        if (obj instanceof Magician || obj instanceof Zombie) {
            this.ctx.drawImage(obj.img, obj.sX, obj.sY, obj.currentSprite.frameWidth, obj.height, obj.x, obj.y, obj.width, obj.height)
        } else {
            this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height)
        }
    }

    /** Detects collision of hitboxes and 'produces' events like biting, dying, etc. */
    collisionDetection() {
        const magicianHitbox = this.magician.getHitbox();
        let zombieHitboxArray = [];
        this.zombies.forEach(zombie => zombieHitboxArray.push(zombie.getHitbox()));
        zombieHitboxArray.forEach((zh, index) => {
            if (this.magician.goingDownwards == true
                && magicianHitbox.magicianJumpedOnZombieHead(magicianHitbox.bottomLine, zh.topLine, this.magician.jumpYFactor)) {
                this.zombies[index].die();
            } else if (zh.checkHorizontalCollide(zh.leftLine, zh.rightLine, magicianHitbox.leftLine, magicianHitbox.rightLine)) {
                this.zombies[index].bite();
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
}