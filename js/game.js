let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

window.addEventListener('keydown', (e) => {
    if(e.code == 'ArrowUp' || 'KeyW') keyboard.UP = true;
    if(e.code == 'ArrowRight' || 'KeyD') keyboard.RIGHT = true;
    if(e.code == 'ArrowDown' || 'KeyS') keyboard.DOWN = true;
    if(e.code == 'ArrowLeft' || 'KeyA') keyboard.LEFT = true;
    if(e.code == 'Space') keyboard.SPACE = true;
    console.log(keyboard.UP);
});

window.addEventListener('keyup', (e) => {
    if(e.code == 'ArrowUp' || 'KeyW') keyboard.UP = false;
    if(e.code == 'ArrowRight' || 'KeyD') keyboard.RIGHT = false;
    if(e.code == 'ArrowDown' || 'KeyS') keyboard.DOWN = false;
    if(e.code == 'ArrowLeft' || 'KeyA') keyboard.LEFT = false;
    if(e.code == 'Space') keyboard.SPACE = false;
    console.log(keyboard.UP);
});