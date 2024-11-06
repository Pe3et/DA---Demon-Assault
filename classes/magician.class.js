class Magician extends MovableObject{
    width = 128;
    height = 128;
    x = 120;
    y = 100;
    sWidth = 128;
    idleSprite = new SpriteSheet('assets/sprites/wanderer_magician/Idle.png', 896, 128);
    walkSprite = new SpriteSheet('assets/sprites/wanderer_magician/Walk.png', 896, 128);

    constructor(){
        super().loadImage('assets/sprites/wanderer_magician/Idle.png');
        this.idle();
    }

    idle(){
        this.animate(this.idleSprite);
    }

    walk() {

    }
    
    jump(){

    }

    sleep(){

    }
}