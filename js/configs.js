var Configs = function(game){};

Configs.prototype = {

	create: function(game){

		abas = ["Controls", "Audio", "Credits"];

		background = this.game.stage.backgroundColor = '#020f20';
		
		fullScreenText = game.add.text(615, 20, 'Fullscreen '+statusFull, titleS = titleS);
		fullScreenText.resolution = 1;
		fullScreenText.inputEnabled = true;
		fullScreenText.events.onInputDown.add(this.actionOnClickFullScreen, this);

		controls = this.game.add.text(60, game.world.centerY, abas[0], titleM);
		controls.resolution = 1;
		controls.anchor.setTo(.0, .5);
		controls.inputEnabled = true;
		controls.events.onInputDown.add(this.actionOnClickControls, this);

		audio = this.game.add.text(350, game.world.centerY, abas[1], titleM);
		audio.anchor.setTo(.0, .5);
		audio.resolution = 1;
		audio.inputEnabled = true;
		audio.events.onInputDown.add(this.actionOnClickAudio, this);

		credits = this.game.add.text(550, game.world.centerY, abas[2], titleM);
		credits.anchor.setTo(.0, .5);
		credits.resolution = 1;
		credits.inputEnabled = true;
		credits.events.onInputDown.add(this.actionOnClickCredits, this);

		button_back = this.game.add.button(20, 370, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.25, .25);

		rights = this.game.add.text(this.game.world.centerX, 365, textRights, titleRights);
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
		this.game.state.start("Controls");
	},

	actionOnClickAudio: function(){
		this.game.state.start("Audio");
	},

	actionOnClickCredits: function(){
		this.game.state.start("About");
	},

	overBack: function() {
		button_back.anchor.setTo(.01, .01);
	},

	outBack: function() {
		button_back.anchor.setTo(0, 0);
	},

	actionOnClickGoBack: function(){
		this.game.state.start(previousState);
	}
}
