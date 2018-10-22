var GameTitle = function(game){};

GameTitle.prototype = {

	create: function(){

		background = game.add.sprite(0, 0, 'background');
		background.scale.setTo(1, 1.8);

		logo = game.add.sprite(game.world.centerX, 50, 'logo');
		logo.scale.setTo(2);
		logo.anchor.setTo(0.5, 0);

		button_start = game.add.button(game.world.centerX, game.world.centerY, 'button_start', this.actionOnClickStart, this);
		button_start.anchor.setTo(.5);
		button_start.onInputOver.add(this.overStart, this);
		button_start.onInputOut.add(this.outStart, this);
		button_start.onInputUp.add(this.upStart, this);

		button_tutorial = game.add.button(80, 950, 'button_tutorial', this.actionOnClickTutorial, this);
		button_tutorial.onInputOver.add(this.overTutorial, this);
		button_tutorial.onInputOut.add(this.outTutorial, this);
		button_tutorial.onInputUp.add(this.upTutorial, this);
		button_tutorial.scale.setTo(.7);

		button_configs = game.add.button(1900, 900, 'button_configs', this.actionOnClickConfigs, this);
		button_configs.onInputOver.add(this.overConfigs, this);
		button_configs.onInputOut.add(this.outConfigs, this);
		button_configs.onInputUp.add(this.upConfigs, this);
		button_configs.scale.setTo(.7, .7);
		button_configs.anchor.setTo(1, 0);

		rights = game.add.text(game.world.centerX, 1000, textRights, titleRights);
		rights.anchor.setTo(0.5, 0);

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

	upStart: function() {
	},

	overStart: function() {
		button_start.anchor.setTo(.51, .51);
	},

	outStart: function() {
		button_start.anchor.setTo(.5, .5);
	},

	upTutorial: function() {
	},

	overTutorial: function() {
		button_tutorial.anchor.setTo(.01, .01);
	},

	outTutorial: function() {
		button_tutorial.anchor.setTo(0, 0);
	},

	upConfigs: function() {
	},

	overConfigs: function() {
		button_configs.anchor.setTo(1.01, .01);
	},

	outConfigs: function() {
		button_configs.anchor.setTo(1, 0);
	},

	actionOnClickStart: function() {
		this.playerSelect();
	},

	actionOnClickTutorial: function() {
		previousState = "GameTitle";
		game.state.start("Tutorial");
	},

	actionOnClickConfigs: function() {
		previousState = "GameTitle";
		game.state.start("Configs");
	},

	playerSelect: function(){
		previousState = "GameTitle";
		game.state.start("PlayerSelect");
	}

}
