var GameOver = function(game){

};

GameOver.prototype = {

  create: function(){
    background = this.game.stage.backgroundColor = '#020f20';

    congratulationsText = game.add.text(game.world.centerX, 150, 'Congratulations!!! ', msgRedEL);
    congratulationsText.anchor.setTo(.5, 1);

    winnerImg = this.game.add.sprite(game.world.centerX, 510, winner.key);
		winnerImg.scale.setTo(2);
    winnerImg.anchor.setTo(.5, 1);

    trophyImg = this.game.add.sprite(game.world.centerX-350, 510, 'trophy');
		trophyImg.scale.setTo(2);
    trophyImg.anchor.setTo(0, 1);

    trophyImg = this.game.add.sprite(game.world.centerX+350, 510, 'trophy');
		trophyImg.scale.setTo(2);
    trophyImg.anchor.setTo(1, 1);

    restartText = game.add.text(game.world.centerX, 700, 'Restart ', titleEL);
		restartText.anchor.setTo(.5, 0);
		restartText.inputEnabled = true;
		restartText.events.onInputDown.add(this.restartGame, this);

    playerSelectText = game.add.text(game.world.centerX, 800, 'Player Select ', titleEL);
		playerSelectText.anchor.setTo(.5, 0);
		playerSelectText.inputEnabled = true;
		playerSelectText.events.onInputDown.add(this.playerSelect, this);

    exitText = game.add.text(game.world.centerX, 900, 'Exit ', titleEL);
		exitText.anchor.setTo(.5, 0);
		exitText.inputEnabled = true;
		exitText.events.onInputDown.add(this.exitGame, this);

    applauseSound = game.add.audio('applause');
    applauseSound.play();
    applauseSound.volume = volumeSound*0.08;
	},

  update: function() {
		if (!game.scale.isFullScreen){
			statusFull = "OFF";
    }
	},

	restartGame: function(){
		this.game.state.start("Main");
	},

  playerSelect: function(){
    population_players = [[],[]]
		this.game.state.start("PlayerSelect");
	},

  exitGame: function(){
		this.game.state.start("GameTitle");
	}
}
