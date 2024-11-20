const backgroundObjects = [
    new BackgroundObject('assets/sprites/battleground/sky.png'),
    new BackgroundObject('assets/sprites/battleground/graves.png'),
    new BackgroundObject('assets/sprites/battleground/back_trees.png'),
    new BackgroundObject('assets/sprites/battleground/wall.png', 0, 25),
    new BackgroundObject('assets/sprites/battleground/ground.png', 0, 88),
    new BackgroundObject('assets/sprites/battleground/bones.png', 0, 70),
    new BackgroundObject('assets/sprites/battleground/crypt.png', -90, 85),

    new BackgroundObject('assets/sprites/battleground/sky.png', 639),
    new BackgroundObject('assets/sprites/battleground/graves.png', 639),
    new BackgroundObject('assets/sprites/battleground/back_trees.png', 639),
    new BackgroundObject('assets/sprites/battleground/wall.png', 639, 25),
    new BackgroundObject('assets/sprites/battleground/ground.png', 639, 88),
    new BackgroundObject('assets/sprites/battleground/bones.png', 639, 70),

    new BackgroundObject('assets/sprites/battleground/sky.png', 1279),
    new BackgroundObject('assets/sprites/battleground/graves.png', 1279),
    new BackgroundObject('assets/sprites/battleground/back_trees.png', 1279),
    new BackgroundObject('assets/sprites/battleground/wall.png', 1279, 25),
    new BackgroundObject('assets/sprites/battleground/tree.png', 1070, -30, 1000, 700),
    new BackgroundObject('assets/sprites/battleground/ground.png', 1279, 88),
    new BackgroundObject('assets/sprites/battleground/bones.png', 1279, 70),
    
    new BackgroundObject('assets/sprites/battleground/sky.png', 1919),
    new BackgroundObject('assets/sprites/battleground/graves.png', 1919),
    new BackgroundObject('assets/sprites/battleground/back_trees.png', 1919),
];

let enemies = [];
const endPosX = 1920;
let level1;

/** Initializes the game level by resetting enemies and creating a new level instance. */
function initLevel() {
    resetEnemies();
    level1 = new Level(backgroundObjects, enemies, endPosX)
}

/** Resets the game level by reinitializing enemies and creating a new level instance. */
function resetLevel() {
    resetEnemies()
    world.level = new Level(backgroundObjects, enemies, endPosX);
}

/** Resets the enemies array with a new set of enemies. */
function resetEnemies() {
    enemies = [
        new Zombie(1700),
        new Zombie(1800)
    ];
}