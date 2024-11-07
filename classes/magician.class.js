class Magician extends MovableObject{
    startPosition = 120;
    width = 128;
    height = 128;
    x = this.startPosition;
    y = 100;
    sWidth = 128;
    world;
    speed = 2;
    direction = 'right';
    idleSprite = new SpriteSheet('assets/sprites/wanderer_magician/Idle.png', 896, 128);
    walkSprite = new SpriteSheet('assets/sprites/wanderer_magician/Walk.png', 896, 128);
    jumpSprite = new SpriteSheet('assets/sprites/wanderer_magician/Jump.png', 1024, 128);

    constructor(){
        super().loadImage('assets/sprites/wanderer_magician/Idle.png');
        this.idle();
    }

    idle(){
        this.stopMoving();
        this.animate(this.idleSprite);
    }

    walk(direction) {
        this.animate(this.walkSprite);
        if(direction == 'right') this.moveRight(true);
        if(direction == 'left') this.moveLeft(true);
        this.direction = direction;
    }
    
    jump(){
        this.animate(this.jumpSprite, 1000 / 8, false);
        let jumpfactor = 20;
        let jumpY = [-jumpfactor, -jumpfactor, -jumpfactor, 0, +jumpfactor, +jumpfactor, +jumpfactor, 0];
        let i = 0;
        //TODO:
        let jumpInterval = setInterval(() => {
            this.y += jumpY[i];
            i++;
            if(i == 7) clearInterval(jumpInterval);
        },1000/8)
    }

    sleep(){

    }
}