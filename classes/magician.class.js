class Magician extends MovableObject {
    width = 128;
    height = 128;
    startPositionX = 120;
    startPositionY = 100;
    x = this.startPositionX;
    y = this.startPositionY;
    sWidth = 128;
    speed = 5;
    direction = 'right';
    goingDownwards = false;
    jumpYFactor = 5;
    jumpMaxHeight = 120;
    isJumping = false;
    health = 100;
    mana = 0;
    progress = 0;
    jumpInterval;
    isChargingAttack = false;
    attackChargeTimeout;
    idleSprite = new SpriteSheet('assets/sprites/wanderer_magician/Idle.png', 8);
    runSprite = new SpriteSheet('assets/sprites/wanderer_magician/Run.png', 8);
    jumpSprite = new SpriteSheet('assets/sprites/wanderer_magician/Jump_short.png', 5, false, false);
    deadSprite = new SpriteSheet('assets/sprites/wanderer_magician/Dead.png', 4, false, false);
    hurtSprite = new SpriteSheet('assets/sprites/wanderer_magician/Hurt.png', 4, false, false);
    attackSprite = new SpriteSheet('assets/sprites/wanderer_magician/Attack_2.png', 9, false, true);
    currentSprite = this.idleSprite;
    audioFootsteps = [
        new Audio('assets/audio/fx/footsteps/FootstepsWetGravelStones1.ogg'),
        new Audio('assets/audio/fx/footsteps/FootstepsWetGravelStones2.ogg'),
        new Audio('assets/audio/fx/footsteps/FootstepsWetGravelStones3.ogg'),
        new Audio('assets/audio/fx/footsteps/FootstepsWetGravelStones4.ogg')
    ];
    audioJumpSpritesheet = new AudioSpritesheet('assets/audio/fx/jumps.mp3', 500,
        [1.2, 2.5, 3.5, 4.8, 6.1, 7.5, 8.5, 10.4, 12.1, 13.5]);
    audioHurtSpritesheet = new AudioSpritesheet('assets/audio/fx/player_hurt.mp3', 900,
        [0.4, 1.4, 3.2, 4.5, 5.5, 6.8, 8, 9.3, 10.9, 12, 13.2, 14.4, 15.7, 17, 18, 19, 20, 21.4,
            22.4, 23.5, 24.7, 25.8, 27.1, 28.2, 30.1, 31, 32.3, 33.7, 35.2, 36.4, 37.8, 39, 40.2]);
    audioLighning = new Audio('assets/audio/fx/lightning.wav');

    /** Initializes a new instance of the Magician class. Loads the idle sprite and sets the magician to an idle state. */
    constructor() {
        super().loadSprite(this.idleSprite);
        this.idle();
        this.godmode();
    }

    /** Puts the magician in an idle state, stopping any movement and animating the idle sprite. */
    idle() {
        this.stopMoving();
        this.animate(this.idleSprite, 200);
    }

    /** Animates the magician running in the specified direction. */
    run(direction) {
        this.animate(this.runSprite, 100);
        if (direction == 'right') this.moveRight(true);
        if (direction == 'left') this.moveLeft(true);
        this.direction = direction;
        this.playFootstepsAudio()
    }

    /** Plays the footsteps audio when the magician is moving on the ground. */
    playFootstepsAudio() {
        if (this.y == this.startPositionY && this.isMoving && this.isJumping == false && !this.footstepsTimeout) {
            const index = Math.floor(Math.random() * this.audioFootsteps.length);
            this.audioFootsteps[index].volume = 0.3;
            this.audioFootsteps[index].playbackRate = 2.5;
            this.audioFootsteps[index].play();
            this.footstepsTimeout = setTimeout(() => {
                this.footstepsTimeout = null;
                this.playFootstepsAudio();
            }, 350);
        }
    }

    /** Initiates the magician's jump action, animating the jump sprite and updating the jump state. */
    jump() {
        const timeBetweenFrames = 157;
        if (this.animationBlocker == false && this.isJumping == false) {
            this.animate(this.jumpSprite, timeBetweenFrames);
            this.isJumping = true;
            this.jumpAnimation();
            this.audioJumpSpritesheet.playRandomSound()
        }
    }

    /** Animates the magician's jump action, updating the position and state. */
    jumpAnimation() {
        if (this.goingDownwards == false) this.y -= this.jumpYFactor;
        if (this.y <= this.startPositionY - this.jumpMaxHeight) {
            this.fallToGround();
        } else {
            requestAnimationFrame(() => this.jumpAnimation());
        }
    }

    /** Initiates the magician's falling action, setting the downwards direction and starting the fall animation. */
    fallToGround() {
        this.goingDownwards = true;
        this.fallAnimation();
    }

    /** Animates the magician's falling action, updating the position and state. */
    fallAnimation() {
        if (this.y == this.startPositionY) {
            this.goingDownwards = false;
            this.animationBlocker = false;
            this.isJumping = false;
            this.idle();
            keyboard.keyAction();
        } else {
            this.y += this.jumpYFactor;
            requestAnimationFrame(() => this.fallAnimation());
        }
    }

    /** Initiates the magician's attack action, animating the attack sprite and casting lightning after a delay. */
    attack() {
        if (!this.isJumping && this.mana >= 20) {
            const castDelay = 700;
            const castFrame = 7;
            this.isChargingAttack = true;
            this.stopMoving();
            this.animate(this.attackSprite, castDelay / castFrame);
            this.attackChargeTimeout = setTimeout(() => {
                this.isChargingAttack && this.castLightning()
            }, castDelay);
        }
    }

    /** Casts a lightning bolt, reducing the magician's mana by 20. */
    castLightning() {
        this.updateMana(-20);
        const lightning = new Lightning(this.x, this.direction);
        world.lightnings.push(lightning);
        this.audioLighning.play();
        this.audioLighning.volume = 0.8;
        this.audioLighning.playbackRate = 7;
        setTimeout(() => {
            this.currentSprite == this.attackSprite && this.resetAnimation()
        }, 200);
    }

    /** Resets the magician's attack charge state and clears the attack timeout. */
    resetAttackCharge() {
        this.isChargingAttack = false;
        clearTimeout(this.attackChargeTimeout);
    }

    sleep() {
        //TODO:
    }

    dies() {
        this.stopMoving();
        this.animate(this.deadSprite, 300);
        keyboard.keyboardBlock = true;
    }

    /** Returns the hitbox of the Magician, a rectangle representing the area that can collide with other objects. */
    getHitbox() {
        return new Hitbox(this.x + this.width / 3, this.y + this.height / 2, this.width / 4, this.height / 2)
    }

    /** Updates the magician's health by the specified percentage, handling death and hurt states. */
    updateHealth(percent, disableRepeatedHurt = false) {
        this.health += percent;
        if (this.health > 100) this.health = 100;
        if (this.health <= 0) this.dies();
        if (this.health > 0 && percent < 0 && !disableRepeatedHurt) this.hurt();
        if (percent < 0) this.audioHurtSpritesheet.playRandomSound();
        updateStatusBar('healthbar', this.health)
    }

    /** Handles the magician's hurt state, stopping movement, resetting attack charge, and animating the hurt sprite. */
    hurt() {
        this.stopMoving();
        this.resetAttackCharge();
        keyboard.keyboardBlock = true;
        this.animate(this.hurtSprite, 50);
        setTimeout(() => {
            this.animationBlocker = false;
            keyboard.keyboardBlock = false;
            keyboard.keyAction();
        }, 500)
    }

    /** Updates the magician's mana by the specified percentage, capping at 100. */
    updateMana(percent) {
        this.mana += percent;
        if (this.mana > 100) this.mana = 100;
        updateStatusBar('manabar', this.mana)
    }

    /** Updates the magician's progress by the specified percentage. */
    gainProgress(percent) {
        this.progress += percent;
        updateStatusBar('progressbar', this.progress);
        if (this.progress == 100) world.summonBoss()

    }

    /** Mutes or unmutes all magician audio. */
    muteAllMagicianAudio(mute = true) {
        this.audioFootsteps.forEach(audio => audio.muted = mute);
        this.audioJumpSpritesheet.audioSheet.muted = mute;
        this.audioHurtSpritesheet.audioSheet.muted = mute;
        this.audioLighning.muted = mute
    }

    godmode() {
        this.health = 50;
        this.mana = 50;
        updateStatusBar('healthbar', this.health);
        updateStatusBar('manabar', this.mana);
        requestAnimationFrame(() => this.godmode())
    }
}