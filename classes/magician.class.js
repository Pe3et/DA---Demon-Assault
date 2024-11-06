class Magician extends MovableObject{
    width = 128;
    height = 128;
    x = 120;
    y = 100;
    sWidth = 128;
    world;
    speed = 2;
    idleSprite = new SpriteSheet('assets/sprites/wanderer_magician/Idle.png', 896, 128);
    walkSprite = new SpriteSheet('assets/sprites/wanderer_magician/Walk.png', 896, 128);

    constructor(){
        super().loadImage('assets/sprites/wanderer_magician/Idle.png');
        this.idle();
    }

    idle(){
        clearInterval(this.movingInterval);
        this.animate(this.idleSprite);
    }

    walk(direction) {
        this.animate(this.walkSprite);
        direction == 'right' ? this.moveRight() : this.moveLeft();
    }
    
    jump(){

    }

    sleep(){

    }
}