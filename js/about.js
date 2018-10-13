var About = function(game){};

About.prototype = {

	create: function(game){

		msg = "Good game for everyone!!";
		nomes = ["Jhoe Nascimento ", "Jhonathan de Araujo ", "Weslley Francis ", "Bruno Garcia", "Vinícius Lima "];
		countEgg = 0;

		background = this.game.stage.backgroundColor = '#020f20';

		// Texto e Estilo
		styleNames = { font: "20px arcade", align: "center", fill: '#ffffff'};

		msgText = game.add.text(game.world.centerX, 300, msg, { font: "30px arcade", align: "center", fill: '#f98c8c'});
		msgText.resolution = 1;
		msgText.anchor.setTo(.5, 0);

		creditsText = game.add.text(20, 20, 'Credits:', styleNames);
		creditsText.resolution = 1;

		for(i = 0; i<=nomes.length; i++){
			nome = game.add.text(game.world.centerX, 120+(i*30), nomes[i], styleNames);
			nome.resolution = 1;
			nome.inputEnabled = true;
			nome.events.onInputDown.add(this.actionOnClickNames, this);
			nome.anchor.setTo(0.5, 0);
		}

		button_back = this.game.add.button(20, 370, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.25, .25);

		rights = game.add.text(this.game.world.centerX, 365, textRights, { font: "11px Arial", align: "center", fill: '#ffffff'});
		rights.resolution = 1;
		rights.anchor.setTo(0.5, 0);
	},

	actionOnClickNames: function(){
		countEgg++;
		if (countEgg == 8) {
			this.EasterEgg();
			// Stretch to fill
		}
	},

	EasterEgg: function(){
		bender = this.game.add.sprite(650, 250, 'bender');
		bender.scale.setTo(.15, .15);
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
