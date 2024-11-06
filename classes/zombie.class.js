class Zombie extends MovableObject{
    width = 128;
    height = 128;
    y = 132

    constructor(x){
        super(x);
        super.loadImage('assets/sprites/zombies/Zombie Man/Walk.png');
    }

}