class Magician extends MovableObject{
    startPosition = 120;
    width = 128;
    height = 128;
    x = this.startPosition;
    y = 100;
    sWidth = 128;
    world;
    speed = 10;
    direction = 'right';
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
        if(direction == 'right') this.moveRight(true);
        if(direction == 'left') this.moveLeft(true);
        this.direction = direction;
    }
    
    jump(){

    }

    sleep(){

    }
}