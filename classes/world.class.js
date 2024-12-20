class World {
    magician = new Magician();
    level = level1;
    zombies = this.level.enemies;
    backgroundObjects = this.level.backgroundObjects;
    dropables = [];
    lightnings = [];
    flames = [];
    fireball
    canvas;
    ctx;
    wave = 1;
    newWaveFlag = false;
    boss;
    audioZombieAttacks = new AudioSpritesheet('assets/audio/fx/zombie_attacks.mp3', 2000,
        [1.55, 5.1, 8.2, 11.7, 15.4, 19.7, 24.3, 27.6, 30, 37, 40.5]);
    audioZombieDeaths = [
        new Audio('assets/audio/fx/bone_break/bb1.mp3'),
        new Audio('assets/audio/fx/bone_break/bb2.mp3'),
        new Audio('assets/audio/fx/bone_break/bb3.mp3'),
        new Audio('assets/audio/fx/bone_break/bb4.mp3'),
        new Audio('assets/audio/fx/bone_break/bb5.mp3'),
        new Audio('assets/audio/fx/bone_break/bb6.mp3'),
        new Audio('assets/audio/fx/bone_break/bb7.mp3'),
        new Audio('assets/audio/fx/bone_break/bb8.mp3')
    ];
    win = false;
    gameIsOver = false

    /** Initializes the World class with a given canvas element. */
    constructor(canvas) {
        if (muteFlag == false) this.muteAllAudio();
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
        this.drawDropables();
        this.drawLightnings();
        this.drawFlames();
        if (this.fireball) this.drawFireball();
        if (this.boss) this.drawBoss();
        this.collisionDetection();
        this.areAllZombiesDead() && this.nextWave();
        requestAnimationFrame(() => {
            if (this.win == false && this.magician.isDead == false) {
                this.draw()
            }
        });
    }

    /** Checks if all zombies in the current wave are dead. */
    areAllZombiesDead() {
        return this.zombies.every(zombie => zombie.isDead);
    }

    /** Proceeds to the next wave of zombies, incrementing the wave number, deleting old zombie and spawning new zombies. */
    nextWave() {
        if(!this.newWaveFlag) {
            this.newWaveFlag = true;
            this.wave++;
            setTimeout(() => {
                this.zombies = [];
                this.spawnNewZombies();
                this.newWaveFlag = false;
            }, 1000)
        }
    }

    /** Spawns a new wave of zombies, with the number of zombies increasing with each wave. */
    spawnNewZombies() {
        for (let i = 0; i < this.wave * 3; i++) {
            const zombie = new Zombie();
            const side = Math.random() < 0.5 ? 'left' : 'right';
            zombie.x = side == 'left' ? -zombie.width : this.canvas.width + this.magician.x;
            this.zombies.push(zombie);
        }
    }

    /** For scrolling the camera. */
    cameraScroll() {
        let xScroll = this.magician.direction == 'right' ? -this.magician.speed : this.magician.speed;
        this.ctx.translate(xScroll, 0);
    }

    /** Draws the magician on the canvas */
    drawMagicican() {
        this.drawInDirection(this.magician)
    }

    /** Draws the zombies on the canvas */
    drawZombies() {
        this.zombies.forEach(z => this.drawInDirection(z))
    }

    /** Draws all dropped objects on the canvas. */
    drawDropables() {
        this.dropables.forEach(d => this.drawObject(d));
    }

    /** Draws the lightnings on the canvas. */
    drawLightnings() {
        this.lightnings.forEach(l => this.drawInDirection(l))
    }

    /** Draws the boss on the canvas in the direction it is facing. */
    drawBoss() {
        this.drawInDirection(this.boss)
    }

    /** Draws all flames on the canvas. */
    drawFlames() {
        this.flames.forEach(f => this.drawObject(f))
    }

    /** Draws all fireballs on the canvas in the direction they are facing. */
    drawFireball() {
        this.drawObject(this.fireball)
    }

    /** Draws an object on the canvas in the direction it is facing. */
    drawInDirection(obj) {
        obj instanceof Demonboss ?
            (obj.direction == 'right' ? this.drawFlippedObj(obj) : this.drawObject(obj)) :
            (obj.direction == 'left' ? this.drawFlippedObj(obj) : this.drawObject(obj))
    }

    /** Draws an object on the canvas flipped in the other direction, than it is on the spritesheet */
    drawFlippedObj(obj) {
        if (obj.currentSprite) {
            this.ctx.save();
            this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(
                obj.img,
                obj.currentSprite.x, obj.currentSprite.y, obj.currentSprite.frameWidth, obj.height,
                -obj.width / 2, -obj.height / 2, obj.width, obj.height);
            this.ctx.restore();
        }
    }

    /** Draws an object on the canvas. Works for spritesheets and single images. */
    drawObject(obj) {
        if (this.objWithSpriteSheet(obj)) {
            this.ctx.drawImage(obj.img, obj.currentSprite.x, obj.currentSprite.y, obj.currentSprite.frameWidth, obj.height, obj.x, obj.y, obj.width, obj.height)
        } else {
            this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height)
        }
    }

    /** Checks if an object uses a sprite sheet. */
    objWithSpriteSheet(obj) {
        return obj instanceof Magician ||
            obj instanceof Zombie ||
            obj instanceof Lightning ||
            obj instanceof Demonboss
    }

    /** Summons the boss in the game world. */
    summonBoss() {
        music.src = 'assets/audio/boss_music.ogg';
        music.play();
        this.boss = new Demonboss();
        document.getElementById('bossbar').classList.toggle('d_none')
    }

    /** Handles collision detection between game objects in the world. */
    collisionDetection() {
        this.cleanArraysWithRemovableObjects();
        const magicianHitbox = this.magician.getHitbox();
        const zombieHitboxArray = this.getHitboxArray(this.zombies);
        const dropableHitboxArray = this.getHitboxArray(this.dropables);
        const lightningHitboxArray = this.getHitboxArray(this.lightnings);
        if (this.boss) this.bossCollisionDetection(magicianHitbox);
        if (this.fireball) this.fireballCollisionDetection(magicianHitbox);
        this.flameCollisionDetection(magicianHitbox);
        zombieHitboxArray.forEach((zH, index) => this.zombieCollisionBehaviour(zH, index, magicianHitbox));
        dropableHitboxArray.forEach((dH, index) => this.dropableCollisionBehaviour(dH, index, magicianHitbox));
        lightningHitboxArray.forEach(lH => this.lightningCollisionDetection(lH, zombieHitboxArray));
    }

    /** Retrieves an array of hitboxes from a given array of objects. */
    getHitboxArray(objArray) {
        const hitboxArray = [];
        objArray.forEach(obj => hitboxArray.push(obj.getHitbox()));
        return hitboxArray
    }

    /** Handles collision detection between the magician and the boss. */
    bossCollisionDetection(magicicanHitbox) {
        const bossHitbox = this.boss.getHitbox();
        if (bossHitbox.checkHorizontalCollide(bossHitbox.leftLine, bossHitbox.rightLine, magicicanHitbox.leftLine, magicicanHitbox.rightLine) ||
            bossHitbox.botTopCollide(bossHitbox.bottomLine, magicicanHitbox.topLine) ||
            bossHitbox.botTopCollide(bossHitbox.topLine, magicicanHitbox.bottomLine)) {
            this.magician.updateHealth(-1, true)
        }
    }

    /** Handles flame collision detection with the magician. */
    flameCollisionDetection(magicianHitbox) {
        const flameHitboxArray = this.flames.map(f => f.getHitbox());
        if (this.flames.every(f => f.isBursting)) {
            flameHitboxArray.forEach(fH => {
                if (fH.checkHorizontalCollide(fH.leftLine, fH.rightLine, magicianHitbox.leftLine, magicianHitbox.rightLine) ||
                    fH.botTopCollide(magicianHitbox.bottomLine, fH.topLine)) {
                    this.magician.updateHealth(-1, true)
                }
            })
        }
    }

    /** Handles fireball collision detection with the magician. */
    fireballCollisionDetection(magicianHitbox) {
        const fireballHitbox = this.fireball.getHitbox();
        if (fireballHitbox.checkHorizontalCollide(fireballHitbox.leftLine, fireballHitbox.rightLine, magicianHitbox.leftLine, magicianHitbox.rightLine) ||
            magicianHitbox.botTopCollide(magicianHitbox.bottomLine, fireballHitbox.topLine)) {
            this.magician.updateHealth(-20);
            this.fireball = null
        }
    }

    /** Cleans arrays containing removable objects, such as lightnings, dropables. */
    cleanArraysWithRemovableObjects() {
        this.cleanLightningArray();
        this.cleanDropablesArray();
    }

    /** Removes lightnings with the removalFlag set to true from the lightnings array. */
    cleanLightningArray() {
        this.lightnings = this.lightnings.filter(lightning => !lightning.removalFlag)
    }

    /** Removes dropables with the removalFlag set to true from the dropables array. */
    cleanDropablesArray() {
        this.dropables = this.dropables.filter(drop => !drop.removalFlag)
    }

    /** Handles lightning collision behaviour with zombies. */
    lightningCollisionDetection(lightningHitbox, zHArray) {
        if (this.boss) {
            const bossHitbox = this.boss.getHitbox();
            if (lightningHitbox.checkHorizontalCollide(lightningHitbox.leftLine, lightningHitbox.rightLine, bossHitbox.leftLine, bossHitbox.rightLine)) {
                this.boss.gotHit()
            }
        }
        zHArray.forEach((zombieHitbox, index) => {
            if (lightningHitbox.checkHorizontalCollide(lightningHitbox.leftLine, lightningHitbox.rightLine, zombieHitbox.leftLine, zombieHitbox.rightLine)) {
                this.zombies[index].die();
                if(this.zombies[index]) setTimeout(() => {
                    if(this.zombies[index]) this.zombies[index].removalFlag = true
                }, 10000);
            }
        });
    }

    /** Handles zombie collision behaviour with the magician. */
    zombieCollisionBehaviour(zombieHitbox, index, magicianHitbox) {
        if (this.magician.goingDownwards == true
            && magicianHitbox.botTopCollide(magicianHitbox.bottomLine, zombieHitbox.topLine)) {
            this.zombies[index].die();
        } else if (
            (this.zombies[index].direction == 'left' && zombieHitbox.checkHorizontalCollide(zombieHitbox.leftLine, zombieHitbox.leftLine, magicianHitbox.rightLine, magicianHitbox.rightLine))
            || (this.zombies[index].direction == 'right' && zombieHitbox.checkHorizontalCollide(zombieHitbox.rightLine, zombieHitbox.rightLine, magicianHitbox.leftLine, magicianHitbox.leftLine))
        ) {
            this.zombies[index].attack();
        } else {
            setTimeout(() => this.zombies[index].moveTowardsPlayer(), 10);
        }
    }

    /** Handles dropable collision behaviour with the magician. */
    dropableCollisionBehaviour(dropableHitbox, index, magicianHitbox) {
        if (magicianHitbox.botTopCollide(magicianHitbox.bottomLine, dropableHitbox.topLine) ||
            (dropableHitbox.checkHorizontalCollide(dropableHitbox.leftLine, dropableHitbox.rightLine, magicianHitbox.leftLine, magicianHitbox.rightLine))) {
            this.dropables[index].isCollected();
        }
    }

    /** Mutes or unmutes all audio in the game world. */
    muteAllAudio(mute = true) {
        this.audioZombieAttacks.audioSheet.muted = mute;
        this.audioZombieDeaths.forEach(audio => audio.muted = mute);
        this.magician.muteAllMagicianAudio(mute);
        if (this.boss) this.boss.muteAllBossAudio(mute)
    }

    /** Ends the game, stopping all zombies and the magician, and handling game over or win conditions. */
    end() {
        this.zombies.forEach(z => z.stopMoving());
        this.magician.stopMoving();
        if (this.magician.isDead) {
            if (this.boss) this.boss.stopMoving();
            if(!this.gameIsOver)gameOver();
            this.gameIsOver = true
        } else if (this.boss.isDead) {
            win()
        }
        this.boss = null;
    }

    /** Resets the game world to its initial state. */
    reset() {
        this.magician.reset();
        this.zombies = [];
        this.dropables = [];
        this.lightnings = [];
        this.flames = [];
        this.boss = null;
        this.wave = 1;
        this.win = false;
        resetLevel();
        this.zombies = this.level.enemies;
        keyboard.keyboardBlock = false;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.draw();
        this.magician.idle();
        this.gameIsOver = false
    }
}