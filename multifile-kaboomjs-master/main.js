import {k} from "./kaboom.js"
import {initPlayer, setPlayerCtrl, initStateMachine} from "./player.js"


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


const playerSpeed = 500;
let hasJumped = false;

let player = add(initPlayer(100, 100));

onLoad(() => {
    setPlayerCtrl(player, playerSpeed);
    initStateMachine(player);
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

]);

add([
    rect(48,  height()),
    pos(600, 0),
    outline(4),
    area(),
    solid(),
    color(200, 10, 10),
   "humanBlock",

]);