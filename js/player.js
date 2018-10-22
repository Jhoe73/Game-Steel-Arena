function Player(playerName, spritesheet, physicsKey, collisionGroup, width, height, gravityPlayer, frame, up_button, right_button, left_button, shoot_button){

	this.player;
	this.playerName = playerName;
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
	this.shoot_button = game.input.keyboard.addKey(shoot_button);
	this.physic_direita = spritesheet+"_D";
	this.physic_esquerda = spritesheet+"_E";
	this.physic_puloR = spritesheet+"_PD4";
	this.physic_puloL = spritesheet+"_PE4";
	if (this.frame >=0 && this.frame<=1){
		this.direcao = "R";
		this.corrent_physic = this.physic_direita;
	} else if (this.frame >=2 && this.frame <=3) {
		this.direcao = "L";
		this.corrent_physic = this.physic_esquerda;
	} else if (this.frame >=4 && this.frame <=7) {
		this.direcao = "UPR";
		this.corrent_physic = this.physic_puloR;
	} else if (this.frame >=8 && this.frame <=11) {
		this.direcao = "UPL";
		this.corrent_physic = this.physic_puloL;
	}

	this.bulletsGroup;
	this.number_of_bullets = 3;
	this.number_of_kills = 0;
	this.SHOT_DELAY = 200;
	this.BULLET_SPEED = 900;
	this.GRAVITY = 1800;

	//Getters
	this.getPlayer = function () { return this.player; };
	this.getPlayerName = function () { return this.playerName; };
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
	this.getShoot_button = function () { return this.shoot_button; };
	this.getDirecao = function () { return this.direcao; };
	this.getPhysic_direita = function () { return this.physic_direita; };
	this.getPhysic_esquerda = function () { return this.physic_esquerda; };
	this.getPhysic_puloR = function () { return this.physic_puloR; };
	this.getPhysic_puloL = function () { return this.physic_puloL; };
	this.getPhysicsKey = function () { return this.physicsKey; };

	this.getNumber_of_bullets = function () { return this.number_of_bullets; };
	this.getNumber_of_kills = function () { return this.number_of_kills; };
	this.getSHOT_DELAY = function () { return this.SHOT_DELAY; };
	this.getBULLET_SPEED = function () { return this.BULLET_SPEED; };
	this.getGRAVITY = function () { return this.GRAVITY; };

	//Setters
	this.setPlayer = function (value) { this.player = value; };
	this.setPlayerName = function (value) { this.playerName = value; };
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
	this.setShoot_button = function (value) { this.shoot_button = value; };
	this.setDirecao = function (value) { this.direcao = value; };
	this.setPhysic_direita = function (value) { this.physic_direita = value; };
	this.setPhysic_esquerda = function (value) { this.physic_esquerda = value; };
	this.setPhysic_puloR = function (value) { this.physic_puloR = value; };
	this.setPhysic_puloL = function (value) { this.physic_puloL = value; };
	this.setPhysicsKey = function (value) { this.physicsKey = value; };

	this.setNumber_of_bullets = function (value) { this.number_of_bullets = value; };
	this.setNumber_of_kills = function (value) { this.number_of_kills = value; };
	this.setSHOT_DELAY = function (value) { this.SHOT_DELAY = value; };
	this.setBULLET_SPEED = function (value) { this.BULLET_SPEED = value; };
	this.setGRAVITY = function (value) { this.GRAVITY = value; };

	//
	this.trocar_fisica = function (sprite_physics, physic) {
		this.getPlayer().body.clearShapes();
		this.getPlayer().body.loadPolygon(sprite_physics, physic);
  	this.getPlayer().body.setCollisionGroup(this.getCollisionGroup());
		this.getPlayer().body.collides([this.getCollisionGroup(), groundCollisionGroup, bulletCollisionGroup]);
		this.getPlayer().body.collides(groundCollisionGroup, this.player_on_ground, this);
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
				if (d > .5)
				result = true;
			}
		}
		return result;
	}

	this.desenhar = function() {

		this.setPlayer(game.add.sprite(this.getWidth(), this.getHeight(), this.getSpritesheet()));

		this.getPlayer().name = this.getPlayerName();

		this.animation_direita = this.getPlayer().animations.add('right', [1,0,1,0], 9, true);
		this.animation_esquerda = this.getPlayer().animations.add('left', [2,3,2,3], 9, true);
		this.animation_puloR = this.getPlayer().animations.add('upR', [4,5,5,6,6,7,7,0], 25, true);
		this.animation_puloL = this.getPlayer().animations.add('upL', [8,9,9,10,10,11,11,2], 25, true);

		this.getPlayer().frame = this.getFrame();
	}

	this.formar_fisica = function (){

		game.physics.p2.enable(this.getPlayer(), false);

		this.getPlayer().body.clearShapes();
		this.getDirecao() == "R"?sidePhysic = this.getPhysic_direita():sidePhysic = this.getPhysic_esquerda();
		this.getPlayer().body.loadPolygon(this.getPhysicsKey(), sidePhysic);

		this.getPlayer().body.fixedRotation = true;

		this.getPlayer().body.mass = 15;

  	this.getPlayer().body.setCollisionGroup(this.getCollisionGroup());

		this.getPlayer().body.collides(this.getCollisionGroup(), this.player_on_player, this);
		this.getPlayer().body.collides(groundCollisionGroup, this.player_on_ground, this);
		this.getPlayer().body.collides(bulletCollisionGroup);

	}

	this.verificar_movimento = function () {

		if (this.getRight_button().isDown && !this.getLeft_button().isDown){
      //  Move to the right
			this.setDirecao("R");
			this.getPlayer().body.moveRight(150);
			if (!(this.animation_direita.isPlaying || this.animation_puloR.isPlaying || this.animation_puloL.isPlaying)) {
				this.getPlayer().animations.play('right', false, false);
				if (!(this.corrent_physic == this.getPhysic_direita())) {
					this.trocar_fisica(this.getPhysicsKey(), this.getPhysic_direita());
					this.corrent_physic = this.getPhysic_direita();
				}
			}
		} else if (this.animation_direita.isPlaying) {
			this.getPlayer().frame = 0;
		}

		if (this.getLeft_button().isDown && !this.getRight_button().isDown){
    	//  Move to the left
			this.setDirecao("L");
			this.getPlayer().body.moveLeft(150);
			if (!(this.animation_esquerda.isPlaying || this.animation_puloL.isPlaying || this.animation_puloR.isPlaying)) {
				this.getPlayer().animations.play('left', false, false);
				if (!(this.corrent_physic === this.getPhysic_esquerda())) {
					this.trocar_fisica(this.getPhysicsKey(), this.getPhysic_esquerda());
					this.corrent_physic = this.getPhysic_esquerda();
				}
			}
	  } else if (this.animation_esquerda.isPlaying) {
			this.getPlayer().frame = 2;
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
					  	this.getPlayer().frame = 2;
							this.setDirecao("L");
							this.trocar_fisica(this.getPhysicsKey(), this.getPhysic_esquerda());
					}, this);
					break;
				default:
					break;
			}
		}
	}

	this.create_bullet = function() {

		this.bulletsGroup = game.add.group();

	}

	this.shootBullet = function() {
			if (this.getNumber_of_bullets() > 0) {

				if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
				if (game.time.now - this.lastBulletShotAt < this.getSHOT_DELAY()) return;
				this.lastBulletShotAt = game.time.now;

				var bullet = this.bulletsGroup.create(400, 200, 'bullet');
				bullet.anchor.setTo(0.5);
				bullet.scale.setTo(0.40);

				game.physics.p2.enable(bullet, false);

				bullet.body.setMaterial(bulletMaterial);

				bullet.body.immovable = false;

				bullet.body.data.gravityScale = 0.20;

				bullet.body.setCollisionGroup(bulletCollisionGroup);

				bullet.body.collides(playerCollisionGroup, this.bullet_on_player, this);
				bullet.body.collides(groundCollisionGroup, this.bullet_on_ground, this);
				bullet.body.collides(bulletCollisionGroup, this.bullet_on_bullet, this);

				bullet.checkWorldBounds = true;
				bullet.outOfBoundsKill = true;

				if(this.getDirecao() == "L" || this.getDirecao() == "UPL"){
					bullet.reset(this.getPlayer().x-45, this.getPlayer().y-5);
					bullet.rotation = 3.2;
				} else if (this.getDirecao() == "R" || this.getDirecao() == "UPR") {
					bullet.reset(this.getPlayer().x+45, this.getPlayer().y-5);
					bullet.rotation = -0.06;
				}

				bullet.body.velocity.x = Math.cos(bullet.rotation) * this.getBULLET_SPEED();
				bullet.body.velocity.y = Math.sin(bullet.rotation) * this.getBULLET_SPEED();

				shootSound = game.add.audio('shoot');
				shootSound.play();
				shootSound.volume = volumeSound*0.065;

				this.number_of_bullets--;
				change_bullet_scoregorund();
			}
	}

	this.setCollision = function (object, collisions){
		this.object = object;
		this.colisions = collisions;
		for (var i = 0; i < collisions.length; i++) {
			object.body.collides(collisions[i]);
		}
	}

	this.bullet_on_player = function (bullet, player) {
		if (!bullet.hasCollided) {
			player.sprite.kill();
			this.number_of_kills++;
			coinSound = game.add.audio('coin');
			coinSound.play();
			coinSound.volume = volumeSound*0.1;
			if (this.number_of_kills < 3) {
				change_kills_scoregorund();
				change_round();
			} else {
				winner = this.getPlayer();
				gameOver();
			}
			bullet.hasCollided = true;
		}
	}

	this.player_on_bullet = function (bullet, player) {
		if (!bullet.hasCollided) {
			bullet.clearShapes();
			bullet.sprite.kill();
			bullet_collectSound = game.add.audio('bullet_collect');
			bullet_collectSound.play();
			bullet_collectSound.volume = volumeSound*0.08;
			coletor = player.sprite.name.replace(/[^0-9]/g,'');
	    coletor = parseInt(coletor);
			playersObj[coletor-1].number_of_bullets++;
			bullet.hasCollided = true;
			change_bullet_scoregorund();
		}
	}

	this.player_on_ground = function (body1, body2) {
	  //console.log('No chão');
	}

	this.player_on_player = function (body1, body2) {
	  //console.log('No Player');
	}

	this.bullet_on_ground = function (bullet, ground) {
		//console.log('bala no chão');
		bullet.sprite.body.static = true;
		bullet.sprite.body.setZeroVelocity();
	  bullet.sprite.body.allowGravity = false;
		bullet.sprite.body.fixedRotation = true;
		bullet.sprite.body.clearCollision(true);
		bullet.sprite.body.setCollisionGroup(bulletCollisionGroup);
		bullet.sprite.body.collides(playerCollisionGroup, this.player_on_bullet, this);
		bullet.sprite.body.collides(groundCollisionGroup);
		bullet.sprite.body.collides(bulletCollisionGroup);

		bullet_collisionSound = game.add.audio('bullet_collision');
		bullet_collisionSound.play();
		bullet_collisionSound.volume = volumeSound*0.04;
	}

	this.bullet_on_bullet = function (bullet, bullet2) {
		if (!bullet.hasCollidedB) {
			bullet.sprite.body.setZeroVelocity();
		  bullet.sprite.body.allowGravity = false;
			bullet.sprite.body.clearCollision(true);
			bullet.sprite.body.setCollisionGroup(bulletCollisionGroup);
			bullet.sprite.body.collides(playerCollisionGroup, this.player_on_bullet, this);
			bullet.sprite.body.collides(groundCollisionGroup);
			bullet.sprite.body.collides(bulletCollisionGroup);

			bullet2.sprite.body.setZeroVelocity();
		  bullet2.sprite.body.allowGravity = false;
			bullet2.sprite.body.clearCollision(true);
			bullet2.sprite.body.setCollisionGroup(bulletCollisionGroup);
			bullet2.sprite.body.collides(playerCollisionGroup, this.player_on_bullet, this);
			bullet2.sprite.body.collides(groundCollisionGroup);
			bullet2.sprite.body.collides(bulletCollisionGroup);

			bullet_collisionSound = game.add.audio('bullet_collision');
			bullet_collisionSound.play();
			bullet_collisionSound.volume = volumeSound*0.04;

			bullet.hasCollidedB = true;
		}
	}
}

function resizePolygon(originalPhysicsKey, newPhysicsKey, shapeKeys, scale){
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

}
