var Boot = function(game){

};

Boot.prototype = {

	preload: function(){

	},

  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		//Hack TO PRELOAD A CUSTOM FONT
		this.game.add.text(0, 0, "hack", {font:"1px arcade", fill:"#FFFFFF"});

		this.game.state.start("Preload");
	}
}
