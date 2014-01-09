(function(){

//The canvas
var canvas = document.querySelector("canvas"); 
var drawingSurface = canvas.getContext("2d");

//Object arrays
var sprites = [];
var bullets = [];
var stars = [];
var messages = [];
var assetsToLoad = [];
var assetsLoaded = 0;

//The mouse
var mouseX = undefined;
var mouseY = undefined;

//Hide the mouse
//canvas.style.cursor = "none";

//The background
var background = Object.create(spriteObject);
background.sourceY = 64;
background.sourceWidth = 1024;
background.sourceHeight = 764;
background.width = 1024;
background.height = 764;
sprites.push(background);

//The score messages
var fairyScoreMessage = Object.create(messageObject);  
fairyScoreMessage.x = 250;
fairyScoreMessage.y = 13;
fairyScoreMessage.font = "bold 70px Helvetica";
fairyScoreMessage.fillStyle = "black";
fairyScoreMessage.text = "00";
messages.push(fairyScoreMessage);

var beeScoreMessage = Object.create(messageObject);  
beeScoreMessage.x = 720;
beeScoreMessage.y = 13;
beeScoreMessage.font = "bold 70px Helvetica";
beeScoreMessage.fillStyle = "black";
beeScoreMessage.text = "00";
messages.push(beeScoreMessage);

//The bee
var bee = Object.create(spriteObject);
bee.sourceWidth = 77;
bee.width = 77;
bee.x = 100;
bee.y = canvas.height / 2 - bee.halfHeight();
sprites.push(bee);

//The fairy
var fairy = Object.create(spriteObject);
fairy.sourceX = 128;
fairy.sourceWidth = 77;
fairy.width = 77;
fairy.x = canvas.width - 177;
fairy.y = canvas.height / 2 - fairy.halfHeight();
sprites.push(fairy);

//The wand
var wand = Object.create(spriteObject);
wand.sourceX = 256;
wand.sourceWidth = 20;
wand.sourceHeight = 20;
wand.width = 20;
wand.height = 20;
wand.x = canvas.width / 2 - fairy.halfWidth();
wand.y = canvas.height / 2 - fairy.halfHeight();
sprites.push(wand);

//Load the tilesheet image
var image = new Image();
image.src = "../images/killerBeePandemonium.png";
image.addEventListener("load", loadHandler, false);
assetsToLoad.push(image);

//Add listeners
canvas.addEventListener("mousemove", mousemoveHandler, false);
canvas.addEventListener("mousedown", mousedownHandler, false);

//The angles needed to rotate the bee and the fairy's wand
var beeAngle = undefined;
var fairyAngle = undefined;

//Variables needed for the bullet timer
var bulletTimer = 0;
var timeToFire = 30;
var fairyScore = 0;
var beeScore = 0;

//The easing constant
EASING = 0.1;

//Game states
var LOADING = 0;
var PLAYING = 1;
var gameState = LOADING;

update();

function mousemoveHandler(event)
{ 
  //Find the mouse's x and y position.
  //Subtract the canvas's top and left offset
  mouseX = event.pageX - canvas.offsetLeft;
  mouseY = event.pageY - canvas.offsetTop;
}

function mousedownHandler(event)
{ 
  //Create a star sprite
  var star = Object.create(spriteObject);
  star.sourceX = 320;
  star.sourceWidth = 38;
  star.sourceHeight = 38;
  star.width = 38;
  star.height = 38;
  
  //Center it over the wand
  star.x = wand.centerX() - star.halfWidth();
  star.y = wand.centerY() - star.halfHeight();
  
  //Set its speed
  star.vx = Math.cos(fairyAngle) * 7;
  star.vy = Math.sin(fairyAngle) * 7;

  //Push the star into both the sprites and stars arrays
  sprites.push(star);
  stars.push(star);
}

function playGame()
{ 
  //--- The bee
  
  //Find the angle between the center of the bee and the fairy
  var vx = fairy.centerX() - bee.centerX();
  var vy = fairy.centerY() - bee.centerY();
  		
	//The distance between the fairy and the bee	
	var distance = Math.sqrt(vx * vx + vy * vy);
	
	//The range, in pixels, to which the bee should be sensitive
	var range = 500;
	
	if (distance <= range)
	{
		//Find out how much to move
		var moveX = bee.rotationSpeed * vx / distance;
		var moveY = bee.rotationSpeed * vy / distance;
		
		//Increase the bee's velocity 
		bee.vx += moveX; 
		bee.vy += moveY;
		
		//Find the total distance to move
		var moveDistance = Math.sqrt(bee.vx * bee.vx + bee.vy * bee.vy);
		
		//Apply easing
		bee.vx =  bee.speed * bee.vx / moveDistance;
		bee.vy =  bee.speed * bee.vy / moveDistance;
		
		//Rotate the bee towards the target
		//Find the angle in radians
		beeAngle = Math.atan2(bee.vy, bee.vx);
		
		//Convert the radians to degrees to rotate
		//the bee correctly
		bee.rotation = beeAngle * 180 / Math.PI + 90;
		
		//Fire bullets
		bulletTimer++;
		
		if(bulletTimer === timeToFire)
		{
		  fireBullet();
		  bulletTimer = 0;
		}
	}
	
	//Apply friction 
	bee.vx *= bee.friction;
	bee.vy *= bee.friction;
	
	//Move the bee
	bee.x += bee.vx;
	bee.y += bee.vy;
	
	//--- The bullets
  
  //Move the bullets
  for(var i = 0; i < bullets.length; i++)
  {
    var bullet = bullets[i];
    
    //Move it    
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    
    //Check for collisions with the fairy
    if(hitTestCircle(bullet, fairy))
    {
      //Update the score
      beeScore++;
      beeScoreMessage.text = beeScore;
      
      //Remove the bullets from the arrays
      removeObject(bullet, bullets);
      removeObject(bullet, sprites);      
      i--;
    }
    
    //Remove the bullet if it crosses the top of the screen
    if (bullet.centerY() < 0
    || bullet.centerX() < 0
    || bullet.centerX() > canvas.width
    || bullet.centerY() > canvas.height)
    { 
      //Remove the bullet from the bullets array
      removeObject(bullet, bullets);
 
      //Remove the bullet from the sprites array
      removeObject(bullet, sprites);
      
      //Reduce the loop counter by 1 to compensate 
      //for the removed element
      i--;
    }
  }
  
  //--- The fairy
  
  //Find the angle between the center of the fairy and the mouse
  fairyAngle = Math.atan2(mouseY - fairy.centerY(), mouseX - fairy.centerX());
	
  //Move the wand around the fairy
  var radius = 64;
  wand.x = fairy.centerX() + (radius * Math.cos(fairyAngle)) - wand.halfWidth();
  wand.y = fairy.centerY() + (radius * Math.sin(fairyAngle)) - wand.halfHeight();

  //Figure out the distance between the mouse and the center of the fairy
  vx = mouseX - fairy.centerX(); 
  vy = mouseY - fairy.centerY();  
  distance = Math.sqrt(vx * vx + vy * vy);
	
	//Move the fairy if it's more than 1 pixel away from the mouse 
  if (distance >= 1)
  {
    fairy.x += vx * EASING; 
    fairy.y += vy * EASING;
  }
  
  //--- The stars
  
  //Move the stars
  for(var i = 0; i < stars.length; i++)
  {
    var star = stars[i];
    
    //Move it    
    star.x += star.vx;
    star.y += star.vy;
    
    //Check for collisions with the bee
    if(hitTestCircle(star, bee))
    {
      //Update the score
      fairyScore++;
      fairyScoreMessage.text = fairyScore;  	
      
      //Remove the stars from the arrays
      removeObject(star, stars);
      removeObject(star, sprites);      
      i--;
    }
    
    //Remove the star if it crosses the top of the screen
    if (star.centerY() < 0
    || star.centerX() < 0
    || star.centerX() > canvas.width
    || star.centerY() > canvas.height)
    { 
      //Remove the star from the stars array
      removeObject(star, stars);
 
      //Remove the star from the sprites array
      removeObject(star, sprites);
      
      //Reduce the loop counter by 1 to compensate 
      //for the removed element
      i--;
    }
  }	
}

function fireBullet()
{ 
  //Create a bullet sprite
  var bullet = Object.create(spriteObject);
  bullet.sourceX = 384;
  bullet.sourceWidth = 20;
  bullet.sourceHeight = 20;
  bullet.width = 20;
  bullet.height = 20;
  
  //Center it over the bee
  var radius = 32;
	bullet.x 
	  = bee.x + bee.halfWidth() - bullet.halfWidth()
	  + (radius * Math.cos(beeAngle));
	  
	bullet.y 
	  = bee.y + bee.halfHeight() - bullet.halfHeight()
	  + (radius * Math.sin(beeAngle));
  
  //Set its speed
  bullet.vx = Math.cos(beeAngle) * 7;
  bullet.vy = Math.sin(beeAngle) * 7;

  //Push the bullet into both the sprites and bullets arrays
  sprites.push(bullet);
  bullets.push(bullet);
}

function removeObject(objectToRemove, array)
{
  //Remove the sprite from the array
	for(var i = 0; i < array.length; i++)
	{
	 var currentObject = array[i];
	 
	 //Search for the current object in the array
	 //and splice it out
	 if(currentObject === objectToRemove)
	 {
	   currentObject = null;
	   array.splice(i, 1);
	   break;
	 }
	}
} 

function update()
{ 
  //The animation loop
  setTimeout(update, 16);
  
  //Change what the game is doing based on the game state
  switch(gameState)
  {
    case LOADING:
      console.log("loading...");
      break;
    
    case PLAYING:
      playGame();
      break;
  }
  
  //Render the game
  render();
}

function loadHandler()
{ 
  assetsLoaded++;
  if(assetsLoaded === assetsToLoad.length)
  {
    gameState = PLAYING;
  }
}

function render()
{ 
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
  //Display the sprites
  if(sprites.length != 0)
  {
	  for(var i = 0; i < sprites.length; i++)
	  {
	     var sprite = sprites[i];
	     
	     //Save the current state of the drawing surface
	     //before it's rotated
	     drawingSurface.save();
	  
	     //Rotate the canvas
	     drawingSurface.setTransform(1,0,0,1,0,0);
	     drawingSurface.translate(Math.floor(sprite.x + sprite.halfWidth()), Math.floor(sprite.y + sprite.halfHeight()));
	    drawingSurface.rotate(sprite.rotation * Math.PI / 180);
    
	     if(sprite.visible)
	     {
		     drawingSurface.drawImage
		     (
		       image, 
		       sprite.sourceX, sprite.sourceY, 
		       sprite.sourceWidth, sprite.sourceHeight,
		       Math.floor(-sprite.halfWidth()), Math.floor(-sprite.halfHeight()), 
		       sprite.width, sprite.height
		     );
	     }
	     
       //Restore the drawing surface to its 
       //state before it was rotated
       drawingSurface.restore();
	  }
  }
  
  //Display the game messages
  if(messages.length != 0)
  {
    for(var i = 0; i < messages.length; i++)
	  {
	     var message = messages[i];
	     if(message.visible)
	     {
	       drawingSurface.font = message.font;  
         drawingSurface.fillStyle = message.fillStyle;
         drawingSurface.textBaseline = message.textBaseline;
		     drawingSurface.fillText
		       (message.text, message.x, message.y);  
	     }
	  }
  }
}

}());