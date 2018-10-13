var PlayerSelect = function(game){};

PlayerSelect.prototype = {

	create: function(){
		background = this.game.add.sprite(0, 0, 'background');
		background.scale.setTo(1, 1.4);

		graphics = this.game.add.graphics();

		// set a fill and line style
		graphics.beginFill(0xf98c8c);
		graphics.lineStyle(1, 0x000000, 1);

		// draw a rectangle
		spacePlayerImg1 = graphics.drawRect(120, 80, 160, 200);

		playerImg1 = this.game.add.button(120, 80, 'button_continue', this.actionOnClickContinue, this);

		population_players.push("rbVerde");

		button_down2 = this.game.add.button(60, 160, 'triangle_left', this.actionOnClickButton_downS);
		button_down2.scale.setTo(1, 1);

		button_up1 = this.game.add.button(320, 160, 'triangle_right', this.actionOnClickButton_upS);
		button_up1.scale.setTo(1, 1);



		for(i=0;i<=20;i++){
		//	zxc = graphics.drawRect(40*i, 100, 1, 400);
		}


		spacePlayerImg2 = graphics.drawRect(520, 80, 160, 200);

		population_players.push("rbVermelho");

		button_down2 = this.game.add.button(460, 160, 'triangle_left', this.actionOnClickButton_downS);
		button_down2.scale.setTo(1, 1);

		button_up2 = this.game.add.button(720, 160, 'triangle_right', this.actionOnClickButton_upS);
		button_up2.scale.setTo(1, 1);

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
