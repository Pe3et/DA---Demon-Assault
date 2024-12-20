class Dropable {
    dropchances = {
        heart: 5,
        mana: 40,
        progress: 75,
    }
    x
    y = 190
    width = 50
    height = 50
    type
    img
    removalFlag = false;

    /** Initializes a new Dropable object with a random type based on drop chances. */
    constructor(x) {
        this.x = x;
        this.type = this.getRandomType();
        if (this.type) {
            this.img = new Image();
            this.img.src = this.type.imgSrc;
            world.dropables.push(this);
        }
    }

    /** Returns a random drop type based on the drop chances. */
    getRandomType() {
        const randomizer = Math.random() * 100;
        if (randomizer <= this.dropchances.heart) return { name: 'heart', imgSrc: 'assets/sprites/objects/health_crystal_shiny.png' };
        if (randomizer <= this.dropchances.mana) return { name: 'mana', imgSrc: 'assets/sprites/objects/lightning_crystal_shiny.png' };
        if (randomizer <= this.dropchances.progress) return { name: 'progress', imgSrc: 'assets/sprites/objects/dark_crystal_shiny.png' };
    }

    /** Performs an action if item is collected, updating magician's health, mana, or progress based on the dropable type. */
    isCollected() {
        switch (this.type.name) {
            case 'heart':
                world.magician.updateHealth(20);
                break;
            case 'mana':
                world.magician.updateMana(20);
                break;
            case 'progress':
                world.magician.gainProgress(20);
                break;
        }
        this.removalFlag = true;
    }

    /** Returns the hitbox of the dropable object. */
    getHitbox() {
        return new Hitbox(this.x + this.width / 4, this.y + this.height / 4, this.width / 2, this.height / 2)
    }
}