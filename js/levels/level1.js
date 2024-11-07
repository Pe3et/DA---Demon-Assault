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
];

const enemies = [
    new Zombie(300),
    new Zombie(400)
];


const level1 = new Level(backgroundObjects, enemies);