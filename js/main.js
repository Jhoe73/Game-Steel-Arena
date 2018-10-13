var Main = function(game){

};

var bodyPhysic_player;
var players = [];
var playersObj = [];
const gravityPlayer = 1800;

Main.prototype = {

	create: function() {

		// Set the background colour to blue
    //me.game.stage.backgroundColor = '#ccddff';

    // Start the P2 Physics Engine
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    // Set the gravity
    this.game.physics.p2.gravity.y = gravityPlayer;

    this.game.physics.p2.restitution = 0;

    //  Create our collision groups. One for the player, one for the pandas
 		this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
  	this.groundCollisionGroup = game.physics.p2.createCollisionGroup();

		background = this.game.add.sprite(0, 0, 'cityscene', 'background');

		//  The platforms group contains the ground and the 2 ledges we can jump on
		/*platforms = this.game.add.group();

		//  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

		platforms.physicsBodyType = Phaser.Physics.P2JS;

		// Here we create the ground.
    ground = platforms.create(0, game.world.height-50, 'ground');

    ground.body.setRectangle(1080, 20);

    //  Tell the panda to use the groundCollisionGroup
    ground.body.setCollisionGroup(this.groundCollisionGroup);

    //  Grounds will collide against themselves and the player
    //  If you don't set this they'll not collide with anything.
    //  The first parameter is either an array or a single collision group.
    ground.body.collides([this.groundCollisionGroup, this.playerCollisionGroup]);

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    //ground.scale.setTo(1, 1);

		//ground.body.setSize(1080, 20, 0, 0);

		// Enable physics, use "true" to enable debug drawing
		this.game.physics.p2.enable(ground);

		ground.body.static = true;*/

		//  Create two static objects
    static1 = game.add.sprite(0, 360, 'ground');
    static2 = game.add.sprite(0, 90, 'ground');

    //  Enable if for physics. This creates a default rectangular body.
    game.physics.p2.enable( [ static1, static2 ]);

    //  Make static
    static1.body.static = true;
		static2.body.static = true;

		//  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

		this.resizePolygon('rbVerdePhysics','rbVerdePhysics.redone', ['rb_verde_D', 'rb_verde_E', 'rb_verde_PD3', 'rb_verde_PE3'], .50);
		//this.resizePolygon('rbVerdePhysics','rbVerdePhysics.80','rb_verde_E', .80);

		for(var i = 0; i < population_players.length; i++){
			player = new this.Player("Player"+(i+1), population_players[i], "rbVerdePhysics.redone", this.playerCollisionGroup, 100+i*100, 120, gravityPlayer, i==0?4:4, controls_players[i][0], controls_players[i][1], controls_players[i][2]);
	    	player.desenhar();
				player.getPlayer().scale.set(.50);
	    	player.formar_fisica();

				playersObj.push(player);
		}
	},

	update: function() {
		for(i = 0; i < population_players.length; i++) {

			players[i].body.velocity.x = 0;

			playersObj[i].verificar_movimento();
		}
	},

	Player: function(namePlayer, spritesheet, physicsKey, collisionGroup, width, height, gravityPlayer, frame, up_button, right_button, left_button){

		this.player;
		this.namePlayer = namePlayer;
		this.spritesheet = spritesheet;
		this.collisionGroup = collisionGroup;
		this.physicsKey = physicsKey;
		this.width = width;
		this.height = height;
		this.gravityPlayer = gravityPlayer;
		this.frame = frame;
		this.collideWorldBounds = true;
		this.up_button = game.input.keyboard.addKey(up_button);
		this.right_button = game.input.keyboard.addKey(right_button);
		this.left_button = game.input.keyboard.addKey(left_button);
		if (this.frame >=0 && this.frame<=3){
			this.direcao = "R";
		} else if (this.frame >=4 && this.frame<=7){
			this.direcao = "L";
		} else if (this.frame >=8 && this.frame<=11) {
			this.direcao = "UPR";
		} else if (this.frame >=12 && this.frame<=15) {
			this.direcao = "UPL";
		}

		this.physic_direita = 'rb_verde_D';
		this.physic_esquerda = 'rb_verde_E';
		this.physic_puloR = 'rb_verde_PD3';
		this.physic_puloL = 'rb_verde_PE3';

		//Getters

		this.getPlayer = function () { return this.player; };
		this.getSpritesheet = function () { return this.spritesheet; };
		this.getCollisionGroup = function () { return this.collisionGroup; };
	  this.getWidth = function () { return this.width; };
	  this.getHeight = function () { return this.height; };
	 	this.getGravityPlayer = function () { return this.gravityPlayer; };
		this.getFrame = function () { return this.frame; };
	  this.getCollideWorldBounds = function () { return this.collideWorldBounds; };
		this.getUp_button = function () { return this.up_button; };
		this.getRight_button = function () { return this.right_button; };
		this.getLeft_button = function () { return this.left_button; };
		this.getDirecao = function () { return this.direcao; };
		this.getPhysic_direita = function () { return this.physic_direita; };
		this.getPhysic_esquerda = function () { return this.physic_esquerda; };
		this.getPhysic_puloR = function () { return this.physic_puloR; };
		this.getPhysic_puloL = function () { return this.physic_puloL; };
		this.getPhysicsKey = function () { return this.physicsKey; };

		//Setters
		this.setPlayer = function (value) { this.player = value; };
	  this.setSpriteseet = function (value) { this.spritesheet = value; };
	  this.setCollisionGroup = function (value) { this.collisionGroup = value; };
	  this.setWidth = function (value) { this.width = value; };
	  this.setHeight = function (value) { this.height = value; };
	  this.setGravityPlayer = function (value) { this.gravityPlayer = value; };
		this.setFrame = function (value) { this.frame = value; };
	  this.setCollideWorldBounds = function (value) { this.collideWorldBounds = value; };
		this.setUp_button = function (value) { this.up_button = value; };
		this.setRight_button = function (value) { this.right_button = value; };
		this.setLeft_button = function (value) { this.left_button = value; };
		this.setDirecao = function (value) { this.direcao = value; };
		this.setPhysic_direita = function (value) { this.physic_direita = value; };
		this.setPhysic_esquerda = function (value) { this.physic_esquerda = value; };
		this.setPhysic_puloR = function (value) { this.physic_puloR = value; };
		this.setPhysic_puloL = function (value) { this.physic_puloL = value; };
		this.setPhysicsKey = function (value) { this.physicsKey = value; };

		//
		this.trocar_fisica = function (sprite_physics, physic) {
			this.getPlayer().body.clearShapes();
			this.getPlayer().body.loadPolygon(sprite_physics, physic);
		}

		this.checkIfCanJump = function() {
			var yAxis = p2.vec2.fromValues(0, 1);
			var result = false;
			for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++){
				var c = game.physics.p2.world.narrowphase.contactEquations[i];
				if (c.bodyA === this.getPlayer().body.data || c.bodyB === this.getPlayer().body.data){
					var d = p2.vec2.dot(c.normalA, yAxis);
					// Normal dot Y-axis
					if (c.bodyA === this.getPlayer().body.data)
					d *= -1;
					if (d > 0.5)
					result = true;
				}
			}
			return result;
		}

		this.desenhar = function() {

			this.setPlayer(game.add.sprite(this.getWidth(), game.world.height-this.getHeight(), this.getSpritesheet()));

			this.animation_direita = this.getPlayer().animations.add('right', [1,0,1,0,2,3,2,3], 9, true);
			this.animation_esquerda = this.getPlayer().animations.add('left', [5,4,5,4,6,7,6,7], 9, true);
			this.animation_puloR = this.getPlayer().animations.add('upR', [9,10,10,11,11,8,0], 25, true);
			this.animation_puloL = this.getPlayer().animations.add('upL', [13,14,14,15,15,12,4], 25, true);

			this.getPlayer().frame = this.getFrame();

			players.push(this.getPlayer());
  	}

  	this.formar_fisica = function (){

	  	// Enable physics, use "true" to enable debug drawing
			game.physics.p2.enable(this.getPlayer(), false);

			this.getPlayer().body.fixedRotation = true;

			//robo.body.damping = 0.5;

			//this.getPlayer().body.loadPolygon(bodyPhysic_player, "rb_verde_D");

			// Add our PhysicsEditor bounding shape
			//this.getPlayer().body.loadPolygon(this.resize_polygon(2), "rb_verde_D");

			//this.getPlayer().body.gravity.y = this.getGravityPlayer();

			//this.getPlayer().body.collideWorldBounds = this.getCollideWorldBounds();

			//this.getPlayer().body.bounce.y = 0;

			//  Set the ships collision group
	  	this.getPlayer().body.setCollisionGroup(this.getCollisionGroup());

	  	// Get rid of current bounding box
			this.getPlayer().body.clearShapes();
			this.getDirecao() == "R"?sidePhysic = this.getPhysic_direita():sidePhysic = this.getPhysic_esquerda();
			this.getPlayer().body.loadPolygon(this.getPhysicsKey(), sidePhysic);
		}

		this.verificar_movimento = function () {

			if (this.getRight_button().isDown && !this.getLeft_button().isDown){
	      //  Move to the right
				this.setDirecao("R");
				this.getPlayer().body.moveRight(100);
				if (!(this.animation_direita.isPlaying || this.animation_puloR.isPlaying || this.animation_puloL.isPlaying)) {
					this.getPlayer().animations.play('right', false, false);
					this.trocar_fisica(this.getPhysicsKey(), this.getPhysic_direita());
				}
			} else if (this.animation_direita.isPlaying) {
				this.getPlayer().frame = 0;
			}

			if (this.getLeft_button().isDown && !this.getRight_button().isDown){
	    	//  Move to the left
				this.setDirecao("L");
				this.getPlayer().body.moveLeft(100);
				if (!(this.animation_esquerda.isPlaying || this.animation_puloL.isPlaying || this.animation_puloR.isPlaying)) {
					this.getPlayer().animations.play('left', false, false);
					this.trocar_fisica(this.getPhysicsKey(), this.getPhysic_esquerda());
				}
		  } else if (this.animation_esquerda.isPlaying) {
				this.getPlayer().frame = 4;
			}

			//  Allow the robo to jump if they are touching the ground.
	    if (this.getUp_button().isDown && this.checkIfCanJump()){
		  	if (!(this.animation_puloR.isPlaying || this.animation_puloL.isPlaying)) {
					this.getPlayer().body.moveUp(750);
					switch (this.getDirecao()) {
						case "R":
							this.setDirecao("UPR");
							this.getPlayer().animations.play('upR',false, false);
							this.trocar_fisica(this.getPhysicsKey(), this.getPhysic_puloR());
							break;
				 		case "L":
							this.setDirecao("UPL");
					 		this.getPlayer().animations.play('upL',false, false);
							this.trocar_fisica(this.getPhysicsKey(), this.getPhysic_puloL());
				 			break;
						default:
					  	break;
					}
		 		}
	    } else if (this.animation_puloR.isPlaying || this.animation_puloL.isPlaying) {
				switch (this.getDirecao()) {
					case "UPR":
					case "R":
						this.animation_puloR.onComplete.add(function () {
						  	this.getPlayer().frame = 0;
								this.setDirecao("R");
								this.trocar_fisica(this.getPhysicsKey(), this.getPhysic_direita());
						}, this);
						break;
					case "UPL":
					case "L":
						this.animation_puloL.onComplete.add(function () {
						  	this.getPlayer().frame = 4;
								this.setDirecao("L");
								this.trocar_fisica(this.getPhysicsKey(), this.getPhysic_esquerda());
						}, this);
						break;
					default:
						break;
				}
		}
		}
	},

	resizePolygon: function(originalPhysicsKey, newPhysicsKey, shapeKeys, scale){
	  var newData = [];
		var item = {};
		for(var x = 0; x < shapeKeys.length; x++) {
			var data = this.game.cache.getPhysicsData(originalPhysicsKey, shapeKeys[x]);
		  for (var i = 0; i < data.length; i++) {
		    var vertices = [];
		    for (var j = 0; j < data[i].shape.length; j += 2) {
		      vertices[j] = data[i].shape[j] * scale;vertices[j+1] = data[i].shape[j+1] * scale;
		    }
		    newData.push({shape : vertices});
		  }
			item[shapeKeys[x]] = newData;
			newData = [];
		}

	  game.load.physics(newPhysicsKey, '', item);

	},

	render: function() {

	},

	gameOver: function(){
		this.game.state.start('GameOver');
	}

};
