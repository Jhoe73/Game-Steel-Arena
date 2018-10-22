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

		background = game.add.sprite(0, 0, 'background');
		background.scale.setTo(1, 1.8);

		graphics = this.game.add.graphics();

		graphics.beginFill(0x59677e);

		scoreboard = graphics.drawRect(0, 0, 1920, 150);

		playerImg1 = this.game.add.sprite(150, -30, population_players[0][0]);
		playerImg1.scale.setTo(1.2);

		playerImg2 = this.game.add.sprite(1650, -30, population_players[1][0], 2);
		playerImg2.scale.setTo(1.2);

		pauseText = game.add.text(game.world.centerX, 30, 'Pause', titleM);
		pauseText.anchor.setTo(.55, 0);
		pauseText.inputEnabled = true;
		pauseText.events.onInputUp.add(function () {
			game.paused = true;
			pauseNoticeText = game.add.text(game.world.centerX, game.world.centerY, 'Paused', msgRedEL);
			pauseNoticeText.anchor.setTo(.5, 0);
			pauseNoticeText.resolution = 4;
			pauseNoticeText2 = game.add.text(game.world.centerX, game.world.centerY+50, 'Click on Screen', msgRedM);
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

		exitText = game.add.text(game.world.centerX, 80, 'Exit ', titleM);
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

    var groundGroup = this.game.add.group();

		ground = createGround(0, 152, 2, .2, 'ground2');
		groundGroup.add(ground);

		ground = createGround(100, 380, .08, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(1065, 380, .065, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(1900, 380, .07, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(600, 520, .08, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(1500, 520, .07, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(1850, 660, .04, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(120, 635, .08, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(1000, 650, .04, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(930, 790, .09, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(1800, 790, .08, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(400, 930, .065, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(1500, 930, .08, .3, 'ground2');
		groundGroup.add(ground);

		ground = createGround(0, 1080, 2, 1, 'ground2');
		groundGroup.add(ground);

    cursors = game.input.keyboard.createCursorKeys();

		for(var i = 0; i < population_players.length; i++){
			if(!(population_players[i][1] == population_players[i][0]+"Physics.redone")){
				resizePolygon(population_players[i][1],population_players[i][1]+'.redone', [population_players[i][0]+'_D', population_players[i][0]+'_E', population_players[i][0]+'_PD4', population_players[i][0]+'_PE4'], .7);
				population_players[i][1] = population_players[i][1]+'.redone';
			}
			var player = new Player("Player"+(i+1), population_players[i][0], population_players[i][1], playerCollisionGroup, 50+i*1800, 250, gravityPlayer, i==0?0:2, controls_players[i][0], controls_players[i][1], controls_players[i][2], controls_players[i][3]);
	    	player.desenhar();
				player.getPlayer().scale.set(.7);
	    	player.formar_fisica();
				player.create_bullet();
				players.push(player.getPlayer());
				playersObj.push(player);
		}

		bulletsGroupScore = game.add.group();
		killsGroupsScore = game.add.group();

		change_bullet_scoregorund();
		change_kills_scoregorund();

		if (musicPlaying) {
			music.stop();
			musicPlaying = false;
			music = "";
		}

		start_gameSound = game.add.audio('start_game');
		start_gameSound.play();
		start_gameSound.volume = volumeSound*0.1;

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

function createGround(x, y, sx, sy, key){
	var ground = game.add.sprite(x, y, 'ground2');

	ground.scale.set(sx, sy);

	game.physics.p2.enable(ground, false);

	ground.body.setMaterial(groundMaterial);

	ground.body.static = true;

	ground.body.setCollisionGroup(groundCollisionGroup);

	ground.body.collides([bulletCollisionGroup, playerCollisionGroup]);

	return ground;
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
		players[i].reset(100+i*1700, 200);
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
				bulletImg = bulletsGroupScore.create(50, (j*20)-2, 'bullet');
				bulletImg.scale.setTo(.8);
			} else {
				bulletImg = bulletsGroupScore.create(1820, (j*20)-2, 'bullet');
				bulletImg.scale.setTo(.8);
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
				killsImg = killsGroupsScore.create((j*80)+250, 40, 'coin');
				killsImg.scale.setTo(1);
			} else {
				killsImg = killsGroupsScore.create((j*-80)+1620, 40, 'coin');
				killsImg.scale.setTo(1);
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
