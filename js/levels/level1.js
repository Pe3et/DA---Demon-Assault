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

const enemies = [
    new Zombie(1700),
    new Zombie(1800)
];

const endPosX = 1920;
const level1 = new Level(backgroundObjects, enemies, endPosX);