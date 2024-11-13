class Dropable {
    dropchances = {
        heart: 5,
        progress: 15,
        mana: 35
    }
    x
    y = 190
    width = 50
    height = 50
    type
    img
    removalFlag = false;

    constructor(x) {
        this.x = x;
        this.type = this.getRandomType();
        if(this.type) {
            this.img = new Image();
            this.img.src = this.type.imgSrc;
            world.dropables.push(this);
        }
    }

    getRandomType() {
        const randomizer = Math.random() * 100;
        if (randomizer <= this.dropchances.heart) return { name: 'heart', imgSrc: 'assets/sprites/objects/health_crystal_shiny.png' };
        if (randomizer <= this.dropchances.progress) return { name: 'progress', imgSrc: 'assets/sprites/objects/dark_crystal_shiny.png' };
        if (randomizer <= this.dropchances.mana) return { name: 'mana', imgSrc: 'assets/sprites/objects/lightning_crystal_shiny.png' };
    }

    /** Performs an action if item is collected.
    *   The heart give health back, mana crystals give mana and progress crystals give progress.
    */
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

    getHitbox() {
        return new Hitbox(this.x + this.width/4, this.y + this.height/4, this.width/2, this.height/2)
    }
}