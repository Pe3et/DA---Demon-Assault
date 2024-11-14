let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

window.addEventListener('keydown', (e) => {
    if(e.code == 'ArrowUp' || e.code == 'KeyW') keyboard.keyPressed('UP');
    if(e.code == 'ArrowRight' || e.code == 'KeyD') keyboard.keyPressed('RIGHT');
    if(e.code == 'ArrowDown' || e.code == 'KeyS') keyboard.DOWN = true;
    if(e.code == 'ArrowLeft' || e.code == 'KeyA') keyboard.keyPressed('LEFT');
    if(e.code == 'Space') keyboard.keyPressed('SPACE');
});

window.addEventListener('keyup', (e) => {
    if(e.code == 'ArrowUp' || e.code == 'KeyW') keyboard.UP = false;
    if(e.code == 'ArrowRight' || e.code == 'KeyD') keyboard.keyReleased('RIGHT');
    if(e.code == 'ArrowDown' || e.code == 'KeyS') keyboard.DOWN = false;
    if(e.code == 'ArrowLeft' || e.code == 'KeyA') keyboard.keyReleased('LEFT');
    if(e.code == 'Space') keyboard.keyReleased('SPACE');
});


/** Updates the referenced status bar's innerBar witdh to the given percent value. */
function updateStatusBar(refID, percent) {
    const barRef = document.getElementById(refID);
    barRef.querySelector('.innerbar').style.width = `${percent}%`
}