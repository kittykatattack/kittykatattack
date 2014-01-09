var game = game || {};
game.spriteObject =
{
  sourceX: undefined,
  sourceY: undefined,
  sourceWidth: 64,
  sourceHeight: 64,
	visible: true,
	body: null,
	color: "rgba(200,0,0,1)",
	shape: "",
	polygonWidth: 0,
	polygonHeight: 0,
		
	initialize: function(config)
	{ 
		//Dependencies
		var b2Vec2 = config.Box2D.Common.Math.b2Vec2,
				b2BodyDef = config.Box2D.Dynamics.b2BodyDef,
				b2Body = config.Box2D.Dynamics.b2Body,
				b2FixtureDef = config.Box2D.Dynamics.b2FixtureDef,
				b2Fixture = config.Box2D.Dynamics.b2Fixture,
				b2PolygonShape = config.Box2D.Collision.Shapes.b2PolygonShape,
				b2CircleShape = config.Box2D.Collision.Shapes.b2CircleShape;
			
		//Set this object's properties	
	  this.shape = config.shape;
		this.color = config.color;
		this.sourceX = config.sourceX;
		this.sourceY = config.sourceY;
		if(config.sourceWidth && config.sourceHeight !== null)
		{
		  this.sourceWidth = config.sourceWidth;
		  this.sourceHeight = config.sourceHeight;
		}
			
		//Create the box2D sprite
    var bodyDef = new b2BodyDef;
			
		//Set the type of body
		switch(config.bodyType)
		{ 
			case "static":				
    		bodyDef.type = b2Body.b2_staticBody;
				break;
						
			case "dynamic":
				bodyDef.type = b2Body.b2_dynamicBody;
				break;
						
			case "kinematic":
				bodyDef.type = b2Body.b2_kinematicBody;
		}
						
		//Set the body's position and angle if the shape a box, circle or polygon			
		if(config.shape !== "edge")
		{
      bodyDef.position.Set(config.x, config.y);
		  bodyDef.angle = config.angle;
		}
		bodyDef.userData = this;
		this.body = config.world.CreateBody(bodyDef);
																
    var fixtureDef = new b2FixtureDef;
		fixtureDef.density = config.density;
    fixtureDef.friction = config.friction;
    fixtureDef.restitution = config.restitution;
		
		//Set the type of shape
		switch(config.shape)
		{
			case "box":
        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.shape.SetAsBox(config.width / 2, config.height / 2);
				this.body.CreateFixture(fixtureDef);
				break;
						
			case "circle":
				fixtureDef.shape = new b2CircleShape(config.radius);
				this.body.CreateFixture(fixtureDef);
				break;
						
			case "edge":
				fixtureDef.shape = new b2PolygonShape;
				fixtureDef.shape.SetAsEdge(new b2Vec2(config.startX, config.startY), new b2Vec2(config.endX, config.endY));	
				this.body.CreateFixture(fixtureDef);
				break;
			
			case "polygon":
				fixtureDef.shape = new b2PolygonShape;
				fixtureDef.shape.SetAsArray(config.vertices);	
				this.body.CreateFixture(fixtureDef);
				break;
			
			case "jumpingObject":
        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.shape.SetAsBox(config.width / 2, config.height / 2);
				this.body.CreateFixture(fixtureDef);
				var footFixture = new b2FixtureDef(); 
        footFixture.shape = new b2PolygonShape();
        footFixture.shape.SetAsOrientedBox((config.width / 2) - 0.1, config.height / 4, new b2Vec2(0, config.height / 2), 0);
				footFixture.isSensor = true;
				footFixture.userData = "foot";
				this.body.CreateFixture(footFixture);
				var rightFixture = new b2FixtureDef(); 
				rightFixture.shape = new b2PolygonShape();
        rightFixture.shape.SetAsOrientedBox(config.width / 4, config.height / 2, new b2Vec2(config.height / 4, 0), 0);
				rightFixture.isSensor = true;
				rightFixture.userData = "right";
				this.body.CreateFixture(rightFixture);
				var leftFixture = new b2FixtureDef(); 
				leftFixture.shape = new b2PolygonShape();
        leftFixture.shape.SetAsOrientedBox(config.width / 4, config.height / 2, new b2Vec2(0, 0), 0);
				leftFixture.isSensor = true;
				leftFixture.userData = "left";
				this.body.CreateFixture(leftFixture);
      
				break;
		}
    
		
		/*
		fixtureDef.shape.SetAsBox(config.width, config.height / 5, new b2Vec2(0, -2), 0);
    fixtureDef.shape.isSensor = true;
		var footSensorFixture = new b2FixtureDef
    footSensorFixture = this.body.CreateFixture(fixtureDef);
    footSensorFixture.userData = 3;
		*/
						
		//Calculate the width and height of a polygon's bounding box when
		//it's first created. This is useful so that you know the exact square
		//dimensions of the polygon so that you can correctly map images onto it
		if(config.shape === "polygon")
		{
			var aabb = this.body.GetFixtureList().m_aabb;
			this.polygonWidth = aabb.upperBound.x - aabb.lowerBound.x;
			this.polygonHeight = aabb.upperBound.y - aabb.lowerBound.y;
		}
  },
	
	//Functions to help find the height of width of the polygon bounding
	//box when it's first created
						
	//Optional extend function					
	extend: function(properties) 
	{
    var property, 
				object,
			
    object = Object.create(this);
    for(property in properties) 
		{
      if(properties.hasOwnProperty(property)) 
			{
         object[property] = properties[property];
      }
    }
    return object;
  }
						
	/*
  Find the body properties like this:
  Angle: this.body.GetAngle()
  X: this.body.GetPosition().x
  Y: this.body.GetPosition().y
  VX: this.body.GetLinearVelocity().x
  VY: this.body.GetLinearVelocity().y
  userData: this.body.m_userData
  
  Change fixture properties like this:
  fixture.SetDensity( ... ); // Any value
  fixture.SetRestitution( ... ); // From 0 to 1
  fixture.SetFriction( ... ); // From 0 to 1
  */
};

//You can extend the spriteObject like this:		
var extendedObject = game.spriteObject.extend
({
  type: "extendedObject",
});

game.scenerySpriteObject =
{
	sourceX: undefined,
  sourceY: undefined,
  sourceWidth: 64,
  sourceHeight: 64,
	x: 0,
	y: 0,
	width: 64,
	height: 64,
	visible: true
}
			
