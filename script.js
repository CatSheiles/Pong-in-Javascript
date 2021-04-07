var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
window.addEventListener('keydown', function(e) {keydown(e)}, false);
window.addEventListener("keyup", function(e) {keyup(e)}, false);

let ballx = 20; /*Starting positions for ball x and ball y */
let bally = 20;
let batx = 580; /*Starting position for bat */
let baty = canvas.height/2-50;

let vecX = 2; /*Vector or direction & speed ball is moving */ 
let vecY = 2;

let score = 0;

ctx.fillStyle = "purple";

let isPushingUp = false;
let isPushingDown = false;

/*Pong ball draw the ball and start the loop */
ctx.fillRect (ballx, bally, 20, 20);
ctx.fillRect (batx, baty, 10, 50);
loop();

function keydown(bat) /*Changing bats position when keyup or keydown pressed */
{
    if(bat.key == 'ArrowDown')
    {
        //if(baty <= canvas.height - 50) baty += 20; /*bat speed */
        isPushingDown = true;
    }
    if(bat.key == "ArrowUp")
    {
        //if(baty > 0) baty -= 10;
        isPushingUp = true;
    }
}

function keyup(bat){
    if(bat.key == "ArrowDown"){
        isPushingDown = false;
    }

    if(bat.key == "ArrowUp")
    {
        isPushingUp = false;
    }
}

/*Rendering loop - clear screen, redraw bal & redraw bat */
function loop() {
    ctx.clearRect(0, 0, 600, 400);
    ctx.fillRect (ballx, bally, 20, 20);
    ctx.fillRect (batx, baty, 10, 50);

    ctx.font = "30px Arial"; /*Score */
    ctx.fillText(score.toString(), 10, 50);

    if(isPushingDown) if(baty <= canvas.height - 50) baty += 5; /*bat speed */
    if(isPushingUp) if(baty > 0) baty -= 5; //is pushingup and down makes bat keying smoother

    ballx += vecX; /*Updating balls position or making it mooooove */
    bally += vecY;

    /*edges/walls checks */
    if(ballx >= (600 - 20) - (20-10)) /*did ball hit rh wall - did it hit bat */
    { 
        if(bally > baty && bally <= baty+50) {
             vecX = -2; 
             score++;
            }
        else{
            ballx = canvas.width/2;
            bally = canvas.height/2;
            score = 0;
        }
        
    }
    if(ballx < 0) { vecX = 2; }

    if(bally >= 400 - 20) { vecY = -2; }
    if(bally < 0) { vecY = 2; }

    requestAnimationFrame(loop);
}


