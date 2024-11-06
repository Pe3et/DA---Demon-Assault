class Zombie extends MovableObject{
    width = 128;
    height = 128;
    y = 132;
    walkSprite = new SpriteSheet('assets/sprites/zombies/Zombie Man/Walk.png', 768, 96);

    constructor(x){
        super(x);
        super.loadImage('assets/sprites/zombies/Zombie Man/Walk.png');
        this.walk();
    }

    walk() {
        this.animate(this.walkSprite);
    }

}