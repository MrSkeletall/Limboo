

//enemy "AI" component
function enemyMove(speed){
    return {
        id:"enemyMove",

        require: [ "pos", "area", "scale" ],

        add(){
            this.onCollide("player", (player) => {
                destroy(player)
            });

            this.onCollide("humanBlock" || "ghostBlock" || "bounds", (obj, col) => {
                if (col.isLeft() || col.isRight()) {
					speed = -speed;
                    //this.scale = (-1, -1)
				}
                
            });
            this.onCollide("ghostBlock", (obj, col) => {
                if (col.isLeft() || col.isRight()) {
					speed = -speed;
				}
            });
            this.onCollide("bounds", () => {
                speed = -speed;
            });

        },

        update(){
            
            this.move(speed, 0);
        },

        checkCollision(){
            
            
        }
    }
}
 

export let levels = {
    tutorial: [
        "               ww              ",
        "               ww               ",
        "               ww               ",
        "               ww              ",
        "               ww               ",
        "               ww               ",
        "               ww               ",
        "               ww               ",
        "               ww               ",
        "               ww               ",
        "               ww               ",
        "               ww             ",
        "               ww             ",
        "               ww             ",
        "               ww             ",
        "               ww             ",
        "               ww             ",
        "               ww             ",
        "        |  e   ww          *  ",
        "==============================",
    ],
    lev1: [
        "                               ",
        "                               ",
        "                               ",
        "                               ",
        "                               ",
        "                               ",
        "                               ",
        "                               ",
        "               www              ",
        "               www              ",
        "                w              ",
        "                w              ",
        "                w              ",
        "                w              ",
        "                w              ",
        "                w              ",
        "                w              ",
        "                w              ",
        "                w           *  ",
        "============    w   ===========",
    ],
    lev2: [
        "xxxxxxxxxxxxxxxxxx             ",
        "                 x             x",
        "                 x             x",
        "                 x *           x",
        "wwwwwwwwwwwwwwwwwxggg           x",
        "                 x         wwwwx",
        "                 x             x",
        "                 x             x",
        "gggggggggggggggggx             x",
        "                 xgggg         x",
        "                 x             x",
        "                 x             x",
        "wwwwwwwwwwwwwwwwww         wwwwx",
        "                               x",
        "                               x",
        "                               x",
        "                             ggx",
        "                               x",
        "                               x",
        "gggggggggggggggg         ggggggx",
    ],
    lev3: [
        "                               ",
        "               w*              ",
        "                               ",
        "         g                     ",
        "                               ",
        "                               ",
        "                               ",
        "   w                           ",
        "          g                    ",
        "                  w            ",
        "                         g     ",
        "                               ",
        "                               ",
        "                               ",
        "                             w ",
        "                     g         ",
        "                w              ",
        "           g                   ",
        "     w                         ",
        "w                              ",
    ],
}


export let levelData = {
    width:32,
    height:32,
    "=": () => [
        sprite("ground"),
        area(),
        solid(),
        "ground",

    ],
    "w": () => [
        sprite("brick"),
        area(),
        solid(),
        "humanBlock",

    ],
    "g":() => [
        sprite("ghostBrick"),
        area(),
        solid(),
        "ghostBlock",
    ],

    "*":() => [
        sprite("flag"),
        origin("center"),
        area(),
        //solid(),
        "goal",
    ],
    "x": () => [
        sprite("impasBrick"),
        area(),
        solid(),
    ],
    "|": () => [
        area({ width: 32, height: 32}),
        "bounds"
    ],
    "e": () => [
        sprite("grimReaper"),
        scale(1),
        area(),
        solid(),
        enemyMove(100),
        "danger",
        "enemy",
    ],
    

}

