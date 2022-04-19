import {k} from "./kaboom.js"
import {initPlayer, setPlayerCtrl, initStateMachine} from "./player.js"
import {levels, levelData} from "./levels.js"


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
loadSprite("grimReaper", "../sprites/grimReaper.png");
loadSprite("ground", "../sprites/ground.png");
loadSprite("ghostBrick", "../sprites/ghostBrick.png");
loadSprite("brick", "../sprites/stoneBrick.png");
loadSprite("flag", "../sprites/flag.png");
loadSprite("impasBrick", "../sprites/impasBrick.png")


//player vars
const playerSpeed = 500;
let isJumping = false;

const JUMP_FORCE = 900;
let CURRENT_JUMP_FORCE = JUMP_FORCE

//-------------------------------FUNCTIONS---------------------------------
/*function initPlayerObj(){
    player = add(initPlayer(100, 100));
    setPlayerCtrl(player, playerSpeed);
    initStateMachine(player);
    onKeyPress('space', () => {
        if (player.isGrounded()) {
          isJumping = true
          player.jump()
        }
    })
    return player;
}*/


//--------------------------------------------------LEVELS----------------------------------
//intro
 

scene("tutorial", () => {
    console.log("scene loading started")
    
    layers(["bg", "game", "ui",], "game")

    //player
    let player = add(initPlayer(100, 100, playerSpeed));

    onKeyPress('space', () => {
        if (player.isGrounded()) {
          isJumping = true
          player.jump()
        }
    })
    
    //this is here because I got lazy
   

    //level
    let level = addLevel(levels.tutorial, levelData);
    console.log("loaded level");
    
    //text
    add([
        pos(1),
        
        text("Welcome to the  g a m e \n Heres some controls: \n Move: [A & D].pulse\n Jump: [Space].pulse      \n Shift States: [J & K].pulse", {
            size: 20,

            styles: {
                "pulse": () => ({
                    color: hsl2rgb(0.1, 1, wave(0.5, 0.7, time())),
                    pos: vec2(0, wave(-2, 2, time() * 6 * 0.5)),
                })
            }
        }),

        
    ])

    add([
        pos(vec2(width()/2 + 200 , height() /2 - 200)),
        text("At the moment, All ya gotta do is get to that flag but it seems theres a comically tall wall in the way", {
            size:18,
            width: width()/4
        })
    ])
    

    player.onCollide("goal", ()=> {
        console.log("goin to next level");
        go("level_1");
    })




});

//lev1
scene("level_1", () => {
    console.log("scene loading started")
    
    layers(["bg", "game", "ui",], "game")

    //player
    let player = add(initPlayer(100, (height()-128)));
    console.log("loaded player");
    setPlayerCtrl(player, playerSpeed);
    initStateMachine(player);

    onKeyPress('space', () => {
        if (player.isGrounded()) {
          isJumping = true
          player.jump()
        }
      })

    //level
    let level = addLevel(levels.lev1, levelData);
    console.log("loaded level");
    
    add([
        pos(1),
        text("Well... it seems ya got past the wall \n Heres another one. \ntake care not to fall", {
            size:20,
        })
    ]);
    

    onCollide("player", "goal", () => {
        console.log("goin to next level");
        go("level_2")
    })



});

//level 2
scene("level_2", () => {
    
    layers(["bg", "game", "ui",], "game")

    //player
    let player = add(initPlayer(64, 64));
    console.log("loaded player");
    setPlayerCtrl(player, playerSpeed);
    initStateMachine(player);

    onKeyPress('space', () => {
        if (player.isGrounded()) {
          isJumping = true
          player.jump()
        }
      })

    //level
    let level = addLevel(levels.lev2, levelData);
    
    //text
    add([
        pos(16, 32),
        text("now, ya can't just waltz through every block like that If ya get what I mean.", {
            size:14,
            width: width()/2 - 64,
        })
    ])

    onCollide("player", "goal", () => {
        console.log("goin to next level");
        go("win")
    })



});


//loose 
scene("lose", ()=> {
    add([
        origin("center"),
        pos(width()/2, height()/2),
        text("you died", {
            size:40,
        })
    ])
    onKeyPress(() => {
        go("tutorial")
    })
})

//"win"
scene("win", ()=> {
    add([
        origin("center"),
        pos(width()/2, height()/2),
        text("congrats, ya did it, the game is done... although it's not finished", {
            size:40,
            width: width(),
        })
    ])
    onKeyPress(() => {
        go("tutorial")
    })
})

go("tutorial");

