var GameOver = function(game){

};

GameOver.prototype = {

  create: function(){
    background = this.game.stage.backgroundColor = '#020f20';

    controlsText = game.add.text(game.world.centerX, 70, 'Congratulations!!! ', msgRedL);
    controlsText.anchor.setTo(.5, 1);

    winnerImg = this.game.add.sprite(game.world.centerX, 210, winner.key);
		winnerImg.scale.setTo(1);
    winnerImg.anchor.setTo(.5, 1);

    trophyImg = this.game.add.sprite(game.world.centerX-200, 200, 'trophy');
		trophyImg.scale.setTo(.8);
    trophyImg.anchor.setTo(0, 1);

    trophyImg = this.game.add.sprite(game.world.centerX+200, 200, 'trophy');
		trophyImg.scale.setTo(.8);
    trophyImg.anchor.setTo(1, 1);

    restartText = game.add.text(game.world.centerX, 250, 'Restart ', titleM);
		restartText.anchor.setTo(.5, 0);
		restartText.inputEnabled = true;
		restartText.events.onInputDown.add(this.restartGame, this);

    playerSelectText = game.add.text(game.world.centerX, 290, 'Player Select ', titleM);
		playerSelectText.anchor.setTo(.5, 0);
		playerSelectText.inputEnabled = true;
		playerSelectText.events.onInputDown.add(this.playerSelect, this);

    exitText = game.add.text(game.world.centerX, 330, 'Exit ', titleM);
		exitText.anchor.setTo(.5, 0);
		exitText.inputEnabled = true;
		exitText.events.onInputDown.add(this.exitGame, this);

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
