var Configs = function(game){};

Configs.prototype = {

	create: function(game){

		abas = ["Controls", "Audio", "Credits"];

		background = game.stage.backgroundColor = '#020f20';

		fullScreenText = game.add.text(1450, 50, 'Fullscreen '+statusFull, titleL);
		fullScreenText.resolution = 1;
		fullScreenText.inputEnabled = true;
		fullScreenText.events.onInputDown.add(this.actionOnClickFullScreen, this);

		controls = game.add.text(game.world.centerX-600, game.world.centerY, abas[0], titleEL);
		controls.resolution = 1;
		controls.anchor.setTo(.5, .5);
		controls.inputEnabled = true;
		controls.events.onInputDown.add(this.actionOnClickControls, this);

		audio = game.add.text(game.world.centerX, game.world.centerY, abas[1], titleEL);
		audio.anchor.setTo(.5, .5);
		audio.resolution = 1;
		audio.inputEnabled = true;
		audio.events.onInputDown.add(this.actionOnClickAudio, this);

		credits = game.add.text(game.world.centerX+600, game.world.centerY, abas[2], titleEL);
		credits.anchor.setTo(.5, .5);
		credits.resolution = 1;
		credits.inputEnabled = true;
		credits.events.onInputDown.add(this.actionOnClickCredits, this);

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
		fullScreenText.setText("Fullscreen "+statusFull);
	},

	actionOnClickFullScreen: function(){
		if (game.scale.isFullScreen) {
			game.scale.stopFullScreen();
			statusFull = "OFF";
		} else {
			game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
			game.scale.startFullScreen(false);
			statusFull = "ON";
		}
		fullScreenText.setText("Fullscreen "+statusFull);
	},

	actionOnClickControls: function(){
		game.state.start("Controls");
	},

	actionOnClickAudio: function(){
		game.state.start("Audio");
	},

	actionOnClickCredits: function(){
		game.state.start("About");
	},

	overBack: function() {
		button_back.anchor.setTo(.01, .01);
	},

	outBack: function() {
		button_back.anchor.setTo(0, 0);
	},

	actionOnClickGoBack: function(){
		game.state.start(previousState);
	}
}
