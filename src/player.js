

export function initPlayer(xPos, yPos, speed){
return [

     sprite("player"),
     pos(vec2(xPos, yPos)),
     area(),
     body(),
     state("human", ["human", "ghost"]),
     playerControls(speed),
     outview(),
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
                this.flipX(false);
                this.move(speed, 0);
            })
            
             onKeyDown("a", () => {
                this.flipX(true);
                this.move(-speed, 0);
            })
            
             onKeyPress("j", () => {
                this.enterState("ghost");
            });
            
            onKeyPress("k", () => {
                this.enterState("human");
            })

            onKeyPress(["d", "a"], () => {
                if(this.curAnim() != "ghost"){
                
                this.play("Walk")
                }
            })
            
            onKeyRelease(["a", "d"], () => {
                if (
                    !isKeyDown("a")
                    && !isKeyDown("d")
                    
                ) {
                    if(this.curAnim() != "ghost"){
                    this.play("Idle")
                    }
                }
            })

            this.onStateEnter("ghost", () => {
                this.play("ghost");
                every("humanBlock", (b) => {
                    b.solid = false;
                });
                every("ghostBlock", (b) => {
                    b.solid = true;
                });
            })
            
            this.onStateEnter("human", () => {
                this.play("Idle");
                every("humanBlock", (b) => {
                    b.solid = true;
                });
                every("ghostBlock", (b) => {
                    b.solid = false;
                });
            
            });
            
            this.onStateUpdate("human", () => {
                
            });
            
            this.onStateUpdate("ghost", () => {
                
            });
        },
    }
}




