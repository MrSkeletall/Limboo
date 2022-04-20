

export function initPlayer(xPos, yPos, speed){
return [

     sprite("tempPlayer", {anim: "human",}),
     pos(vec2(xPos, yPos)),
     area(),
     body(),
     state("human", ["human", "ghost"]),
     playerControls(speed),
     "player",
]

}

function playerControls(speed){
    return {
        id:"playerControls",
        require: [ "area", "body", "state"],
        add(){
            this.init();
        },
        init(){
            onKeyDown("d", () => {
                this.move(speed, 0);
            })
            
             onKeyDown("a", () => {
                this.move(-speed, 0);
            })
            
             onKeyPress("j", () => {
                this.enterState("ghost");
            });
            
            onKeyPress("k", () => {
                this.enterState("human");
            })

            this.onStateEnter("ghost", () => {
    
                every("humanBlock", (b) => {
                    b.solid = false;
                });
                every("ghostBlock", (b) => {
                    b.solid = true;
                });
            })
            
            this.onStateEnter("human", () => {
                every("humanBlock", (b) => {
                    b.solid = true;
                });
                every("ghostBlock", (b) => {
                    b.solid = false;
                });
            
            });
            
            this.onStateUpdate("human", () => {
                this.play("human")
            });
            
            this.onStateUpdate("ghost", () => {
                this.play("ghost");
            });
        },
    }
}




