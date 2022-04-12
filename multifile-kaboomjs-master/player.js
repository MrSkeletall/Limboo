

export function initPlayer(xPos, yPos){
return [

     sprite("tempPlayer", {anim: "human",}),
     pos(xPos, yPos),
     area(),
     body(),
     state("human", ["human", "ghost"]),
]

}

export function setPlayerCtrl(p, speed){
    
onKeyDown("d", () => {
    p.move(speed, 0);
})

 onKeyDown("a", () => {
    p.move(-speed, 0);
})

 onKeyPress("space", () => {
    p.jump();
})

 onKeyPress("j", () => {
    p.enterState("ghost");
});

onKeyPress("h", () => {
    p.enterState("human");
})
}

export function initStateMachine(p){
    p.onStateEnter("ghost", () => {
    
        every("ghostBlock", (b) => {
            b.solid = false;
        });
        every("humanBlock", (b) => {
            b.solid = true;
        });
    })
    
    p.onStateEnter("human", () => {
        every("ghostBlock", (b) => {
            b.solid = true;
        });
        every("humanBlock", (b) => {
            b.solid = false;
        });
    
    });
    
    //these run constantly when the player is in the stae
    p.onStateUpdate("human", () => {
        p.play("human")
    });
    
    p.onStateUpdate("ghost", () => {
        p.play("ghost");
    });
}
