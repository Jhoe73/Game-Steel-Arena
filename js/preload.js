var Preload = function(game){};

Preload.prototype = {

	preload: function(){
		//GameTitle+
		this.game.load.image('background', 'assets/pics/background3.png');
		this.game.load.image('rights', 'assets/pics/rights.png');
		this.game.load.image('logo', 'assets/pics/logo2.png');
		this.game.load.image('button_start', 'assets/buttons/start3.png');
		this.game.load.spritesheet('button_sound', 'assets/buttons/sound_icon.png', 275, 244);
		this.game.load.image('button_configs', 'assets/buttons/configs.png');
		//PlayerSelect
		this.game.load.image('button_continue', 'assets/buttons/continue.png');
		//Main
		this.game.load.image('background', 'assets/cenario.png')
    this.game.load.image('ground', 'assets/ptf.png');
    //this.game.load.spritesheet('roboVerde', 'assets/robo_verde.png', 101, 101);
		this.game.load.atlasJSONHash('cityscene', 'cityscene.png', 'cityscene.json');
		this.game.load.atlasJSONHash('rbVerde', 'roboVerde.png', 'roboVerde.json');
		this.game.load.physics("rbVerdePhysics", "rbVerdePhysics.json");
		this.game.load.json("rbVerdePhysicsJSON", "rbVerdePhysics.json");
	},

	create: function(){
		this.game.state.start("GameTitle");
	}
}