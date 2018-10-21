var About = function(game){};

About.prototype = {

	create: function(game){

		msg = "Good game for everyone!!";
		nomes = ["Jhoe Nascimento ", "Jhonathan de Araujo ", "Weslley Francis ", "Bruno Garcia", "Vinícius Lima "];
		countEgg = 0;

		background = this.game.stage.backgroundColor = '#020f20';

		msgText = game.add.text(game.world.centerX, 250, msg, msgRedL);
		msgText.anchor.setTo(.5, 0);

		creditsText = game.add.text(80, 50, 'Credits:', titleL);

		for(i = 0; i<=nomes.length; i++){
			nome = game.add.text(game.world.centerX, 450+(i*50), nomes[i], titleM);
			nome.inputEnabled = true;
			nome.events.onInputDown.add(this.actionOnClickNames, this);
			nome.anchor.setTo(0.5, 0);
		}

		button_back = game.add.button(80, 950, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.7);

		rights = game.add.text(game.world.centerX, 1000, textRights, titleRights);
		rights.anchor.setTo(0.5, 0);
	},

	actionOnClickNames: function(){
		countEgg++;
		if (countEgg == 8) {
			this.EasterEgg();
		}
	},

	EasterEgg: function(){
		bender = this.game.add.sprite(1450, 700, 'bender');
		bender.scale.setTo(.35);
		bender.rotation = 0.14;
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
