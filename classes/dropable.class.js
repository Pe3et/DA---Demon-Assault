class Dropable {
    dropchances = {
        heart: 20,
        mana: 40,
        progress: 100
    }
    x
    y = 190
    width = 50
    height = 50
    type
    img

    constructor(x) {
        this.x = x;
        this.type = this.getRandomType();
        this.img = new Image();
        this.img.src = this.type.imgSrc;
        world.dropables.push(this);
    }

    /** Returns a random item from simple dropchance-treshholds.
    *   My droptable means 40% progress, 40% mana and 20% heart. 
    */
    getRandomType() {
        const randomizer = Math.random() * 100;
        if (randomizer <= this.dropchances.heart) return { name: 'heart', imgSrc: 'assets/sprites/objects/health_crystal_shiny.png' };
        if (randomizer <= this.dropchances.mana) return { name: 'mana', imgSrc: 'assets/sprites/objects/lightning_crystal_shiny.png' };
        if (randomizer <= this.dropchances.progress) return { name: 'progress', imgSrc: 'assets/sprites/objects/dark_crystal_shiny.png' };
    }

    /** Performs an action if item is collected.
    *   The heart give health back, mana crystals give mana and progress crystals give progress.
    */
    isCollected() {
        switch (this.type.name) {
            case 'heart':
                world.magician.takeDamage(-20);
                break;
            case 'mana':
                world.magician.gainMana(20);
                break;
            case 'progress':
                world.magician.gainProgress(20);
                break;
        }
    }

    getHitbox() {
        return new Hitbox(this.x + this.width/4, this.y + this.height/4, this.width/2, this.height/2)
    }
}