var Tutorial = function(game){

};

Tutorial.prototype = {

  create: function(){
    background = this.game.stage.backgroundColor = '#020f20';


    button_back = this.game.add.button(20, 370, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.25, .25);
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
