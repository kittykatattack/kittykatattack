var game = game || {};

game.mouseControl = (function(){

//Add mouse listeners
canvas.addEventListener("mousemove", mousemoveHandler, false);
canvas.addEventListener("mousedown", mousedownHandler, false);
canvas.addEventListener("mouseup", mouseupHandler, false);

var mouseX = 0;
var mouseY = 0;
var mouseIsDown = false;
		
function mousemoveHandler(event)
{ 
  //Find the mouse's x and y position.
  //Subtract the canvas's top and left offset
  mouseX = event.pageX - canvas.offsetLeft;
  mouseY = event.pageY - canvas.offsetTop;
	
	event.preventDefault();
}

function mousedownHandler(event)
{
	mouseIsDown = true;
	event.preventDefault();
}

function mouseupHandler(event)
{
	mouseIsDown = false;
}

//Public properties and methods
return{	
	mouseIsDown: function(){return mouseIsDown},
	mouseX: function(){return mouseX},
	mouseY: function(){return mouseY}
};
	
}());