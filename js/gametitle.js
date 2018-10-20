var GameTitle = function(game){};

GameTitle.prototype = {

	create: function(){

		background = this.game.add.sprite(0, 0, 'background');
		background.scale.setTo(.5, .65);

		logo = this.game.add.sprite(this.game.world.centerX, 15, 'logo');
		logo.anchor.setTo(0.5, 0);

		button_start = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button_start', this.actionOnClickStart, this);
		button_start.scale.setTo(.5, .5);
		button_start.anchor.setTo(.5, .5);
		button_start.onInputOver.add(this.overStart, this);
		button_start.onInputOut.add(this.outStart, this);
		button_start.onInputUp.add(this.upStart, this);

		button_tutorial = this.game.add.button(20, 370, 'button_tutorial', this.actionOnClickTutorial, this);
		button_tutorial.onInputOver.add(this.overTutorial, this);
		button_tutorial.onInputOut.add(this.outTutorial, this);
		button_tutorial.onInputUp.add(this.upTutorial, this);
		button_tutorial.scale.setTo(.25, .25);

		button_configs = this.game.add.button(725, 325, 'button_configs', this.actionOnClickConfigs, this);
		button_configs.onInputOver.add(this.overConfigs, this);
		button_configs.onInputOut.add(this.outConfigs, this);
		button_configs.onInputUp.add(this.upConfigs, this);
		button_configs.scale.setTo(.30, .30);

		rights = game.add.text(this.game.world.centerX, 365, textRights, titleRights);
		rights.anchor.setTo(0.5, 0);
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
		button_configs.anchor.setTo(.01, .01);
	},

	outConfigs: function() {
		button_configs.anchor.setTo(0, 0);
	},

	actionOnClickStart: function() {
		this.playerSelect();
	},

	actionOnClickTutorial: function() {
		previousState = "GameTitle";
		this.game.state.start("Tutorial");
	},

	actionOnClickConfigs: function() {
		previousState = "GameTitle";
		this.game.state.start("Configs");
	},

	playerSelect: function(){
		previousState = "GameTitle";
		this.game.state.start("PlayerSelect");
	}

}
