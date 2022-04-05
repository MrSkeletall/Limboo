import {k} from "./kaboom.js"

// loadSprite("tempHuman", "../sprites/tempPlayerHuman.png")
// loadSprite("tempGhost", "../sprites/tempPlayerGhost.png")
 //loadSprite("tempPlayer", "../sprites/tempPlayer.png");

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


const playerSpeed = 500;

let player =  add([
    //to change sprite I made an image with both sprites and it changes it as an "animation"
     sprite("tempPlayer", {
        anim: "human",

    }),

    //other components
     pos(100, 100),
     area(),
     body(),
     state("human", ["human", "ghost"])

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

 onKeyPress("j", () => {
    player.enterState("ghost");
});

onKeyPress("h", () => {
    player.enterState("human");
})

//state machine
player.onStateEnter("ghost", () => {
    //player.play("ghost");

})

player.onStateUpdate("human", () => {
    player.play("human")
})

player.onStateUpdate("ghost", () => {
    player.play("ghost");
})


//platforms for testing, 
add([
    rect( width(), 48),
    pos(0,  height() - 48),
     outline(4),
     area(),
     solid(),
     color(200, 100, 255),
])

 add([
     rect(48,  height()),
     pos(300, 0),
     outline(4),
     area(),
     solid(),
     color(127, 200, 255),
    "ghostBlock",

])