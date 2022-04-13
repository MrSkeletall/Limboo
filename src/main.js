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

loadSprite("ground", "../sprites/ground.png");
loadSprite("ghostBrick", "../sprites/ghostBrick.png");
loadSprite("brick", "../sprites/stoneBrick.png");
loadSprite("flag", "../sprites/flag.png");


//player vars
const playerSpeed = 500;
let isJumping = false;

const JUMP_FORCE = 900;
let CURRENT_JUMP_FORCE = JUMP_FORCE





scene("tutorial", () => {
    console.log("scene loading started")
    
    layers(["bg", "game", "ui",], "game")

    //player
    let player = add(initPlayer(100, 100));
    console.log("loaded player");
    setPlayerCtrl(player, playerSpeed);
    initStateMachine(player);
    //this is here because I got lazy
    onKeyPress('space', () => {
        if (player.isGrounded()) {
          isJumping = true
          player.jump()
        }
      })

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
    })




});

go("tutorial");

