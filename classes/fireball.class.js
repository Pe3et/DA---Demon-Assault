class Fireball extends Projectile {
    img = new Image()
    x = world.boss.x
    y = 180
    width = 48
    height = 32
    speed = 6.66
    direction = 'left'

    constructor() {
        super();
        this.img.src = 'assets/sprites/demon_boss/projectile.png';
        this.travel()
    }

    getHitbox() {
        return new Hitbox(this.x, this.y + this.height/4, this.width, this.height/2)
    }
}