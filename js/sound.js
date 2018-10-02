var Sound = function(game){};

Sound.prototype = {

	create: function(game){

		volumesText = [];

		background = this.game.stage.backgroundColor = '#020f20';

		soundTitleText = game.add.text(20, 20, 'Sound:', { font: "20px arcade", align: "center", fill: '#ffffff'});
		soundTitleText.resolution = 4;

		soundText = game.add.text(340, 140, 'Sound:', { font: "20px arcade", align: "center", fill: '#ffffff'});
		soundText.resolution = 4;

		musicText = game.add.text(340, 170, 'Music:', { font: "20px arcade", align: "center", fill: '#ffffff'});
		musicText.resolution = 4;

		this.drawsVolume(430, 140, volumeSound);

		button_downS = this.game.add.button(415, 143, 'triangle_left', this.actionOnClickButton_downS);
		button_downS.scale.setTo(.25, .25);

		button_upS = this.game.add.button(455, 143, 'triangle_right', this.actionOnClickButton_upS);
		button_upS.scale.setTo(.25, .25);

		this.drawsVolume(430, 170, volumeMusic);

		button_downM = this.game.add.button(415, 173, 'triangle_left', this.actionOnClickButton_downM);
		button_downM.scale.setTo(.25, .25);

		button_upM = this.game.add.button(455, 173, 'triangle_right', this.actionOnClickButton_upM);
		button_upM.scale.setTo(.25, .25);

		button_back = this.game.add.button(20, 370, 'button_back', this.actionOnClickGoBack);
		button_back.onInputOver.add(this.overBack, this);
		button_back.onInputOut.add(this.outBack, this);
		button_back.scale.setTo(.25, .25);

		rights = game.add.text(this.game.world.centerX, 365, textRights, { font: "11px Arial", align: "center", fill: '#ffffff'});
		rights.resolution = 2.5;
		rights.anchor.setTo(0.5, 0);
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
		volume = game.add.text(x, y, volume, { font: "20px arcade", align: "center", fill: '#ffffff'});
		volume.resolution = 4;
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
