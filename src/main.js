import {k} from "./kaboom.js"
import {initPlayer} from "./player.js"
import {levels, levelData} from "./levels.js"
//change

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

let checkpoint = "tutorial"

//time
let gameTime = 0; 

//-------------------------------FUNCTIONS---------------------------------
function playerEvents(p){
    p.onCollide("danger", ()=>{
        destroy(p)
        playerRespawn(checkpoint)
    })
    p.onExitView(()=>{
        if(p.pos.y > height()){
         playerRespawn(checkpoint)
        }
        else if(p.pos.x > width() || p.pos.x < -10){
            playerRespawn(checkpoint)
        }
    })
    onKeyPress('space', () => {
        if (p.isGrounded()) {
          isJumping = true;
          p.jump();
        }
    })
}

function addTimer(){
    return[
        text('0'),
        pos(width() - 100, 25),
        scale(2),
        layer("ui"),
        {
            time: gameTime,
            
            
        },
    ]
}
function beginTimer(t){
    t.onUpdate(()=>{
        t.time += dt();
        t.text = t.time.toFixed(2);
    });
}

function playerRespawn(level){
    go(level)
    
}


//--------------------------------------------------LEVELS----------------------------------
//intro
 

scene("tutorial", () => {
    console.log("scene loading started")
    
    layers(["bg", "game", "ui",], "game")

    //-----------------------player------------------
    let player = add(initPlayer(100, 100, playerSpeed));

    //--------remember to add this----------
    playerEvents(player);
    
    //timer
    
   let timer = add(addTimer());
   beginTimer(timer);
   
  

    //level
    const level = addLevel(levels.tutorial, levelData);
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
    
    //--------------LEVEL_END--------------
    player.onCollide("goal", ()=> {
        console.log("goin to next level");
        gameTime = timer.time;
        go("level_1");
    })

});

//lev1
scene("level_1", () => {
    console.log("scene loading started")
    
    layers(["bg", "game", "ui",], "game")

    //set checkpoint if needed 
    
    //timer
    let timer = add(addTimer());
    beginTimer(timer);

    //player
    let player = add(initPlayer(100, (height()-128), playerSpeed));
    console.log("loaded player");
    checkpoint = "level_1";
    playerEvents(player);
    
    

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
        console.log("this logs right after level 2")
    })
    


});

//level 2
scene("level_2", () => {
    console.log("level loaded")
    //layers(["bg", "game", "ui",], "game")

    //player
    let player = add(initPlayer(64, 64, playerSpeed));
    playerEvents(player);

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
        
        go("level_3")
    })



});

//level 3
scene("level_3", () => {
    
    //layers(["bg", "game", "ui",], "game")
    checkpoint = "level_3";

    //player
    let player = add(initPlayer(0, height() - 98, playerSpeed));
    playerEvents(player)
    console.log("loaded player");
    
    

    //level
    let level = addLevel(levels.lev3, levelData);
    
 

    onCollide("player", "goal", () => {
        console.log("goin to next level");
        go("level_4")
    })



});

scene("level_4", ()=> {
    let player = add(initPlayer(0, height() - 98, playerSpeed));
    playerEvents(player)

    addLevel(levels.lev4, levelData);

    onCollide("player", "goal", () => {
        console.log("goin to next level");
        go("win")
    })
})

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

