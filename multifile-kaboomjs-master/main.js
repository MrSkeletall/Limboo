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



const playerSpeed = 500;
let isJumping = false;

const JUMP_FORCE = 900;
let CURRENT_JUMP_FORCE = JUMP_FORCE

 

/*let player = add(initPlayer(100, 100));

onLoad(() => {
    setPlayerCtrl(player, playerSpeed);
    initStateMachine(player);
})*/






scene("tutorial", () => {
    console.log("scene loading started")
    
    layers(["bg", "game", "ui",], "game")

    //player
    let player = add(initPlayer(100, 100));
    console.log("loaded player");
    setPlayerCtrl(player, playerSpeed);
    initStateMachine(player);

    //level
    let level = addLevel(levels.tutorial, levelData);
    console.log("loaded level");
    
    

    onCollide("player", "goal", () => {
        console.log("goin to next level");
    })



});

go("tutorial");

