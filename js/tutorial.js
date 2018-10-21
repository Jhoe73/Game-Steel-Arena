var Tutorial = function(game){

};

Tutorial.prototype = {

  create: function(){
    background = this.game.stage.backgroundColor = '#020f20';

		controls = ["Up", "Right", "Left", "Shoot"];

		background = this.game.stage.backgroundColor = '#020f20';

		TutorialText = game.add.text(80, 50, 'Tutorial: ', titleL);

    playerImg = this.game.add.sprite(game.world.centerX+300, 250, existing_players[0][0]);
		playerImg.scale.setTo(1.2);

    playerImg = this.game.add.sprite(game.world.centerX-300, 250, existing_players[0][0], 2);
		playerImg.scale.setTo(1.2);
    playerImg.anchor.setTo(1, 0);

    playerImg = this.game.add.sprite(game.world.centerX+300, 650, existing_players[0][0]);
		playerImg.scale.setTo(1.2);

    bulletImg = this.game.add.sprite(game.world.centerX+450, 720, 'bullet');
		bulletImg.scale.setTo(.6);

    playerImg = this.game.add.sprite(game.world.centerX-300, 650, existing_players[0][0], 11);
		playerImg.scale.setTo(1.2);
    playerImg.anchor.setTo(1, 0);

    action = game.add.text(game.world.centerX-310, 225, controls[2], titleM);
    action.anchor.setTo(1, 0);

		action = game.add.text(game.world.centerX+310, 225, controls[1], titleM);

    action = game.add.text(game.world.centerX+310, 625, controls[3], titleM);

    action = game.add.text(game.world.centerX-390, 625, controls[0], titleM);

    msg = game.add.text(game.world.centerX, 950, 'see the controls in the settings', titleM);
    msg.anchor.setTo(.5, 0);

    button_back = game.add.button(80, 950, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.7);
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

  update: function() {
		if (!game.scale.isFullScreen){
			statusFull = "OFF";
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
	}

}
