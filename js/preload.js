var Preload = function(game){};

Preload.prototype = {

	preload: function(){
		//Configs
		this.game.load.image('bender', 'assets/pics/bender.png');
			//Credits
			this.game.load.image('button_back', 'assets/buttons/back.png');
		//GameTitle
		this.game.load.image('background', 'assets/pics/background.gif');
		this.game.load.image('rights', 'assets/pics/rights.png');
		this.game.load.image('logo', 'assets/pics/logo.png');
		this.game.load.image('button_start', 'assets/buttons/start.png');
		this.game.load.image('button_tutorial', 'assets/buttons/tutorial.png');
		this.game.load.image('button_configs', 'assets/buttons/configs.png');
		//PlayerSelect
		this.game.load.image('button_continue', 'assets/buttons/continue.png');
		this.game.load.image('right', 'assets/pics/right.png');
		//Main
		this.game.load.image('background2', 'assets/pics/cenario.jpg');
    this.game.load.image('ground', 'assets/pics/plataforma3.png');
		this.game.load.image('ground2', 'assets/pics/ptf.png');
		this.game.load.image('bullet', 'assets/pics/wrench_right.png');
		this.game.load.image('bullet_up', 'assets/pics/wrench_up.png');
		this.game.load.image('coin', 'assets/pics/coin.png');
		this.game.load.atlasJSONHash('rb_verde', 'assets/pics/rb_verde.png', 'assets/JSON/rb_verde.json');
		this.game.load.atlasJSONHash('rb_vermelho', 'assets/pics/rb_vermelho.png', 'assets/JSON/rb_vermelho.json');
		this.game.load.physics("rb_verdePhysics", "assets/JSON/rb_verdePhysics.json");
		this.game.load.json("rb_verdePhysicsJSON", "assets/JSON/rb_verdePhysics.json");
		this.game.load.physics("rb_vermelhoPhysics", "assets/JSON/rb_vermelhoPhysics.json");
		this.game.load.json("rb_vermelhoPhysicsJSON", "assets/JSON/rb_vermelhoPhysics.json");
		//GameOver
		this.game.load.image('trophy', 'assets/pics/trophy.png');

		game.load.audio('music1', ['assets/audio/menumusic.mp3', 'assets/audio/menumusic.ogg']);
		game.load.audio('music2', ['assets/audio/menumusic2.wav', 'assets/audio/menumusic2.ogg']);
		game.load.audio('start_game', ['assets/audio/start_game.wav', 'assets/audio/start_game.ogg']);
		game.load.audio('coin', ['assets/audio/coin.wav', 'assets/audio/coin.ogg']);
		game.load.audio('bullet_collect', ['assets/audio/bullet_collect.wav', 'assets/audio/bullet_collect.ogg']);
		game.load.audio('bullet_collision', ['assets/audio/bullet_collision.wav', 'assets/audio/bullet_collision.ogg']);
		game.load.audio('shoot', ['assets/audio/shoot.wav', 'assets/audio/shoot.ogg']);
		game.load.audio('applause', ['assets/audio/applause.wav', 'assets/audio/applause.ogg']);
	},

	create: function(){
		this.game.state.start("GameTitle");
	}
}
