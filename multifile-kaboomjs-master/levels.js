loadSprite("ground", "../sprites/ground.png");
loadSprite("ghostBrick", "../sprites/ghostBrick.png");
loadSprite("brick", "../stoneBrick.png");

 

export let levels = {
    level_1: [
        "          w        ",
        "          w        ",
        "          w        ",
        "          w        ",
        "          w        ",
        "          w        ",
        "==================",
    ],
}


export let levelData = {
    width:32,
    height:32,
    "=": () => [
        sprite("ground"),
        area(),
        solid(),
        "ground",

    ],
    "w": () => [
        sprite("brick"),
        area(),
        solid(),
        "humanBlock",

    ],
    "g":() => [
        sprite("ghostBrick"),
        area(),
        solid(),
        "ghostBlock",
    ],
}