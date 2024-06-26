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

loadAseprite("player", "../sprites/playerVerOne.png", "../sprites/playerVerOne.json")

loadSprite("grimReaper", "../sprites/grimReaper.png");
loadSprite("ground", "../sprites/styleGrass.png");
loadSprite("ghostBrick", "../sprites/styleGhostBrick.png");
loadSprite("brick", "../sprites/styleBrick.png");
loadSprite("flag", "../sprites/flag.png");
loadSprite("impasBrick", "../sprites/styleImpassBrick.png");
loadSound("soundtrack", "../sprites/limboMusic.mp3");
loadSprite("bck", "../sprites/redBackground.jpg");


loadSprite("hospital", "../sprites/hospital.jpg");
loadSound("ekg", "../sprites/ekg-sounds.mp3");
loadSprite("sunrise", "../sprites/sunrisehospital.jpg");

//player vars
const playerSpeed = 430;
let isJumping = false;

const JUMP_FORCE = 900;
let CURRENT_JUMP_FORCE = JUMP_FORCE

let checkpoint = "tutorial"

//time
let gameTime = 0;
 

//-------------------------------FUNCTIONS---------------------------------
function playerEvents(p, t){
    p.onCollide("danger", ()=>{
        gameTime = t.time
        destroy(p),
        
        go("lose")

    })
    p.onExitView(()=>{
        gameTime = t.time;
        if(p.pos.y > height()){
            destroy(p),
            
            
           
            go("lose");        }
        else if(p.pos.x > width() || p.pos.x < -10){
            destroy(p),
            
            
            go("lose");        }
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
        "timer",
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
//title
scene("title", () => {
    
    add([
        pos(200, 32),
        text("Limboo!", {
            size:80,
            width: 1000, 
        })

        

    ])
    add([
        pos(200, 200),
        text("A game by Will Douglas and Mateo Mijares", {
            size:50,
            width: 800, 
        })

        

    ])  
    let start = add([
        pos(200, 400),
        color(255, 0, 0),
        area(),
        "start",
        text("START", {
            
            size:120,
            width: 1000,
            
        })

        

    ])   
    onClick("start", (start) => go("intro"))                                    
});
//intro
scene("intro", () => {
    let inputPromptShown = false;

    onKeyDown("s", ()=>{

        if(inputPromptShown == false){
            play("soundtrack", {
                volume: 0.8,
                loop: true
            })
        };

        go("tutorial");
        ekg.pause();
        
        
       
    
    })
    
const ekg = play("ekg", {
volume: 0.8,
}) 
  let hospImage = add([
        layer("hospital"),
        pos(0,0),
        opacity(0.3),
        sprite("hospital"),
        
        shake(200),
        
        sprite("hospital"),

        

    ])
    wait(2, () => {
        add([
            pos(10, height() - 100),
            text("Press S to skip.", {
                size:20,
                width: 1000, 
            })

            
    
        ])
                           
        
        add([
            pos(0, 32),
            text("Well, it appears you've been in a car crash. The doctors say you're almost dead, but not quite.", {
                size:30,
                width: 1000, 
            })

            
    
        ])
        wait(3, () => {
  
            add([
                pos(0, 150),
                text("In fact, you seem to be in a state of", {
                    width: 1000, 
        
                    size:40,
                })
        
            ])
            wait(4, () => { 
                ekg.pause();
                const music = play("soundtrack", {
                    volume: 0.8,
                    loop: true
                })
                
                add([
                    pos(60, 300),
                    text("Limbo", {
                        width: 1000, 
            
                        size:80,
                    })
            
                ])
                wait(1, () => { 

                    inputPromptShown = true;
                    add([
                        pos(60, 500),
                        text("Press any key to begin", {
                            width: 1000, 
                
                            size:30,
                        })
                
                    ])  
                    onKeyPress(() => {
                        go("tutorial")
                    })                                 
                    
                })
            })

        })
    })                                           
});


scene("tutorial", () => {
    console.log("scene loading started")
    add([
        layer("bg"),
        pos(0,0),
        sprite("bck")
       
    ])
   

    layers(["bg", "game", "ui",], "game")

    //-----------------------player------------------
    let player = add(initPlayer(100, 100, playerSpeed));
    
    //timer
    let timer = add(addTimer());
    beginTimer(timer);

    //--------remember to add this----------
    playerEvents(player, timer);
    
  

    //level
    const level = addLevel(levels.tutorial, levelData);
    console.log("loaded level");
    
    //text
    add([
        pos(1),
        
        text("Welcome to the  g a m e \n Heres some controls: \n Move: [A & D].pulse\n Jump: [Space].pulse      \n Shift States: [J].pulse", {
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
        text("If you want to survive, you'll have to walk the line between life and death to make it through to the other side. But it appears there's an obstacle in your way...", {
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
    playerEvents(player, timer);
    
    

    //level
    let level = addLevel(levels.lev1, levelData);
    
    add([
        layer("bg"),
        pos(0,0),
        sprite("bck")
       
    ])
    console.log("loaded level");
    //------------------additional_Jargon_If_needed
    
    add([
        pos(1),
        text("Well... it seems you got past the wall \n Heres another one. \ntake care not to fall \nWatch out! If you move offscreen without touching the flag, you'll die...", {
            size:20,
            width: 1000, 

        })
    ]);
    
    //-----------------------LEVEL_END------------------//
    onCollide("player", "goal", () => {
        console.log("goin to next level");
        go("level_2")
        console.log("this logs right after level 2")
    })
    
    


});

//level 2
scene("level_2", () => {
    console.log("level loaded")
    add([
        layer("bg"),
        pos(0,0),
        sprite("bck")
       
    ])
   

    layers(["bg", "game", "ui",], "game")
    checkpoint = "level_2";

    //timer
    let timer = add(addTimer());
    beginTimer(timer);

    //player
    let player = add(initPlayer(64, 64, playerSpeed));
    playerEvents(player, timer);

    //level
    
    let level = addLevel(levels.lev2, levelData);
    
    //text
    add([
        pos(16, 32),
        text("Now things are getting a bit more challenging. The grim reapers here want to take you to be dead forever. You'll have to shift quickly to maneuver around them...", {
            size:14,
            width: width()/2 - 64,
        })
    ])

    onCollide("player", "goal", () => {
        gameTime = timer.time;
        go("level_3")
    })



});

//level 3
scene("level_3", () => {
    
    add([
        layer("bg"),
        pos(0,0),
        sprite("bck")
       
    ])
   

    layers(["bg", "game", "ui",], "game")
    checkpoint = "level_3";

    //player
    let player = add(initPlayer(0, height() - 98, playerSpeed));
    console.log("loaded player");
    
    //timer
    let timer = add(addTimer());
    beginTimer(timer);
    playerEvents(player, timer);

    //level
    let level = addLevel(levels.lev3, levelData);
    
 

    onCollide("player", "goal", () => {
        console.log("goin to next level");
        gameTime = timer.time;
        go("level_4");
    })



});

scene("level_4", ()=> {
    add([
        layer("bg"),
        pos(0,0),
        sprite("bck")
       
    ])
   

    layers(["bg", "game", "ui",], "game")
    checkpoint = "level_4";

    //timer
    let timer = add(addTimer());
    beginTimer(timer);

    let player = add(initPlayer(32, height() - 98, playerSpeed));
    playerEvents(player, timer)

    addLevel(levels.lev4, levelData);

    

    onCollide("player", "goal", () => {
        gameTime = timer.time;
        console.log("goin to next level");
        go("level_5")
    })
})
scene("level_5", ()=> {
    add([
        layer("bg"),
        pos(0,0),
        sprite("bck")
       
    ])
   

    layers(["bg", "game", "ui",], "game")
    checkpoint = "level_5";

    //timer
    let timer = add(addTimer());
    beginTimer(timer);

    let player = add(initPlayer(98, 0, playerSpeed));
    playerEvents(player, timer)

    addLevel(levels.lev5, levelData);

    add([
        text("im sorry about this one \n we needed something to fit the theme \"Bad Luck\""),
        pos(width()/2, 10),
        layer("ui"),
        origin("center"),
        
    ])

    

    onCollide("player", "goal", () => {
        gameTime = timer.time;
        console.log("goin to next level");
        go("pillars")
    })
})

//loose 
scene("lose", ()=> {
   
    add([
        layer("bg"),
        pos(0,0),
        sprite("bck")
       
    ])
   

    layers(["bg", "game", "ui",], "game")

    add([
        origin("center"),
        pos(width()/2, height()/2),
        text("you died", {
            size:40,
        })
    ])
    add([
        origin("center"),
        pos(width()/2, height()/1.5),
    
        text("click any key to restart", {
            size:20,
        })  
    ])
    onKeyPress(() => {
        playerRespawn(checkpoint);
    })
})

//"win"
scene("win", ()=> {
    add([
        layer("bg"),
        scale(.5),
        pos(0,0),
        sprite("sunrise")
       
    ])
   

    layers(["bg", "game", "ui",], "game")

    add([
        origin("center"),
        pos(width()/2, 180),
        text("YOU WIN!", {
            size:80,
            width: width(),
        })
    ])
    add([
        origin("center"),
        pos(width()/2, height()/2),
        text("Your time is: " + gameTime.toFixed(2), {
            size:40,
            width: width(),
        })
    ])

    add([
        origin("center"),
        pos(width()/2, height()-180),
        text("press any key to play again", {
            size:20,
            width: width(),
        })
    ])

    wait(2, () => {
  
    onKeyPress(() => {
        gameTime = 0;
        go("tutorial")
    })
}) })

scene("pillars", () => {
    console.log("scene loading started")

    //drawing layers
    layers(["bg", "game", "ui",], "game")

    //set checkpoint if needed 
    //checkpoint = wherever ya want to go on death

    //timer init
    let timer = add(addTimer());
    beginTimer(timer);

    //player init
    let player = add(initPlayer(64, height() - 96, playerSpeed));
    console.log("loaded player");
    playerEvents(player, timer);
    
    
    checkpoint = "pillars"
    //level
    let level = addLevel(levels.pillars, levelData);
    //background
    add([
        layer("bg"),
        pos(0,0),
        sprite("bck")
       
    ])
    console.log("loaded level");
    //------------------additional_Jargon_If_needed (text, pictures ect)-------------------
    
  
    
    //-----------------------LEVEL_END------------------//
    onCollide("player", "goal", () => {
        console.log("goin to next level");
        go("level_6")
    })
    
    

});
scene("level_6", () => {
    console.log("scene loading started")

    //drawing layers
    layers(["bg", "game", "ui",], "game")

    //set checkpoint if needed 
    //checkpoint = wherever ya want to go on death

    //timer init
    let timer = add(addTimer());
    beginTimer(timer);

    //player init
    let player = add(initPlayer(64, height() - 129, playerSpeed));
    console.log("loaded player");
    playerEvents(player, timer);
    
    
    checkpoint = "level_6"
    //level
    let level = addLevel(levels.lev6, levelData);
    //background
    add([
        layer("bg"),
        pos(0,0),
        sprite("bck")
       
    ])
    console.log("loaded level");
    //------------------additional_Jargon_If_needed (text, pictures ect)-------------------
    
  
    
    //-----------------------LEVEL_END------------------//
    onCollide("player", "goal", () => {
        console.log("goin to next level");
        gameTime = timer.time;
        go("win");
    })
    
    

});

go("title");


