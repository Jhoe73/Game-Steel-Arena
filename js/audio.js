var Audio = function(game){};

Audio.prototype = {

	create: function(game){

		volumesText = [];

		background = this.game.stage.backgroundColor = '#020f20';

		audioTitleText = game.add.text(80, 50, 'Audio:', titleL);

		soundText = game.add.text(830, 350, 'Sound:', titleM);

		musicText = game.add.text(830, 450, 'Music:', titleM);

		this.drawsVolume(1050, 350, volumeSound);

		button_downS = drawTriangle(1030, 360, 0xffffff, 0xffffff, "l");
		button_downS.events.onInputDown.add(this.actionOnClickButton_downS, this);

		button_upS = drawTriangle(1100, 360, 0xffffff, 0xffffff, "r");
		button_upS.events.onInputDown.add(this.actionOnClickButton_upS, this);

		this.drawsVolume(1050, 450, volumeMusic);

		button_downM = drawTriangle(1030, 460, 0xffffff, 0xffffff, "l");
		button_downM.events.onInputDown.add(this.actionOnClickButton_downM, this);

		button_upM = drawTriangle(1100, 460, 0xffffff, 0xffffff, "r");
		button_upM.events.onInputDown.add(this.actionOnClickButton_upM, this);

		button_back = game.add.button(80, 950, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.7);

		rights = game.add.text(game.world.centerX, 1000, textRights, titleRights);
		rights.anchor.setTo(0.5, 0);

		function drawTriangle(x, y, fill, style, direction) {

			direction == "r"?x1=x+10:x1=x-10;

			poly = new Phaser.Polygon([
				new Phaser.Point(x, y),
				new Phaser.Point(x, y+20),
				new Phaser.Point(x1, y+10),
				new Phaser.Point(x, y)
			]);

	    draw = this.game.add.graphics();

	    draw.beginFill(fill);
	    draw.lineStyle(2, style, 1);
			draw.drawPolygon(poly.points);
	    draw.endFill();
			draw.hitArea = poly;
			draw.inputEnabled = true;
			draw.input.useHandCursor = true;

			return draw;

		}
	},

	update: function() {
		if (!game.scale.isFullScreen){
			statusFull = "OFF";
    }
	},

	actionOnClickButton_upS: function() {
		if (volumeSound < 10) {
			volumesText[0].setText(++volumeSound);
		}
	},

	actionOnClickButton_downS: function() {
		if (volumeSound > 0) {
			volumesText[0].setText(--volumeSound);
		}
	},

	actionOnClickButton_upM: function() {
		if (volumeMusic < 10) {
			volumesText[1].setText(++volumeMusic);
		}
	},

	actionOnClickButton_downM: function() {
		if (volumeMusic > 0) {
			volumesText[1].setText(--volumeMusic);
		}
	},

	drawsVolume: function(x, y, volume) {
		volume = game.add.text(x, y, volume, titleM);
		volumesText.push(volume);
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
