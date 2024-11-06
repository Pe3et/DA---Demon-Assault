class Magician extends MovableObject{
    width = 128;
    height = 128;
    x = 120;
    sX = 0;
    sY = 0;
    idleSprite = 'assets/sprites/wanderer_magician/Idle.png';
    walkSprite = 'assets/sprites/wanderer_magician/Walk.png';

    constructor(){
        super().loadImage('assets/sprites/wanderer_magician/Idle.png');
        this.idle();
    }

    idle(){
        setInterval( () => {
            this.sX != 896 ? this.sX += 128 : this.sX = 0; 
        }, 1000 / 6);
    }
    
    jump(){

    }

    sleep(){

    }
}