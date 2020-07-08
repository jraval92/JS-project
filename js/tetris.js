let canvas;
let ctx;
let boardAHeight = 20;
let boardAWidth = 12;
let startX = 4;
let startY = 0;
let score = 0;
let level = 1;
let endGame = "Playing";
let coorArray = [...Array(boardAHeight)].map(e => Array(boardAWidth).fill(0));
let curPiece = [[1,0],[0,1],[1,1],[2,1]];

let pieces = [];
let pieceColors = ['purple', 'cyan', 'blue', 'yellow', 'green', 'red', 'orange'];
let curPieceColor;

let gameBoradArray = [...Array(20)].map(e => Array(12).fill(0));

let stopArray = [...Array(20)].map(e => Array(12).fill(0));

let DIRECTIONS = 
{
    IDLE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};

let direction;


class Coordinates
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}

document.addEventListener('DOMContentLoaded', SetupCanvas);

function CreateCoorArray()
{
    let x, y;

    let i = 0, j = 0;

    for(y = 9; y < 446; y += 23)
    {
        for (x = 11; x <= 264;  x += 23)
        {
            coorArray[i][j] = new Coordinates(x, y);
            i++;
        }
        j++;
        i = 0;
    }
}

function SetupCanvas()
{
    canvas = document.getElementById('tCanvas');
    ctx = canvas.getContext('2d');

    canvas.width = 936;
    canvas.height = 956;

    ctx.scale(2,2);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'white';
    ctx.strokeRect(8, 8, 280, 462);

    //Score layout
    ctx.strokeText("Score", 300, 98);
    ctx.strokeRect(300, 107, 161, 24);
    ctx.strokeText(score.toString(), 310, 127);
    //Current Level layout
    ctx.strokeText("Level", 300, 157);
    ctx.strokeRect(300, 171, 161, 24);
    ctx.strokeText(score.toString(), 310, 190);


    document.addEventListener('keydown', HandleKeyPress);
    CreatePieces();
    CreatePiece();

    CreateCoorArray();
    DrawPiece();
}

function DrawPiece()
{
    for(let i = 0; i < curPiece.length; i++)
    { 
        var x = curPiece[i][0] + startX;
        var y = curPiece[i][1] + startY;
 
        gameBoradArray[x][y] = 1;
 
        let coorX = coorArray[x][y].x;
        let coorY = coorArray[x][y].y;

        ctx.fillStyle = curPieceColor;
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}

function HandleKeyPress(key)
{
    if(endGame != "Game Over")
    {
            //Press 'W' or left-arrow key to move piece left
        if(key.keyCode == 65 || key.keyCode == 37)
        {
            direction = DIRECTIONS.LEFT;
            if(!WallHit() && !CheckHCol())
            {
                DeletePiece();
                startX--;
                DrawPiece();
            }
        }

        //Press 'D' or right-arrow key to move piece right
        else if(key.keyCode == 68 || key.keyCode == 39){
            direction = DIRECTIONS.RIGHT;
            if(!WallHit() && !CheckHCol())
            {
                DeletePiece();
                startX++;
                DrawPiece();
            }
        
        }
        //Press 'S' or down-arrow key to move piece left
        else if(key.keyCode == 83 || key.keyCode == 40){
            moveDown();
        }
        else if(key.keyCode == 16 || key.keyCode == 32 || key.keyCode == 69){
            RotatePiece();
        }
    }       
}

function moveDown()
{    
    direction = DIRECTIONS.DOWN;
    if(!CheckVCol())
    {
        DeletePiece();
        startY++;
        DrawPiece();
        console.log("Down");
    }    
}

window.setInterval(function()
{
    if(endGame != "Game Over")
    {
        moveDown();
    }
}, 1000)


function DeletePiece()
{
    var i, x, y, coorX, coorY;

    for(i = 0; i < curPiece.length; i++)
    {
        x = curPiece[i][0] + startX;
        y = curPiece[i][1] + startY;
        gameBoradArray[x][y] = 0;
        coorX = coorArray[x][y].x;
        coorY = coorArray[x][y].y;
        ctx.fillStyle = 'black';
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}

function CreatePieces()
{
    //T Piece
    pieces.push([ [1, 0], [0, 1], [1, 1], [2, 1] ]);
    //I Piece
    pieces.push([ [0, 0], [1, 0], [2, 0], [3, 0] ]);
    //J Piece
    pieces.push([ [0, 0], [0, 1], [1, 1], [2, 1] ]);
    //L Piece
    pieces.push([ [2, 0], [0, 1], [1, 1], [2, 1] ]);
    //Square or O Piece
    pieces.push([ [0, 0], [1, 0], [0, 1], [1, 1] ]);
    //S Piece
    pieces.push([ [1, 0], [2, 0], [0, 1], [1, 1] ]);
    //Z Piece
    pieces.push([ [0, 0], [1, 0], [1, 1], [2, 1] ]);
}

function CreatePiece()
{
    let randomPiece = Math.floor(Math.random() * pieces.length);
    curPiece = pieces[randomPiece];
    curPieceColor = pieceColors[randomPiece];

}

function WallHit()
{
    let i, newX;

    for(i = 0; i < curPiece.length; i++)
    {
        newX = curPiece[i][0] + startX;
        if(newX <= 0 && direction == DIRECTIONS.LEFT)
        {
            return true;
        }
        else if(newX >= 11 && direction == DIRECTIONS.RIGHT)
        {
            return true;
        }
    }

    return false;
}

function CheckVCol()
{
    let i, x, y, square;
    
    let pieceCopy = curPiece;
    let coll = false;

    for(i = 0; i < pieceCopy.length; i++)
    {
        square = pieceCopy[i];
        x = square[0] + startX;
        y = square[1] + startY;

        if(direction == DIRECTIONS.DOWN){
            y++;
        }
        if(gameBoradArray[x][y + 1] == 1){
            if (typeof stopArray[x][y + 1] == 'string')
            {
                DeletePiece();
                startY++;
                DrawPiece();
                coll = true;
                break;
            }
            if (y >= 20)
            {
                coll = true;
                break;
            }
        }
        if(coll)
        {
            if(startY <= 2)
            {
                endGame = "Game Over";
                ctx.fillStyle = 'white';
                ctx.fillRect(310, 242, 140, 30);
                ctx.fillStyle = 'black';
                ctx.fillText(endGame, 310, 261);
            }
            else
            {
                for (i = 0; i < pieceCopy.length; i++)
                {
                    square = pieceCopy[i];
                    x = square[0] + startX;
                    y = square[1] + startY;
                    stopArray[x][y] = curPieceColor; 
                }}
                CheckForCompleteRow();
                CreatePiece();
                direction = DIRECTIONS.IDLE;
                startX = 4;
                startY = 0;
                DrawPiece();
            

        }
        
    }
}
function CheckHCol()
{
    let i, x, y, square;

    let pieceCopy = curPiece;
    let coll = false;
    for(i = 0; i < pieceCopy.length; i++)
    {
        square = pieceCopy[i];
        x = square[0] + startX;
        y = square[1] + startY;

        if(direction == DIRECTIONS.LEFT)
        {
            x--;
        }

        else if (direction == DIRECTIONS.RIGHT)
        {
            x++;
        }

        var stopPieceVal = stopArray[x][y];
        if(typeof stopPieceVal == 'string')
        {
            coll = true;
            break;
        }

    }
    return coll;
}

function CheckForCompleteRow()
{
    let i, x, y, coorX, coorY;

    let rowsDel = 0;
    let startDel = 0;
    let completed = true;

    for (y = 0; y < boardAHeight; y++)
    {
        
        for(x = 0; x < boardAWidth; x++)
        {
            let square = stopArray[x][y];
            if(square == 0 || (typeof square == 'undefined'))
            {
                completed = false;
                break;
            }
        }

        if(completed)
        {
            if(startDel == 0)
            {
                startDel = y;
            }
            rowsDel++;
            for (i = 0; i <boardAWidth; i++)
            {
                stopArray[i][y] = 0;
                gameBoradArray[i][y] = 0;
                coorX = coorArray[i][y].x;
                coorY = coorArray[i][y].y;
                ctx.fillStyle = 'black';
                ctx.fillRect(coorX, coorY, 21, 21);
            }
        }
    }

    if(rowsDel > 0)
    {
        score += 15;
        ctx.strokeText("Score", 300, 98);
        ctx.strokeRect(300, 107, 161, 24);
        ctx.strokeText(score.toString(), 310, 127);
        MoveRowsDown(rowsDel, startDel);
    }

}

function MoveRowsDown(rowsDel, startDel)
{
    let i, x, z, coorX, coorY, square, nextSquare;
    for(i = startDel - 1; i >= 0; i--)
    {
       for(x = 0; x < boardAWidth; x++)
       {
           z = i+ rowsDel;
            square = stopArray[x][i];
            nextSquare = stopArray[x][z];
            if(typeof square == 'string')
            {
                nextSquare = square;
                gameBoradArray[x][z] = 1;
                stopArray[x][z] = square;
                coorX = coorArray[x][z].x;
                coorY = coorArray[x][z].y;
                ctx.fillStyle = nextSquare;
                ctx.fillRect(coorX, coorY, 21, 21);

                square = 0;
                gameBoradArray[x][i] = 0;
                stopArray[x][i] = 0;
                coorX = coorArray[x][i].x;
                coorY = coorArray[x][i].y;
                ctx.fillStyle = 'black';
                ctx.fillRect(coorX, coorY, 21, 21);
            }
       }
    }
}

function RotatePiece()
{
    let newRot = [];
    let pieceCopy = curPiece;
    let i, x, y, backUpPiece;

    for (i = 0; i < pieceCopy.length; i++)
    {
        backUpPiece = [...curPiece];
        x = pieceCopy[i][0];
        y = pieceCopy[i][1];
        let newX = (GetLastSquareX() - y);
        let newY = x;
        newRot.push([newX, newY]);
    }
    DeletePiece();
    try{
        curPiece = newRot;
        DrawPiece();
    }
    catch(e)
    {
        if(e instanceof TypeError)
        {
            curPiece = backUpPiece;
            DeletePiece();
            DrawPiece();
        }
    }
}

function GetLastSquareX()
{
    let lastX = 0;
    for(let i = 0; i <curPiece.length; i++)
    {
        let square = curPiece[i];
        if(square[0] > lastX)
        {
            lastX = square[0];
        }
    }
    return lastX;
}