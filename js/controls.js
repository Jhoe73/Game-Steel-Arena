var Controls = function(game){};

Controls.prototype = {

	create: function(game){

		players = ["Player1", "Player2"];
		controls = ["Up:", "Right:", "Left: ", "Shoot: "];

		background = this.game.stage.backgroundColor = '#020f20';

		controlsText = game.add.text(80, 50, 'Controls: ', titleL);

		player1Text = game.add.text(570, 300, 'Player 1 ', titleM);
		player1Text.anchor.setTo(0, 0);

		groupKeys = this.game.add.group();

		for(i = 0; i<controls.length; i++){
			action = game.add.text(570, 450+(i*50), controls[i], titleM);
			action.inputEnabled = true;
			control = game.add.text(750, 450+(i*50), this.keyShow(controls_players[0][i]), titleM, groupKeys);
			control.inputEnabled = true;
			control.events.onInputDown.add(this.actionOnClickControl, {key: controls_players[1][i]});
		}

		player2Text = game.add.text(1150, 300, 'Player 2 ', titleM);
		player2Text.anchor.setTo(0, 0);

		for(i = 0; i<controls.length; i++){
			action = game.add.text(1150, 450+(i*50), controls[i], titleM);
			action.inputEnabled = true;
			control = game.add.text(1310, 450+(i*50), this.keyShow(controls_players[1][i]), titleM, groupKeys);
			control.inputEnabled = true;
			control.events.onInputDown.add(this.actionOnClickControl, {key: controls_players[1][i]});
		}

		button_back = game.add.button(80, 950, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.7);

		rights = game.add.text(game.world.centerX, 1000, textRights, titleRights);
		rights.anchor.setTo(0.5, 0);
	},

	update: function() {
		if (!game.scale.isFullScreen){
			statusFull = "OFF";
    }
	},

	keyShow: function(key) {
		if(key == 13) {

		 return "Enter";

	 	} else if(key == 16) {

		 return "SHIFT";

		} else if(key == 37) {

		 return "Left";

		} else if(key == 38) {

		 return "UP";

		} else if(key == 39) {

		 return "RIGHT";

		} else if(key == 40) {

		 return "DOWN";

	 	} else {
		 return String.fromCharCode(key);
	 	}
	},

	actionOnClickControl: function(textObj){
		console.log(this.key);
		textObj.alpha = 0.5;

	},

	overBack: function() {
		button_back.anchor.setTo(.01, .01);
	},

	outBack: function() {
		button_back.anchor.setTo(0, 0);
	},

	actionOnClickGoBack: function(){
		this.game.state.start("Configs");
	}
}
