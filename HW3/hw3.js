"use strict"
const GameWidth = 800, GameHeight = 600, 
    BallWidth = 30, BallHeight = 30, 
    BrickRow = 3, BrickColumn = 6,
    BrickWidth = 100, BrickHeight = 30, BrickXGap = 30, BrickYGap = 20, BrickXinit = 25, BrickYinit = 50,
    RacketWidth = 200, RacketHeight = 20;

const Rainbow = ["pink", "chocolate", "gold", "lightgreen", "lightblue", "black", "plum"];
const BrickScore = [7, 6, 5, 4, 3, 2, 1]

const container = document.getElementById("container"); 
container.style.width = GameWidth + "px";
container.style.height = GameHeight + "px";

//Math.random() 產生一 0 ~ 1 之間的浮點數
//Math.floor return 小於或等於次數字的最大整數
function randInt(start, end){
    return Math.floor(Math.random()*(end-start) + 1) + start;
}

function change_score(b_hard){
    // console.log(b.hard);
    score += BrickScore[b_hard-1];
    let str = "score: " + score;
    document.getElementById("score").innerHTML = str;
}


class Component{
    constructor(w, h){
        this.node = document.createElement("div");
        this.node.style.left = "0px";
        this.node.style.top = "0px";
        this.node.style.width = w + "px";
        this.node.style.height = h + "px";
        container.appendChild(this.node);
        
    }
}

class Ball extends Component{
    constructor(){
        super(BallWidth, BallHeight);
        this.node.id = "ball";
        this.offset = {x:randInt(2,5), y:randInt(2,5)};
    }

    check_hit_wall(x, y){
        if (x >= GameWidth-BallWidth) {this.offset.x = -randInt(2,5);return;}
        else if(x <= 0) {this.offset.x = randInt(2,5);return;}
        if (y >= GameHeight-BallHeight) {this.offset.y = -randInt(2,5);return;}
        else if (y <= 0) {this.offset.y = randInt(2,5);return}
    }

    check_hit_racket(x, y){
        let rx = parseInt(racket.node.style.left);
        let ry = parseInt(racket.node.style.top);
        if (x >= rx && x+BallWidth <= rx+RacketWidth && y+BallHeight >= ry) {this.offset.y = -randInt(2,5);return;}
    }

    check_hit_brick(x,y){
        for (let i = 0; i <aBrick.length; i++){
            if(aBrick[i].hard > 0){
                //brick coordinate
                let x0 = parseInt(aBrick[i].node.style.left);
                let x1 = x0 + BrickWidth;
                let y0 = parseInt(aBrick[i].node.style.top);
                let y1 = y0+BrickHeight;

                //top or bottom
                if (x >= x0 && x+BallWidth <= x1){
                    if (y+BallHeight >= y0 && y < y0){
                        this.offset.y = -randInt(2,5); //hit top
                        change_score(aBrick[i].hard);
                        aBrick[i].decHard();
                    }
                    else if(y <= y1 && y+BallHeight > y1){
                        this.offset.y = randInt(2,5); //hit bottom
                        change_score(aBrick[i].hard);
                        aBrick[i].decHard();
                    }
                    
                }
                //left or right
                else if(y >= y0 && y+BallHeight <= y1){
                    if (x+BallWidth >= x0 && x < x0){
                        this.offset.x = -randInt(2,5); //hit left
                        change_score(aBrick[i].hard);
                        aBrick[i].decHard();

                    }
                    else if(x <= x1 && x+BallWidth > x1){
                        this.offset.x = randInt(2,5); //hit right
                        change_score(aBrick[i].hard);
                        aBrick[i].decHard();

                    }
                }
            }
        
        }
    }

    move(){
        let x = Math.max(0, Math.min(parseInt(this.node.style.left) + this.offset.x, GameWidth-BallWidth));
        let y = Math.max(0, Math.min(parseInt(this.node.style.top) + this.offset.y, GameHeight-BallHeight));
        
        this.node.style.left = x + "px"; //球的左上角
        this.node.style.top = y + "px"; 

        this.check_hit_wall(x,y);//hit the wall
        this.check_hit_racket(x,y);//hit the racket
        this.check_hit_brick(x,y); //hit the brick

        //GameOver
        // if (y + BallWidth>= GameHeight ) return false;

    }
}



class Brick extends Component{
    constructor(x, y){
        super(BrickWidth, BrickHeight);
        this.node.setAttribute("class", 'brick');
        this.node.style.left = x + "px";
        this.node.style.top = y + "px";
        // this.node.style.width = BrickWidth + "px";
        // this.node.style.height = BrickHeight + "px";
        this.hard = randInt(1,7); // 磚塊的硬度
        this.node.style.backgroundColor = Rainbow[this.hard-1];
    }

    decHard(){
        this.hard--;
        if (this.hard == 0){
            // let str = "score: " + score;
            // document.getElementById("score").innerHTML = str;
            this.node.style.display = "none";
        }
        else this.node.style.backgroundColor = Rainbow[this.hard-1];
    } 
}
class Racket extends Component{
    constructor(){
        super(RacketWidth, RacketHeight);
        this.node.id = "racket";
        this.coor = {x: Math.floor((GameWidth-RacketWidth)/2, 0), y: GameHeight-RacketHeight};
        this.node.style.top = this.coor.y + "px";
        this.setX(this.coor.x);
        // this.node.style.width = RacketWidth + "px";
        // this.node.style.height = RacketHeight + "px";

    }
    setX(x){
        this.node.style.left = x + "px";
    }
}


function ball_start_move() {
    if (ball.move(racket, aBrick) == false){
        clearInterval(id);
        alert("Game Over!!");
    }
    let gameOverFlag = 0; // 0 -> game continue, 1 -> gameover
    for(let i = 0; i < aBrick.length; i++){
        if (aBrick[i].hard > 0){
            break;
        }
        if (i == aBrick.length - 1 && aBrick[i].hard == 0){
            gameOverFlag = 1;
        }
    }
    if (gameOverFlag == 1){
        clearInterval(id);
        alert("You get full marks!!" + "\n" + "SCORE: " + score);

    }
}


let ball = new Ball();
let racket = new Racket();
let aBrick = new Array(BrickRow * BrickColumn);
for(let i = 0; i < BrickRow; i++){
    for (let j = 0; j < BrickColumn; j++){
        aBrick[i*BrickColumn+j] = new Brick(j*(BrickWidth+BrickXGap)+BrickXinit, i*(BrickHeight+BrickYGap)+BrickYinit);
    }
}

let score = 0;


let id = setInterval(ball_start_move, 10);




