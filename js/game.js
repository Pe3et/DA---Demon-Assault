let canvas;
let world;
let keyboard = new Keyboard();
let muteFlag = true;
let music = new Audio('assets/audio/menu_music.ogg');
music.volume = 0.3;
music.loop = true;

/** Initializes the application by setting up event listeners for the go button and mute icon. */
function init() {
    document.getElementById('goButton').addEventListener('click',loadStartMenu);
    document.getElementById('muteIcon').addEventListener('click', () => muteAllAudio(muteFlag));
}

/** Loads the start menu by displaying the game container and hiding the go button, then plays the menu music. */
function loadStartMenu() {
    document.getElementById('gameContainer').classList.remove('d_none');
    document.getElementById('goButton').classList.add('d_none');
    music.play();
}

/** Initializes the game by setting up the main music, canvas, and world, and hiding the start screen. */
function startGame() {
    music.src = 'assets/audio/main_music.ogg';
    music.play();
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    document.getElementById('startScreen').classList.add('d_none');
}

window.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowUp' || e.code == 'KeyW') keyboard.keyPressed('UP');
    if (e.code == 'ArrowRight' || e.code == 'KeyD') keyboard.keyPressed('RIGHT');
    if (e.code == 'ArrowDown' || e.code == 'KeyS') keyboard.DOWN = true;
    if (e.code == 'ArrowLeft' || e.code == 'KeyA') keyboard.keyPressed('LEFT');
    if (e.code == 'Space') keyboard.keyPressed('SPACE');
});

window.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowUp' || e.code == 'KeyW') keyboard.UP = false;
    if (e.code == 'ArrowRight' || e.code == 'KeyD') keyboard.keyReleased('RIGHT');
    if (e.code == 'ArrowDown' || e.code == 'KeyS') keyboard.DOWN = false;
    if (e.code == 'ArrowLeft' || e.code == 'KeyA') keyboard.keyReleased('LEFT');
    if (e.code == 'Space') keyboard.keyReleased('SPACE');
});


/** Updates the referenced status bar's innerBar witdh to the given percent value. */
function updateStatusBar(refID, percent) {
    const barRef = document.getElementById(refID);
    barRef.querySelector('.innerbar').style.width = `${percent}%`
}

/** Mutes or unmutes all audio elements on the page. */
function muteAllAudio(mute = true) {
    if(world) world.muteAllAudio(mute);
    music.muted = mute;
    toggleMuteIcon(mute);
    muteFlag = !muteFlag;
}

/** Toggles the mute icon based on the provided mute status. */
function toggleMuteIcon(mute) {
    const muteIconImgRef = document.getElementById('muteIcon').querySelector('img');
    const iconSrc = mute ? 'assets/sprites/UI/audio_muted.svg' : 'assets/sprites/UI/audio_unmuted.svg';
    muteIconImgRef.src = iconSrc;
}