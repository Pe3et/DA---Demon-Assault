class Demonboss extends MovableObject {
    flightY = 80
    groundY = 155
    x = world.level.endPosX
    y = this.flightY
    width = 81
    height = 71
    speed = world.magician.speed
    direction = 'left'
    hp = 100
    idleTimeAtGround = 1000
    wasJustHitted = false
    isFlyingUp = false
    isDead = false;
    idleSprite = new SpriteSheet('assets/sprites/demon_boss/idle.png', 4, 324)
    flyingSprite = new SpriteSheet('assets/sprites/demon_boss/flying.png', 4, 324)
    hurtSprite = new SpriteSheet('assets/sprites/demon_boss/hurt.png', 4, 324)
    attackSprite = new SpriteSheet('assets/sprites/demon_boss/attack.png', 8, 648, false)
    deathSprite = new SpriteSheet('assets/sprites/demon_boss/death.png', 7, 567, false)
    audioScreeches = new AudioSpritesheet('assets/audio/fx/boss_screech.ogg', 2100,
        [0.1, 2.2, 4.4, 7.3, 10.1, 12.9, 15.4, 18.3, 21.4, 24.6, 27])
    audioFireball = new Audio('assets/audio/fx/fireball.mp3')
    audioFlame = new Audio('assets/audio/fx/fire.mp3')
    audioExplosion = new Audio('assets/audio/fx/explosion.mp3')

    /** Initializes the demon boss, starting its animation and flight pattern. Also mutes audio if audio is already muted. */
    constructor() {
        super();
        this.animate(this.flyingSprite, 100);
        if (muteFlag == false) this.muteAllBossAudio();
        this.audioScreeches.playRandomSound();
        this.flyAround();
    }

    /** Flies the demon boss around the screen, changing direction at the visible sides. */
    flyAround() {
        if (!this.isMoving) this.direction == 'left' ? this.moveLeft() : this.moveRight();
        if (this.isAtLeftVisibleSide() && this.direction == 'left') {
            this.direction = 'right';
            Math.random() < 0.5 ? this.flyDown() : this.moveRight();
        }
        if (this.isAtRightVisibleSide() && this.direction == 'right') {
            this.direction = 'left';
            Math.random() < 0.5 ? this.flyDown() : this.moveLeft();
        }
        this.isDead ? this.dies() : setTimeout(() => this.isMoving && this.flyAround(), 1000 / 60)
    }

    /** Checks if the demon boss is at the left visible side of the screen. */
    isAtLeftVisibleSide() {
        return (this.x < world.magician.x - world.magician.startPositionX + 10 &&
            this.x <= world.level.endPosX - canvas.width - world.magician.startPositionX) ||
            this.x < 10
    }

    /** Checks if the demon boss is at the right visible side of the screen. */
    isAtRightVisibleSide() {
        return (this.x > world.magician.x + (canvas.width - world.magician.startPositionX - this.width) &&
            !(this.x < canvas.width - this.width)) ||
            this.x >= world.level.endPosX - world.magician.startPositionX - this.width
    }

    /** Enters the demon boss's idle state, stopping movement and animating the idle sprite. */
    idle() {
        this.stopMoving();
        this.animate(this.idleSprite, 100);
        if (this.y == this.groundY) {
            setTimeout(() => {
                this.flyUp();
                this.audioScreeches.playRandomSound()
            }, this.idleTimeAtGround)
        } else if (this.y == this.flightY) {
            this.flyAround();
        } 
    }

    /** Initiates the demon boss's attack animation and summons or shoots flames based on its direction. */
    attack() {
        this.audioScreeches.playRandomSound();
        this.animate(this.attackSprite, 100);
        this.direction == 'right' ? this.summonFlame() : this.shootFireball();
    }

    /** Summons a specified amount of flames and initiates the demon boss's upward flight after a short delay. */
    summonFlame() {
        this.audioFlame.volume = 0.5;
        this.audioFlame.playbackRate = 0.5;
        this.audioFlame.play();
        const flamesAmount = 5;
        for (let i = 0; i < flamesAmount; i++) {
            const flame = new Flame();
            world.flames.push(flame)
        }
        setTimeout(() => this.flyUp(), 1000)
    }

    /** Shoots a fireball and initiates the demon boss's upward flight after a short delay. */
    shootFireball() {
        world.fireball = new Fireball();
        this.audioFireball.volume = 0.5;
        this.audioFireball.play();
        setTimeout(() => this.flyUp(), 1000)
    }

    /** Moves the demon boss upwards until it reaches the flight altitude. */
    flyUp() {
        if (!this.isDead) {
            this.isFlyingUp = true;
            if (this.currentSprite != this.idleSprite) this.idle();
            this.y--;
            if (this.y > this.flightY) {
                setTimeout(() => this.flyUp(), 1000 / 60)
            } else if (this.y == this.flightY) {
                this.isFlyingUp = true;
                this.flyAround();
            } else if (this.y < this.flightY) {
                this.y++;
                setTimeout(() => this.flyUp(), 1000 / 60)
            }
        } else {
            this.dies()
        }
    }

    /** Moves the demon boss downwards until it reaches the ground. */
    flyDown() {
        if (this.isMoving) this.idle();
        this.y++;
        if (this.y != this.groundY) {
            setTimeout(() => this.flyDown(), 1000 / 60)
        } else if (this.y == this.groundY && !gameOverFlag) {
            this.attack()
        }
    }

    /** Returns the hitbox of the demon boss. */
    getHitbox() {
        return new Hitbox(this.x, this.y, this.width, this.height)
    }

    /** Handles the demon boss's hit event, updating its HP and triggering the hurt animation or death. */
    gotHit() {
        if(!this.wasJustHitted) {
            this.wasJustHitted = true;
            setTimeout(()=> this.wasJustHitted = false, 1000)
            this.hp -= 20;
            updateStatusBar('bossbar', this.hp);
            this.audioScreeches.playRandomSound();
            this.hp <= 0 ? this.isDead = true : this.hurt();
        }
    }

    /** Animates the demon boss's hurt sprite and initiates its upward flight after a short delay. */
    hurt() {
        this.animate(this.hurtSprite, 100);
        setTimeout(() => this.flyUp(), 800)
    }

    /** Kills the demon boss, stopping its movement, playing an explosion sound, and animating its death sprite. */
    dies() {
        this.isDead = true;
        this.stopMoving();
        this.audioExplosion.volume = 0.5;
        this.audioExplosion.play();
        this.animate(this.deathSprite, 130);
        setTimeout(() => {
            if (!world.magician.isDead) world.win = true;
            world.end()
        }, 2000)
    }

    /** Mutes or unmutes all demon boss sounds. */
    muteAllBossAudio(mute = true) {
        this.audioScreeches.audioSheet.muted = mute;
        this.audioFireball.muted = mute;
        this.audioFlame.muted = mute;
        this.audioExplosion.muted = mute
    }
}