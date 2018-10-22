var PlayerSelect = function(game){

};

var playersImg = [];
var personsSelected = [];
var rights = [];

PlayerSelect.prototype = {

	create: function(){
		background = game.add.sprite(0, 0, 'background');
		background.scale.setTo(1, 1.8);

		graphics = this.game.add.graphics();
		graphics.beginFill(0x59677e);
		graphics.lineStyle(4, 0x04ebd6, 1);

		playerImg1 = this.game.add.sprite(game.world.centerX-500, 300, 'rb_verde', 0);
		playerImg1.scale.setTo(2);
		playersImg[1] = playerImg1;
		right1 = this.game.add.sprite(game.world.centerX-410, 450, 'right');
		right1.scale.setTo(2);
		right1.kill();
		rights[1] = right1;

		population_players[0].push(existing_players[0][0],existing_players[0][1]);

		changeP1L = drawTriangle(game.world.centerX-600, 420, 0x59677e, 0x04ebd6, "l");
		changeP1L.events.onInputDown.add(function(){this.changePerson("1", "l")}, this);
		changeP1R = drawTriangle(game.world.centerX-200, 420, 0x59677e, 0x04ebd6, "r");
		changeP1R.events.onInputDown.add(function(){this.changePerson("1", "r")}, this);

		playerImg2 = this.game.add.sprite(game.world.centerX+350, 300, 'rb_vermelho', 2);
		playerImg2.scale.setTo(2);
		playersImg[2] = playerImg2;
		right2 = this.game.add.sprite(game.world.centerX+450, 450, 'right');
		right2.scale.setTo(2);
		right2.kill();
		rights[2] = right2;

		population_players[1].push(existing_players[1][0],existing_players[1][1]);

		changeP2L = drawTriangle(game.world.centerX+250, 420, 0x59677e, 0x04ebd6, "l");
		changeP2L.events.onInputDown.add(function(){this.changePerson("2", "l")}, this);

		changeP2R = drawTriangle(game.world.centerX+650, 420, 0x59677e, 0x04ebd6, "r");
		changeP2R.events.onInputDown.add(function(){this.changePerson("2", "r")}, this);

		spaceConfirmImg1 = drawRetangle(game.world.centerX-550, 650, 300, 50, 0x59677e, 0x04ebd6);
		spaceConfirmImg1.events.onInputDown.add(function(){this.actionOnClickConfirmText(1)}, this);
		personsSelected[1] = false;

		confirmText1 = game.add.text(game.world.centerX-510, 655, 'Confirmar ', titleM);
		confirmText1.inputEnabled = true;
		confirmText1.input.useHandCursor = true;
		confirmText1.events.onInputDown.add(function(){this.actionOnClickConfirmText(1)}, this);

		spaceConfirmImg2 = drawRetangle(game.world.centerX+300, 650, 300, 50, 0x59677e, 0x04ebd6);
		spaceConfirmImg2.events.onInputDown.add(function(){this.actionOnClickConfirmText(2)}, this);

		confirmText2 = game.add.text(game.world.centerX+340, 655, 'Confirmar ', titleM);
		confirmText2.inputEnabled = true;
		confirmText2.input.useHandCursor = true;
		confirmText2.events.onInputDown.add(function(){this.actionOnClickConfirmText(2)}, this);
		personsSelected[2] = false;

		button_back = game.add.button(80, 950, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.7);

		button_continue = this.game.add.button(1850, 950, 'button_continue', this.actionOnClickContinue, this);
		button_continue.onInputOver.add(this.overContinue, this);
		button_continue.onInputOut.add(this.outContinue, this);
		button_continue.scale.setTo(.7);
		button_continue.anchor.setTo(1, 0);

		function drawTriangle(x, y, fill, style, direction) {

			direction == "r"?x1=x+40:x1=x-40;

			poly = new Phaser.Polygon([
				new Phaser.Point(x, y),
				new Phaser.Point(x, y+120),
				new Phaser.Point(x1, y+60),
				new Phaser.Point(x, y)
			]);

	    draw = this.game.add.graphics();

	    draw.beginFill(fill);
	    draw.lineStyle(2, style, 1);
			draw.drawPolygon(poly.points);
	    draw.endFill();
			draw.hitArea = poly;
			draw.inputEnabled = true;
			draw.input.useHandCursor = true;

			return draw;

		}

		function drawRetangle(x, y, x1, y2, fill, style) {

			poly = new Phaser.Polygon([
				new Phaser.Point(x, y),
				new Phaser.Point(x+x1, y),
				new Phaser.Point(x+x1, y+y2),
				new Phaser.Point(x, y+y2),
				new Phaser.Point(x, y)
			]);

			draw = this.game.add.graphics();

			draw.beginFill(fill);
			draw.lineStyle(2, style, 1);
			draw.drawPolygon(poly.points);
			draw.endFill();
			draw.hitArea = poly;
			draw.inputEnabled = true;
			draw.input.useHandCursor = true;

			return draw;

		}

		if (!musicPlaying) {
			musicPlaying = true;
			music = game.add.audio('music1');
			music.play();
			music.volume = volumeMusic*.05;
			music.loopFull();
		}
	},

	update: function() {
		if (!game.scale.isFullScreen){
			statusFull = "OFF";
    }
	},

	changePerson: function(player, direction) {
		if (direction == 'r') {
			for (var i = 0; i < existing_players.length; i++) {
				if ((existing_players[i][0] != playersImg[player].key) && (personsSelected[player] == false || personsSelected[player] == undefined)) {
					newPlayerImg = this.game.add.sprite(playersImg[player].x, playersImg[player].y, existing_players[i][0], player==1?0:2);
					change();
					break;
				}
			}
		} else {
			for (var i = existing_players.length; i > 0; i--) {
				if ((existing_players[i-1][0] != playersImg[player].key) && (personsSelected[player] == false || personsSelected[player] == undefined)) {
					if (personsSelected[i]) {
						playersImg[player].key != playersImg[i].key
					}
					newPlayerImg = this.game.add.sprite(playersImg[player].x, playersImg[player].y, existing_players[i-1][0], player==1?0:2);
					change();
					break;
				}
			}
		}
		function change(){
			population_players[player-1][0] = newPlayerImg.key;
			population_players[player-1][1] = newPlayerImg.key+"Physics";
			playersImg[player].kill();
			playersImg[player] = newPlayerImg;
		}
	},

	actionOnClickConfirmText: function(player) {
		canConfirm = false;
		for (var i = 0; i < existing_players.length; i++) {
			if (personsSelected[i+1]) {
				if (playersImg[player].key != playersImg[i+1].key) {
					canConfirm = true;
				} else {
					canConfirm = false;
					break;
				}
			} else {
				canConfirm = true;
			}
		}
		if (personsSelected[player] == true) {
				personsSelected[player] = false;
				rights[player].kill();
		} else if (canConfirm) {
				personsSelected[player] = true;
				rights[player].revive();
		}
	},

	overBack: function() {
		button_back.anchor.setTo(.01, .01);
	},

	outBack: function() {
		button_back.anchor.setTo(0, 0);
	},

	actionOnClickGoBack: function(){
		previousState = "PlayerSelect";
		this.game.state.start("GameTitle");
	},

	overContinue: function() {
		button_continue.anchor.setTo(1.01, .01);
	},

	outContinue: function() {
		button_continue.anchor.setTo(1, 0);
	},

	actionOnClickContinue: function() {
		canContinue = false;
		for (var i = 1; i < personsSelected.length; i++) {
			if (personsSelected[i]) {
				canContinue = true;
			} else {
				canContinue = false;
				break;
			}
		}
		if (canContinue) {
			for (var i = 0; i < personsSelected.length; i++) {
				personsSelected[i] = false;
			}
			this.startGame();
		}
	},

	startGame: function(){
		previousState = "PlayerSelect";
		this.game.state.start("Main");
	}

}
