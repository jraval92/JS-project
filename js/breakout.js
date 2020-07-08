var canvas = document.getElementById("BOCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
ctx.scale(2,2);
var ballRadius = 10;
var x = canvas.width/12;
var y = canvas.height - 400;
var dx = 2;
var dy = -2;
//Set Paddle dimenisions
var pladdleH = 12;
var pladdleW = 72;

//Start The Paddle near bottom middle
var paddleX = (canvas.width/4 - pladdleW);

//Start of game keys are not pressed
var left = false;
var right = false;

//Sets the blocks and set the array for it
var blockRowCount = 4;
var blockColumnCount = 7;
var blockWidth = 72;
var blockHeight = 24;
var blockPadding = 12;
var blockOffsetTop = 32;
var blockOffsetLeft = 32;
var blocks = [];

for(c = 0; c < blockColumnCount; c++)
{
    blocks[c] = [];
    for(r = 0; r < blockRowCount; r++)
    {
        blocks[c][r] = {x: 0, y: 0, status: 1};
    }
}

//Set score at start to 0
var score = 0;
var lives = 3;

//Set eventlistener
document.addEventListener('keydown', HandleKeyDown, false);
document.addEventListener('keyup', HandleKeyUp, false);


function HandleKeyDown(key)
{
    if(key.keyCode == 65 || key.keyCode == 37)
    {
        left = true;
    }
    else if(key.keyCode == 68 || key.keyCode == 39)
    {
        right = true;
    }
}

function HandleKeyUp(key)
{
    if(key.keyCode == 65 || key.keyCode == 37)
    {
        left = false;
    }
    else if(key.keyCode == 68 || key.keyCode == 39)
    {
        right = false;
    }
}

function DrawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, (canvas.height/2 - pladdleH), pladdleW, pladdleH*2);
    ctx.fillStyle = "#004cd8";
    ctx.fill();
    ctx.closePath();
    console.log(paddleX, canvas.height - pladdleH, pladdleW, pladdleH*2)
}

function DrawScore()
{
    ctx.font = '18px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 8, 20);
}
    

function DrawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
    x += dx;    
    y += dy;
}

function DrawBlocks()
{
    for(c = 0; c < blockColumnCount; c++)
    {
        for(r = 0; r < blockRowCount; r++)
        {
            if(blocks[c][r].status == 1)
            {
                var blockX = (c * (blockWidth + blockPadding)) + blockOffsetLeft;
                var blockY = (r * (blockHeight + blockPadding)) + blockOffsetTop;
                blocks[c][r].x = blockX;
                blocks[c][r].y = blockY;

                ctx.beginPath();
                ctx.rect(blockX, blockY, blockWidth, blockHeight);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();

            }
        }
    }
}

function Collision()
{
    for(c = 0; c < blockColumnCount; c++)
    {
        for(r = 0; r < blockRowCount; r++)
        {
            let b = blocks[c][r];
            if(b.status === 1)
            {
                if(x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight)
                {
                    dy =-dy;
                    b.status = 0;
                    score++;
                    if(score == (blockRowCount) * (blockColumnCount))
                    {
                        alert('Congrats');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function Draw()
{

   
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawBall();
        DrawBlocks();
        DrawScore();
        DrawPaddle();
        Collision();
   

    if(x + dx > canvas.width/2 - ballRadius || x + dx < ballRadius)
    {
        dx = -dx;
    }
    if(y + dy < ballRadius)
    {
        dy = -dy;
    }

    else if(y + dy > canvas.height/2 - ballRadius)
    {
        if(x > paddleX && x < paddleX + pladdleW)
        {
            dy = -dy;
        }

        else
        {
            
                alert('You Lose');
                document.location.reload();            
        }
    }

    if (y + dy > canvas.height/2 - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }
    //Make paddle move
    if(right && paddleX <canvas.width/2 - pladdleW)
    {
        paddleX += 7;
    }
    else if(left && paddleX > 0)
    {
        paddleX -= 7;
    }
    //Making the ball move
    x += dx; 
    y += dy;
}
setInterval(Draw, 15);