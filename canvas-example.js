// request 2d drawing access to the canvas
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// create an empty array to hold squares
var squares = [ ];


// this function gets run every 10ms to draw a new frame and update the state of the game
function draw()
{
    // clear the whole screen before drawing a new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ext.each will call drawCircle once for each object in the circle array
    Ext.each(squares, drawSquare);
}

function drawSquare(square)
{
    // set the fill color to red
    ctx.fillStyle="#336633";
    
    // draw a square and fill it in
    ctx.beginPath();
    ctx.line(square.x, square.y, square.r, 0, Math.PI*2, true);
    ctx.closePath();
    
    ctx.fill();
    
    // update box's position
    square.x = square.x + square.dx;
    square.y = square.y + square.dy;
  
    
    // check if box is in contact with right or left edge
    if(square.x >= canvas.width - square.r || square.x <= square.r)
    {
        // flip the sign on dx to change direction between left/right
        square.dx = square.dx * -1;
    }
    
    // check if ball is in contact with right or left edge
    if(square.y >= canvas.height - square.r || square.y <= square.r)
    {
        // flip the sign on dy to change direction between up/down
        square.dy = square.dy * -1;
    }   
}


// listen for keyboard presses
Ext.getBody().on('keydown', function(ev) {
    //alert('key press: '+ev.keyCode);
    
    if(ev.keyCode == 32) // space bar
    {
        squares.push({
            r: 15
            ,x: 50
            ,y: 50
            ,dx: Math.random() * 10 - 5
            ,dy: Math.random() * 10 - 5
        });
        
        //console.log(squares);
    }
});


// start running the draw function every 10ms
setInterval(draw, 10); // 1000ms / 10ms = 100 frames per second​​​