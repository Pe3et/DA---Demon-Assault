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

    /** Initializes the World class with a given canvas element. */
    constructor(canvas) {
        if(muteFlag == false) this.muteAllAudio();
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
        requestAnimationFrame(() => this.draw());
    }

    /** Checks if all zombies in the current wave are dead. */
    areAllZombiesDead() {
        return this.zombies.every(zombie => zombie.isDead);
    }

    /** Proceeds to the next wave of zombies, incrementing the wave number and spawning new zombies. */
    nextWave() {
        this.wave++;
        this.spawnNewZombies()
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
        this.ctx.save();
        this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
            obj.img,
            obj.sX, 0, obj.currentSprite.frameWidth, obj.height,
            -obj.width / 2, -obj.height / 2, obj.width, obj.height);
        this.ctx.restore();
    }

    /** Draws an object on the canvas. Works for spritesheets and single images. */
    drawObject(obj) {
        if (this.objWithSpriteSheet(obj)) {
            this.ctx.drawImage(obj.img, obj.sX, obj.sY, obj.currentSprite.frameWidth, obj.height, obj.x, obj.y, obj.width, obj.height)
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
        this.boss = new Demonboss();
        document.getElementById('bossbar').classList.toggle('d_none')
    }

    collisionDetection() {
        const magicianHitbox = this.magician.getHitbox();
        const zombieHitboxArray = [];
        const dropableHitboxArray = [];
        const lightningHitboxArray = [];
        if (this.boss) this.bossCollisionDetection(magicianHitbox);
        this.flameCollisionDetection(magicianHitbox);
        if (this.fireball) this.fireballCollisionDetection(magicianHitbox);

        this.zombies.forEach(zombie => zombieHitboxArray.push(zombie.getHitbox()));
        zombieHitboxArray.forEach((zH, index) => this.zombieCollisionBehaviour(zH, index, magicianHitbox));
        this.dropables.forEach(drop => dropableHitboxArray.push(drop.getHitbox()));
        dropableHitboxArray.forEach((dH, index) => this.dropableCollisionBehaviour(dH, index, magicianHitbox));
        this.cleanDropablesArray();
        this.lightnings.forEach(lightning => lightningHitboxArray.push(lightning.getHitbox()));
        lightningHitboxArray.forEach(lH => this.lightningCollisionBehaviour(lH, zombieHitboxArray));


        //for debugging
        this.drawHitboxForDebugging(magicianHitbox)
        zombieHitboxArray.forEach(z => this.drawHitboxForDebugging(z));
        dropableHitboxArray.forEach(d => this.drawHitboxForDebugging(d));
        lightningHitboxArray.forEach(l => this.drawHitboxForDebugging(l));
    }

    bossCollisionDetection(mH) {
        const bH = this.boss.getHitbox();
        if (bH.checkHorizontalCollide(bH.leftLine, bH.rightLine, mH.leftLine, mH.rightLine) ||
            bH.botTopCollide(bH.bottomLine, mH.topLine) ||
            bH.botTopCollide(bH.topLine, mH.bottomLine)) {
            this.magician.updateHealth(-1, true)
        }
        //debug
        this.drawHitboxForDebugging(bH)
    }

    flameCollisionDetection(mH) {
        const flameHitboxArray = this.flames.map(f => f.getHitbox());
        if (this.flames.every(f => f.isBursting)) {
            flameHitboxArray.forEach(fH => {
                if (fH.checkHorizontalCollide(fH.leftLine, fH.rightLine, mH.leftLine, mH.rightLine) ||
                    fH.botTopCollide(mH.bottomLine, fH.topLine)) {
                    this.magician.updateHealth(-1, true)
                }
            })
        }

        //debug
        flameHitboxArray.forEach(fH => this.drawHitboxForDebugging(fH));
        // if flame.isBursting ...
    }

    fireballCollisionDetection(mH) {
        const fH = this.fireball.getHitbox();
        if (fH.checkHorizontalCollide(fH.leftLine, fH.rightLine, mH.leftLine, mH.rightLine) ||
            mH.botTopCollide(mH.bottomLine, fH.topLine)) {
            this.magician.updateHealth(-20);
            this.fireball = null
        }

        //debug
        this.drawHitboxForDebugging(fH)
    }

    /** Removes dropables with the removalFlag set to true from the dropables array. */
    cleanDropablesArray() {
        this.dropables = this.dropables.filter(drop => !drop.removalFlag)
    }

    /** Handles lightning collision behaviour with zombies. */
    lightningCollisionBehaviour(lH, zHArray) {
        if (this.boss) {
            const bH = this.boss.getHitbox();
            if (lH.checkHorizontalCollide(lH.leftLine, lH.rightLine, bH.leftLine, bH.rightLine)) {
                this.boss.gotHit()
            }
        }
        zHArray.forEach((zH, index) => {
            if (lH.checkHorizontalCollide(lH.leftLine, lH.rightLine, zH.leftLine, zH.rightLine)) {
                this.zombies[index].die();
                setTimeout(() => this.zombies[index].removalFlag = true, 1000);
            }
        });
    }

    /** Handles zombie collision behaviour with the magician. */
    zombieCollisionBehaviour(zH, index, mH) {
        if (this.magician.goingDownwards == true
            && mH.botTopCollide(mH.bottomLine, zH.topLine)) {
            this.zombies[index].die();
            setTimeout(() => this.zombies[index].removalFlag = true, 1000);
        } else if (
            (this.zombies[index].direction == 'left' && zH.checkHorizontalCollide(zH.leftLine, zH.leftLine, mH.rightLine, mH.rightLine))
            || (this.zombies[index].direction == 'right' && zH.checkHorizontalCollide(zH.rightLine, zH.rightLine, mH.leftLine, mH.leftLine))
        ) {
            this.zombies[index].attack();
        } else if (this.magician.sX) {
            this.zombies[index].moveTowardsPlayer();
        }
    }

    /** Handles dropable collision behaviour with the magician. */
    dropableCollisionBehaviour(dH, index, mH) {
        if (mH.botTopCollide(mH.bottomLine, dH.topLine) ||
            (dH.checkHorizontalCollide(dH.leftLine, dH.rightLine, mH.leftLine, mH.rightLine))) {
            this.dropables[index].isCollected();
        }
    }

    /** Mutes or unmutes all audio in the game world. */
    muteAllAudio(mute = true) {
        this.audioZombieAttacks.audioSheet.muted = mute;
        this.audioZombieDeaths.forEach(audio => audio.muted = mute);
        this.magician.muteAllMagicianAudio(mute);
        if(this.boss) this.boss.muteAllBossAudio(mute)
    }

    //for debugging
    drawHitboxForDebugging(hitbox) {
        this.ctx.beginPath();
        this.ctx.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
        this.ctx.stroke();
    }
}