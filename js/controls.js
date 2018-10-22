var Controls = function (game) { };

Controls.prototype = {

	create: function (game) {

		players = ["Player1", "Player2"];
		controls = ["Up:", "Right:", "Left: ", "Shoot: "];

		background = this.game.stage.backgroundColor = '#020f20';

		controlsText = game.add.text(80, 50, 'Controls: ', titleL);

		player1Text = game.add.text(570, 300, 'Player 1 ', titleM);
		player1Text.anchor.setTo(0, 0);

		groupKeys = this.game.add.group();

		for (i = 0; i < controls.length; i++) {
			action = game.add.text(570, 450 + (i * 50), controls[i], titleM);
			action.inputEnabled = true;
			control = game.add.text(750, 450 + (i * 50), this.keyShow(controls_players[0][i]), titleM, groupKeys);
			control.inputEnabled = true;
			control.events.onInputDown.add(this.actionOnClickControl, { key: controls_players[1][i] });
		}

		player2Text = game.add.text(1150, 300, 'Player 2 ', titleM);
		player2Text.anchor.setTo(0, 0);

		for (i = 0; i < controls.length; i++) {
			action = game.add.text(1150, 450 + (i * 50), controls[i], titleM);
			action.inputEnabled = true;
			control = game.add.text(1310, 450 + (i * 50), this.keyShow(controls_players[1][i]), titleM, groupKeys);
			control.inputEnabled = true;
			control.events.onInputDown.add(this.actionOnClickControl, { key: controls_players[1][i] });
		}

		button_back = game.add.button(80, 950, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.7);

		rights = game.add.text(game.world.centerX, 1000, textRights, titleRights);
		rights.anchor.setTo(0.5, 0);
	},

	update: function () {
		if (!game.scale.isFullScreen) {
			statusFull = "OFF";
		}

		if(!control.onInputDown){
			control.inputEnabled = true;
		}
		else if(control.onInputDown) {
			control.inputEnabled = false;
		}
	},

	actionOnClickControl: function (textObj) {
		console.log(this.key);

		groupKeys.forEachAlive(function(keyText) {
			keyText.alpha = 1;
		}, this);


		textObj.alpha = 0.5;

	},

	keyShow: function (key) {
		if (key == Phaser.Keyboard.ENTER) { return "ENTER"; }
		else if (key == Phaser.Keyboard.SPACEBAR) { return "SPACE"; }
		else if (key == Phaser.Keyboard.SHIFT) { return "SHIFT"; }
		else if (key == Phaser.Keyboard.ALT) { return "ALT"; }
		else if (key == Phaser.Keyboard.CTRL) { return "CTRL"; }
		else if (key == Phaser.Keyboard.LEFT) { return "LEFT"; }
		else if (key == Phaser.Keyboard.UP) { return "UP"; }
		else if (key == Phaser.Keyboard.RIGHT) {	return "RIGHT"; }
		else if (key == Phaser.Keyboard.DOWN) {	return "DOWN"; }
		else if (key == Phaser.Keyboard.A) { return "A" }
		else if (key == Phaser.Keyboard.B) { return "B" }
		else if (key == Phaser.Keyboard.C) { return "C" }
		else if (key == Phaser.Keyboard.D) { return "D" }
		else if (key == Phaser.Keyboard.E) { return "E" }
		else if (key == Phaser.Keyboard.F) { return "F" }
		else if (key == Phaser.Keyboard.G) { return "G" }
		else if (key == Phaser.Keyboard.H) { return "H" }
		else if (key == Phaser.Keyboard.I) { return "I" }
		else if (key == Phaser.Keyboard.J) { return "J" }
		else if (key == Phaser.Keyboard.K) { return "K" }
		else if (key == Phaser.Keyboard.L) { return "L" }
		else if (key == Phaser.Keyboard.M) { return "M" }
		else if (key == Phaser.Keyboard.N) { return "N" }
		else if (key == Phaser.Keyboard.O) { return "O" }
		else if (key == Phaser.Keyboard.P) { return "P" }
		else if (key == Phaser.Keyboard.Q) { return "Q" }
		else if (key == Phaser.Keyboard.R) { return "R" }
		else if (key == Phaser.Keyboard.S) { return "S" }
		else if (key == Phaser.Keyboard.T) { return "T" }
		else if (key == Phaser.Keyboard.U) { return "U" }
		else if (key == Phaser.Keyboard.V) { return "V" }
		else if (key == Phaser.Keyboard.W) { return "W" }
		else if (key == Phaser.Keyboard.X) { return "X" }
		else if (key == Phaser.Keyboard.Y) { return "Y" }
		else if (key == Phaser.Keyboard.Z) { return "Z" }
		else if (key == Phaser.Keyboard.ZERO || key == Phaser.Keyboard.NUMPAD_0) { return "0" }
		else if (key == Phaser.Keyboard.ONE || key == Phaser.Keyboard.NUMPAD_1) { return "1" }
		else if (key == Phaser.Keyboard.TWO || key == Phaser.Keyboard.NUMPAD_2) { return "2" }
		else if (key == Phaser.Keyboard.THREE || key == Phaser.Keyboard.NUMPAD_3) { return "3" }
		else if (key == Phaser.Keyboard.FOUR || key == Phaser.Keyboard.NUMPAD_4) { return "4" }
		else if (key == Phaser.Keyboard.FIVE || key == Phaser.Keyboard.NUMPAD_5) { return "5" }
		else if (key == Phaser.Keyboard.SIX || key == Phaser.Keyboard.NUMPAD_6) { return "6" }
		else if (key == Phaser.Keyboard.SEVEN || key == Phaser.Keyboard.NUMPAD_7) { return "7" }
		else if (key == Phaser.Keyboard.EIGHT || key == Phaser.Keyboard.NUMPAD_8) { return "8" }
		else if (key == Phaser.Keyboard.NINE || key == Phaser.Keyboard.NUMPAD_9) { return "9" }
		else {
			return "-----"
		}
	},

	overBack: function () {
		button_back.anchor.setTo(.01, .01);
	},

	outBack: function () {
		button_back.anchor.setTo(0, 0);
	},

	actionOnClickGoBack: function () {
		this.game.state.start("Configs");
	}
}
