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



const playerSpeed = 500;
let isJumping = false;

const JUMP_FORCE = 900;
let CURRENT_JUMP_FORCE = JUMP_FORCE

 

let player = add(initPlayer(100, 100));

onLoad(() => {
    setPlayerCtrl(player, playerSpeed);
    initStateMachine(player);
})





//the add level function takes in an array of strings, and an object that has kaboom components
let level = addLevel(levels.level_1, levelData);
