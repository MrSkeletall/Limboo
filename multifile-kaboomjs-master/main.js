import {k} from "./kaboom.js"



//this is the temp player sprite and it's animations
 loadSprite("tempPlayer", "../sprites/tempPlayer.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
        human:{
            from:0,
            to:0,
            loop:true,
        },
        ghost:{
            from:1,
            to:1,
            loop:true,
        },

    },
});

loadSprite("ground", "../sprites/ground.png");
loadSprite("ghostBrick", "../sprites/ghostBrick.png");
loadSprite("brick", "../sprites/stoneBrick.png");



const playerSpeed = 500;
let hasJumped = false;

let player =  add([
    //to change sprite I made an image with both sprites and it changes it as an "animation"
     sprite("tempPlayer", {
        anim: "human",

    }),

    //other components
     pos(100, 100),
     area(),
     body(),
     state("human", ["human", "ghost"]),
     "player",
     

]);

//player movement
 onKeyDown("d", () => {
    player.move(playerSpeed, 0);
})

 onKeyDown("a", () => {
    player.move(-playerSpeed, 0);
})

 onKeyPress("space", () => {

    player.jump();
})


//these change the player state, though I would like to try to get em on one button
 onKeyPress("j", () => {
    player.enterState("ghost");
});

onKeyPress("h", () => {
    player.enterState("human");
})

//state machine

//these run once when the player changes state
player.onStateEnter("ghost", () => {
    
    every("ghostBlock", (b) => {
        b.solid = true;
    });
    every("humanBlock", (b) => {
        b.solid = false;
    });
})

player.onStateEnter("human", () => {
    every("ghostBlock", (b) => {
        b.solid = false;
    });
    every("humanBlock", (b) => {
        b.solid = true;
    });

});

//these run constantly when the player is in the stae
player.onStateUpdate("human", () => {
    player.play("human")
});

player.onStateUpdate("ghost", () => {
    player.play("ghost");
});


//platforms for testing, 
/*add([
    rect( width(), 48),
    pos(0,  height() - 48),
     outline(4),
     area(),
     solid(),
     color(200, 100, 255),
     "ground"
])

 add([
     rect(48,  height()),
     pos(300, 0),
     outline(4),
     area(),
     solid(),
     color(127, 200, 255),
    "ghostBlock",

]);

add([
    rect(48,  height()),
    pos(600, 0),
    outline(4),
    area(),
    solid(),
    color(200, 10, 10),
   "humanBlock",

]);*/



let level1 = addLevel([
    "                   ",
    "                   ",
    "                   ",
    "          w        ",
    "          w        ",
    "          w        ",
    "          w        ",
    "          w        ",
    "          w        ",
    "===================",
], {
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
});