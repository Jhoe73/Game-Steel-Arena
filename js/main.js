var Main = function(game){

};

var bodyPhysic_player;
var players = [];
var playersObj = [];
var playerCollisionGroup;
var bulletCollisionGroup;
var groundCollisionGroup;
var bulletsGroupScore;
var killsGroupsScore;
const gravityPlayer = 1800;

Main.prototype = {

	create: function() {

		// Set the background colour to blue
    this.game.stage.backgroundColor = '#ffffff';

		//background = this.game.add.sprite(0, 0, 'cityscene', 'background');

		graphics = this.game.add.graphics();

		graphics.beginFill(0x59677e);

		scoreboard = graphics.drawRect(0, 0, 800, 70);

		playerImg1 = this.game.add.sprite(55, -20, population_players[0][0]);
		playerImg1.scale.setTo(.6);

		playerImg2 = this.game.add.sprite(685, -20, population_players[1][0], 2);
		playerImg2.scale.setTo(.6);

		pauseText = game.add.text(game.world.centerX, 20, 'Pause', titleES);
		pauseText.anchor.setTo(.55, 0);
		pauseText.inputEnabled = true;
		pauseText.events.onInputUp.add(function () {
			game.paused = true;
			pauseNoticeText = game.add.text(game.world.centerX, game.world.centerY, 'Paused', msgRedL);
			pauseNoticeText.anchor.setTo(.5, 0);
			pauseNoticeText.resolution = 4;
			pauseNoticeText2 = game.add.text(game.world.centerX, game.world.centerY+50, 'Click on Screen', msgRedS);
			pauseNoticeText2.anchor.setTo(.5, 0);
			pauseNoticeText2.resolution = 4;
		});

		game.input.onDown.add(unpause, self);

		function unpause(event){
			if(game.paused){
				pauseNoticeText.destroy();
				pauseNoticeText2.destroy();
				game.paused = false;
			}
		}

		exitText = game.add.text(game.world.centerX, 40, 'Exit ', titleES);
		exitText.anchor.setTo(.5, 0);
		exitText.inputEnabled = true;
		exitText.events.onInputDown.add(this.actionOnClickExit, this);

    this.game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.setImpactEvents(true);

    this.game.physics.p2.gravity.y = gravityPlayer;

    this.game.physics.p2.restitution = 0;

 		playerCollisionGroup = game.physics.p2.createCollisionGroup();
		bulletCollisionGroup = game.physics.p2.createCollisionGroup();
  	groundCollisionGroup = game.physics.p2.createCollisionGroup();

		game.physics.p2.updateBoundsCollisionGroup();

		bulletMaterial = game.physics.p2.createMaterial();
    groundMaterial = game.physics.p2.createMaterial();

		game.physics.p2.createContactMaterial(bulletMaterial, groundMaterial, {
      friction: 1 , restitution: 0
    });
    game.physics.p2.createContactMaterial(bulletMaterial, bulletMaterial, {
      friction: 1 , restitution: 0
    });

    var ground = this.game.add.group();

		var floor = game.add.sprite(0, 380, 'ground');

		game.physics.p2.enable(floor, false);

		floor.body.setMaterial(groundMaterial);

		floor.body.static = true;

		floor.body.setCollisionGroup(groundCollisionGroup);

		floor.body.collides([bulletCollisionGroup, playerCollisionGroup]);


		var floor = game.add.sprite(0, 250, 'ground');

		floor.scale.set(.2, .5);

		game.physics.p2.enable(floor, false);

		floor.body.setMaterial(groundMaterial);

		floor.body.static = true;

		floor.body.setCollisionGroup(groundCollisionGroup);

		floor.body.collides([bulletCollisionGroup, playerCollisionGroup]);


		var floor = game.add.sprite(800, 250, 'ground');

		floor.scale.set(.2, .5);

		game.physics.p2.enable(floor, false);

		floor.body.setMaterial(groundMaterial);

		floor.body.static = true;

		floor.body.setCollisionGroup(groundCollisionGroup);

		floor.body.collides([bulletCollisionGroup, playerCollisionGroup]);

		var ceiling = game.add.sprite(0, 70, 'ground');

		ceiling.scale.set(1, .2);

		game.physics.p2.enable(ceiling, false);

		ceiling.body.setMaterial(groundMaterial);

		ceiling.body.static = true;

		ceiling.body.setCollisionGroup(groundCollisionGroup);

		ceiling.body.collides([bulletCollisionGroup, playerCollisionGroup]);

		ground.add(floor);
		ground.add(ceiling);

		ground.forEachAlive(function(ground) {

		}, this);

    cursors = game.input.keyboard.createCursorKeys();

		for(var i = 0; i < population_players.length; i++){
			if(!(population_players[i][1] == population_players[i][0]+"Physics.redone")){
				resizePolygon(population_players[i][1],population_players[i][1]+'.redone', [population_players[i][0]+'_D', population_players[i][0]+'_E', population_players[i][0]+'_PD4', population_players[i][0]+'_PE4'], .4);
				population_players[i][1] = population_players[i][1]+'.redone';
			}
			var player = new Player("Player"+(i+1), population_players[i][0], population_players[i][1], playerCollisionGroup, 50+i*700, 200, gravityPlayer, i==0?0:2, controls_players[i][0], controls_players[i][1], controls_players[i][2], controls_players[i][3]);
	    	player.desenhar();
				player.getPlayer().scale.set(.4);
	    	player.formar_fisica();
				player.create_bullet();
				players.push(player.getPlayer());
				playersObj.push(player);
		}

		bulletsGroupScore = game.add.group();
		killsGroupsScore = game.add.group();

		change_bullet_scoregorund();
		change_kills_scoregorund();

    this.game.input.activePointer.x = this.game.width/2;
    this.game.input.activePointer.y = this.game.height/2;
	},

	update: function() {
		for(i = 0; i < population_players.length; i++) {

			players[i].body.velocity.x = 0;

			playersObj[i].verificar_movimento();

	    if (playersObj[i].getShoot_button().isDown) {
	        playersObj[i].shootBullet();
	    }
		}

		if (!game.scale.isFullScreen){
			statusFull = "OFF";
    }
	},

	render: function() {

	},

	actionOnClickExit: function(){
		players = [];
		playersObj = [];
		population_players = [[],[]];
		previousState = "Main";
		this.game.state.start('GameTitle');
	}
}

function change_round() {
	bulletsGroupScore.forEachAlive(function(bulletsScore) {
		bulletsScore.kill();
	}, this);

	for (var i = 0; i < population_players.length; i++) {

		playersObj[i].bulletsGroup.forEachAlive(function(bullet) {
			bullet.kill();
			bullet.body.clearShapes();
		}, this);

		playersObj[i].setNumber_of_bullets(3);
		players[i].reset(50+i*700, 200);
	}

	change_bullet_scoregorund();
}

function change_bullet_scoregorund() {
	bulletsGroupScore.forEachAlive(function(bulletsScore) {
		bulletsScore.kill();
	}, this);

	for (var i = 0; i < population_players.length; i++) {
		for (var j = 1; j <= playersObj[i].getNumber_of_bullets(); j++) {
			if(i == 0){
				bulletImg = bulletsGroupScore.create(15, (j*10)-5, 'bullet');
				bulletImg.scale.setTo(.35);
			} else {
				bulletImg = bulletsGroupScore.create(765, (j*10)-5, 'bullet');
				bulletImg.scale.setTo(.35);
			}

		}
	}
}

function change_kills_scoregorund() {
	killsGroupsScore.forEachAlive(function(killsScore) {
		killsScore.kill();
	}, this);

	for (var i = 0; i < population_players.length; i++) {
		for (var j = 1; j <= playersObj[i].getNumber_of_kills(); j++) {
			if(i == 0){
				killsImg = killsGroupsScore.create((j*30)+110, 25, 'coin');
				killsImg.scale.setTo(.4);
			} else {
				killsImg = killsGroupsScore.create((j*-30)+670, 25, 'coin');
				killsImg.scale.setTo(.4);
			}
		}
	}
}

function gameOver(){
	players = [];
	playersObj = [];
	previousState = "Main";
	this.game.state.start('GameOver');
}
