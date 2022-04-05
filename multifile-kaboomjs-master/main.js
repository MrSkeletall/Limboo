import {k} from "./kaboom.js"

k.loadSprite("tempHuman", "../sprites/tempPlayerHuman.png")
k.loadSprite("tempGhost", "../sprites/tempPlayerGhost.png")

let currentSprite = "tempHuman"

const playerSpeed = 500;

let player = k.add([
    k.sprite(currentSprite),
    //k.color(255, 0, 0),
    k.pos(100, 100),
    k.area(),
    k.body(),
    k.state("human", ["human", "ghost"])

]);

//player movement
k.onKeyDown("d", () => {
    player.move(playerSpeed, 0);
})

k.onKeyDown("a", () => {
    player.move(-playerSpeed, 0);
})

k.onKeyPress("space", () => {
    player.jump();
})

k.onKeyPress("j", () => {
    if(player.state == "human"){
        player.enterState("ghost");
    }
    if(player.state == "ghost"){
       player.enterState("human");
    }
})

//state machine
player.onStateEnter("ghost", () => {
    //for some god forsaken reason, ya cant change the sprite...
    player.sprite = player.sprite("tempGhost");
})


//platforms for testing, 
k.add([
    k.rect(k.width(), 48),
    k.pos(0, k.height() - 48),
    k.outline(4),
    k.area(),
    k.solid(),
    k.color(200, 100, 255),
])

k.add([
    k.rect(48, k.height()),
    k.pos(300, 0),
    k.outline(4),
    k.area(),
    k.solid(),
    k.color(127, 200, 255),
    "ghostBlock",

])