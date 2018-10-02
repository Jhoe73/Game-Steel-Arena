var PlayerSelect = function(game){};

PlayerSelect.prototype = {

	create: function(){
		background = this.game.add.sprite(0, 0, 'background');
		background.scale.setTo(1, 1.4);

		button_back = this.game.add.button(20, 370, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.25, .25);

		button_continue = this.game.add.button(685, 370, 'button_continue', this.actionOnClickContinue, this);
		button_continue.onInputOver.add(this.overContinue, this);
		button_continue.onInputOut.add(this.outContinue, this);
		button_continue.onInputUp.add(this.upContinue, this);
		button_continue.scale.setTo(.25, .25);
	},

	overBack: function() {
		button_back.anchor.setTo(.01, .01);
	},

	outBack: function() {
		button_back.anchor.setTo(0, 0);
	},

	actionOnClickGoBack: function(){
		this.game.state.start("GameTitle");
	},

	upContinue: function() {
	},

	overContinue: function() {
		button_continue.anchor.setTo(.01, .01);
	},

	outContinue: function() {
		button_continue.anchor.setTo(0, 0);
	},

	actionOnClickContinue: function() {
		this.startGame();
	},

	startGame: function(){
		this.game.state.start("Main");
	}

}
