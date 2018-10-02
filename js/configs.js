var Configs = function(game){};

Configs.prototype = {

	create: function(game){

		abas = ["Controls", "Sound", "Credits"];

		background = this.game.stage.backgroundColor = '#020f20';

		style = { font: "40px arcade", align: "center", fill: '#ffffff'};

		controls = game.add.text(60, game.world.centerY, abas[0], style);
		controls.resolution = 1;
		controls.anchor.setTo(.0, .5);
		controls.inputEnabled = true;
		controls.events.onInputDown.add(this.actionOnClickControls, this);

		sound = game.add.text(350, game.world.centerY, abas[1], style);
		sound.anchor.setTo(.0, .5);
		sound.resolution = 1;
		sound.inputEnabled = true;
		sound.events.onInputDown.add(this.actionOnClickSound, this);

		credits = game.add.text(550, game.world.centerY, abas[2], style);
		credits.anchor.setTo(.0, .5);
		credits.resolution = 1;
		credits.inputEnabled = true;
		credits.events.onInputDown.add(this.actionOnClickCredits, this);

		button_back = this.game.add.button(20, 370, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.25, .25);

		rights = game.add.text(this.game.world.centerX, 365, textRights, { font: "11px Arial", align: "center", fill: '#ffffff'});
		rights.resolution = 2.5;
		rights.anchor.setTo(0.5, 0);
	},

	actionOnClickControls: function(){
		this.game.state.start("Controls");
	},

	actionOnClickSound: function(){
		this.game.state.start("Sound");
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
		this.game.state.start("GameTitle");
	}
}
