//levels are W:30 H:20 blocks 

//enemy "AI" component cause enemy's are parts of the levels
function enemyMove(speed){
    return {
        id:"enemyMove",

        require: [ "pos", "area", "scale" ],

        add(){
            this.onCollide("player", (player) => {
                
            });


            /*this.onCollide("humanBlock", () => {

                
					speed = -speed;
                    //this.scale = (-1, -1)
				
                
            });*/
            /*this.onCollide("ghostBlock", () => {
                
					speed = -speed;
				
            });*/
            this.onCollide("bounds", () => {
                speed = -speed;
            });

        },

        update(){
            
            this.move(speed, 0);
        },

        
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
        "               ww           *  ",
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
        "                w   |  e  | *  ",
        "============    w   ===========",
    ],
    lev2: [
        "xxxxxxxxxxxxxxxxxx             ",
        "                 x             x",
        "                 x             x",
        "|            e  |x *           x",
        "wwwwwwwwwwwwwwwwwxggg           x",
        "                 x         wwwwx",
        "                 x             x",
        "|              e|x             x",
        "gggggggggggggggggx             x",
        "                 xgggg         x",
        "                 x             x",

        "|       e||   e| x             x",
        "wwwwwwwwwwwwwwwwww         wwwwx",
        "                               x",
        "                               x",
        "                               x",
        "                             ggx",
        "                               x",
        "|          e   |               x",
        "gggggggggggggggg         ggggggx",
    ],
    lev4: [
        "                               ",
        "                *              ",
        "                x              ",
        "         g                     ",
        "                               ",
        "                              xx",
        "                              xx",
        "   w                          xx",
        "          g                   xx",
        "                  w           xx",
        "                         g    xx",
        "                              xx",
        "                              xx",
        "                             wxx",
        "     w                          ",
        "     w                  g       ",
        "     w            w             ",
        "    |e|    g                    ",
        "     w                          ",
        "ww                              ",
        
    ],
    lev3: [
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "                           wwx",
        "               wxxxxxxxxxxxwwx",
        "               gxxx        wwx",
        "               gxxx        wwx",
        "               gxxx     *  wwx",
        "gggggggggggggggxxxxxxxxxxxxxxx",
    ],
    hellMaze: [
        "                              ",
        "                              ",
        "wxggxxxxxxx  g    "
    ],
    pillars: [
        "                              ",
        "              *               ",
        "              ww              ",
        "              ww              ",
        "      g    wwwww             g",
        "      g       ww             g",
        "    ggg       bb          bgggg",
        "      g       bb          b   g",
        "b     g       bb          b   g",
        "      bb      bb     gg   b   g",
        "       b      bb     gg   bbbbg",
        "       b      bbgg   gg   b   g",
        "       bgg    bb     gg  gb   g",
    ]  
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

