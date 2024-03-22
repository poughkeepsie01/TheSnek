var number = document.querySelector(".number");
var plus = document.querySelector(".plus");
var minus = document.querySelector(".minus");
const game_score = document.querySelector(".score");
const numValue = document.querySelector(".score2");

let score = 0;

//grid
var blocksize = 25;   // kung gano kalaki ang stage/map  //grids with 500px(squares)
var rows = 21;        //kung ilang rows Y    
var cols = 31;        //kung ilang columns  X
var board;
var context;
var event;

// Head of snake
var snakex = blocksize * 15;  // x coordinate  //starting point of snake head // valu ngayon ay 
var snakey = blocksize * 10;  // y coordinate
console.log(snakey);

// body of snake
var snakebody = [];   // means gagamit ng array

//food
var foodx;
var foody;

//speed
var velocityx = 0;
var velocityy = 0;

//gaymu ova da!!
var gameover = false;


window.onload = function(){ // where the things happen
    board = document.getElementById("board");  //pag nag load kukunin nya yung canvas then compute the grid size
    board.height = rows * blocksize;   // 500px of rows  x
    board.width = cols * blocksize;    // 500px of cols  y
    context = board.getContext("2d");   // the board itself

    
    foodloc();
    setInterval(update, 500/10); //100ms naguupdate ang canvas kasi required mag loop at tawagin palagi ang update

    document.addEventListener("keydown", changedirection) // pano controlin ang snek
    

   // update();      // tatawagin ang function update to display the grid

    
}

function update(){

     if(gameover){
        console.log("malas mo");
        return;
     }


    context.fillStyle="black";     // ano itsura ng grid color
    context.fillRect(0, 0, board.width, board.height);  // fill x , y, width ng map, height ng map

    context.fillStyle="red";
    context.fillRect(foodx, foody, blocksize, blocksize);

    if (snakex == foodx  &&  snakey == foody){            // condition if same position ang head and food mean nag contact sila
        foodloc();  // random na mag spawn yung food ulit
        snakebody.push([snakex , snakey])   // push ang value ng food x and y
        score++;
        game_score.innerText = `Score: ${score}`;
        console.log(score);
    }

    for (let i = snakebody.length - 1; i > 0; i--){
        snakebody[i] = snakebody[i-1];               // yung value ng head ay minus 1 kaya magiging body ng snake
    } 
    if(snakebody.length){   // means trueeeee
        snakebody[0] = [snakex,snakey]; // magdedetermin ng value ng body then -1 everytime nagcocontact ang head and food kaya napupunta sa body kasi lagi -1 sa array
    }
    
    context.fillStyle="lime";      //color
    snakex += velocityx * blocksize;  // to update the canvas nag mag react sa button na pinindot
    snakey += velocityy * blocksize;
    context.fillRect(snakex, snakey, blocksize, blocksize); // fill x ng head, y ng head, width, height

    for (let i = 0; i < snakebody.length; i++){
        context.fillStyle="orange";
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize); // ang loop para maging body and kinain na food
    }

    // game over
    if ( snakex < 0 || snakey < 0 || snakex >= board.width || snakey >= board.height ){  // game over pag tumama sa end ng board
        gameover = true;
        alert(" BOBO KA");
        setTimeout(function(){
            location.reload();
        }, 500);


    }

    for (let i = 0; i < snakebody.length; i++){
        if (snakex == snakebody[i][0] && snakey == snakebody[i][1]){
            gameover = true;
            alert("BOBO KA ULIT");
            setTimeout(function(){
                location.reload();
            }, 500);
        }
    }
    
    

}

function changedirection(){     // IMPORTANT event.key instead of e.code
    if (event.key == "ArrowUp"  && velocityy != 1){
         velocityx = 0;
         velocityy = -1; // minus 1 kasi 0-19 ay pababa then -1 is to move up
    }
    else if (event.key == "ArrowDown" && velocityy != -1){
        velocityx = 0;
        velocityy = 1; //// minus 1 kasi 0-19 ay pababa then +1 is to move down
   }
   else if (event.key  == "ArrowLeft" && velocityx != 1){
       velocityx = -1;
       velocityy = 0;
   }
   else if (event.key  == "ArrowRight" && velocityx != -1){
       velocityx = 1;
       velocityy = 0;
   }
}

function foodloc(){
    //math random returns a value og 0-1 , then multiplied sa rows and cols( so 1 * value of rows and cols) * value of blocksixe kaya di lalagpas, math.floor removes decimal
     foodx = Math.floor(Math.random() * cols) * blocksize;   // food location base sa rows and cols pero random generated
     foody = Math.floor(Math.random() * rows ) * blocksize;  // pero di nalagpas sa blocksize

}

function addnum(){
    score++;
    numValue.innerText = `${score}`;
   console.log(score);
}

function minnum(){
    score--;
    numValue.innerText = `${score}`;
    console.log(score);
 }



