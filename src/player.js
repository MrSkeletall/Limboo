

export function initPlayer(xPos, yPos){
return [

     sprite("tempPlayer", {anim: "human",}),
     pos(vec2(xPos, yPos)),
     area(),
     body(),
     state("human", ["human", "ghost"]),
     "player",
]

}

function respawn(){
    
    return {
        id:"player",
        //currentLevel: =

    }
}

export function setPlayerCtrl(p, speed){
    
onKeyDown("d", () => {
    p.move(speed, 0);
})

 onKeyDown("a", () => {
    p.move(-speed, 0);
})

 /*onKeyPress("space", () => {
    p.jump(); just lazy rn
})*/

 onKeyPress("j", () => {
    p.enterState("ghost");
});

onKeyPress("k", () => {
    p.enterState("human");
})




}

export function initStateMachine(p){
    p.onStateEnter("ghost", () => {
    
        every("humanBlock", (b) => {
            b.solid = false;
        });
        every("ghostBlock", (b) => {
            b.solid = true;
        });
    })
    
    p.onStateEnter("human", () => {
        every("humanBlock", (b) => {
            b.solid = true;
        });
        every("ghostBlock", (b) => {
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
    /*p.onUpdate(() => {
		if (p.pos.y >= 700) {
			go("tutorial")
		}
	})*/
}
