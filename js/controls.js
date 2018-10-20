var Controls = function(game){};

Controls.prototype = {

	create: function(game){

		players = ["Player1", "Player2"];
		controls = ["Up:", "Right:", "Left: ", "Shoot: "];

		background = this.game.stage.backgroundColor = '#020f20';

		controlsText = game.add.text(20, 20, 'Controls: ', titleS);

		player1Text = game.add.text(270, 100, 'Player 1 ', titleS);
		player1Text.anchor.setTo(0, 0);

		groupKeys = this.game.add.group();

		for(i = 0; i<controls.length; i++){
			action = game.add.text(270, 150+(i*30), controls[i], titleS);
			action.inputEnabled = true;
			control = game.add.text(350, 150+(i*30), this.keyShow(controls_players[0][i]), titleS, groupKeys);
			control.inputEnabled = true;
			control.events.onInputDown.add(this.actionOnClickControl, {key: controls_players[1][i]});
		}

		player2Text = game.add.text(450, 100, 'Player 2 ', titleS);
		player2Text.anchor.setTo(0, 0);

		for(i = 0; i<controls.length; i++){
			action = game.add.text(450, 150+(i*30), controls[i], titleS);
			action.inputEnabled = true;
			control = game.add.text(530, 150+(i*30), this.keyShow(controls_players[1][i]), titleS, groupKeys);
			control.inputEnabled = true;
			control.events.onInputDown.add(this.actionOnClickControl, {key: controls_players[1][i]});
		}

		button_back = this.game.add.button(20, 370, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.25, .25);

		rights = game.add.text(this.game.world.centerX, 365, textRights, { font: "11px Arial", align: "center", fill: '#ffffff'});
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
