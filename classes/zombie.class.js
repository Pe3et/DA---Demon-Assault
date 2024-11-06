class Zombie extends MovableObject{
    width = 128;
    height = 128;
    y = 132;
    speed = 0.5 + Math.random(0.5);
    runningThreshhold = 0.9;
    sWidth = 96;
    walkSprite = new SpriteSheet('assets/sprites/zombies/Zombie Man/Walk.png', 768, 96);
    runSprite = new SpriteSheet('assets/sprites/zombies/Zombie Man/Run.png', 672, 96);

    constructor(x){
        super(x);
        super.loadImage('assets/sprites/zombies/Zombie Man/Walk.png');
        this.speed > this.runningThreshhold ? this.run() : this.walk();
    }

    walk() {
        this.animate(this.walkSprite);
        this.moveLeft();
    }

    run() {
        this.animate(this.runSprite);
        this.moveLeft();
    }

}