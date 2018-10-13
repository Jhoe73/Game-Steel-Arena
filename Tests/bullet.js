// This example uses the Phaser 2.2.2 framework

// Copyright � 2014 John Watson
// Licensed under the terms of the MIT License

var GameState = function(game) {
};

// Load images and sounds
GameState.prototype.preload = function() {
    this.game.load.image('bullet', '../assets/gfx/wrench.png');
    this.game.load.image('ground', '../assets/gfx/ground.png');
    this.game.load.spritesheet('explosion', '../assets/gfx/explosion.png', 128, 128);
};

// Setup the example
GameState.prototype.create = function() {

    // Start the P2 Physics Engine
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    // Set stage background color
    this.game.stage.backgroundColor = 0x4488cc;

    // Define constants
    this.SHOT_DELAY = 300; // milliseconds (10 bullets/3 seconds)
    this.BULLET_SPEED = 1000; // pixels/second
    this.NUMBER_OF_BULLETS = 20;
    this.GRAVITY = 1800; // pixels/second/second

    this.bulletCollisionGroup = game.physics.p2.createCollisionGroup();
  	this.groundCollisionGroup = game.physics.p2.createCollisionGroup();

    material1 = game.physics.p2.createMaterial();
    material2 = game.physics.p2.createMaterial();

    game.physics.p2.createContactMaterial(material1, material2, {
      friction: 0.7 , restitution: 0


    });

    // Create an object representing our gun
    this.gun = this.game.add.sprite(50, this.game.height - 64, 'bullet');

    // Set the pivot point to the center of the gun
    this.gun.anchor.setTo(0.5, 0.5);
    this.gun.scale.setTo(0.5, 0.5);

    // Create an object pool of bullets
    this.bulletPool = this.game.add.group();
    for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
        // Create each bullet and add it to the group.
        var bullet = this.game.add.sprite(0, 0, 'bullet');
        this.bulletPool.add(bullet);

        // Set its pivot point to the center of the bullet
        bullet.anchor.setTo(0.5, 0.5);
        bullet.scale.setTo(0.5, 0.5);

        // Enable physics on the bullet
        this.game.physics.p2.enable(bullet, false);

        bullet.body.setMaterial(material1);

        bullet.body.data.gravityScale = 0.55;

        bullet.body.mass = 2;

        bullet.body.collisionGroup = this.bulletCollisionGroup;

        // Set its initial state to "dead".
        bullet.kill();
    }

    // Turn on gravity
    game.physics.p2.gravity.y = this.GRAVITY;

    // Create some ground
    this.ground = this.game.add.group();

    var groundBlock = this.game.add.sprite(500, this.game.height-30, 'ground');
    groundBlock.scale.set(30 , 1);
    this.game.physics.p2.enable(groundBlock, false);

    groundBlock.body.setMaterial(material2);

    groundBlock.body.static = true;
    groundBlock.body.mass = 100;
    groundBlock.body.collisionGroup = this.groundCollisionGroup;
    this.ground.add(groundBlock);

    //game.physics.p2.world.defaultContactMaterial.friction = 0;

    // Create a group for explosions
    this.explosionGroup = this.game.add.group();

    // Simulate a pointer click/tap input at the center of the stage
    // when the example begins running.
    this.game.input.activePointer.x = this.game.width/2;
    this.game.input.activePointer.y = this.game.height/2 - 100;
};

GameState.prototype.shootBullet = function() {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.game.time.now;

    // Get a dead bullet from the pool
    var bullet = this.bulletPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    bullet.reset(this.gun.x, this.gun.y);
    bullet.rotation = this.gun.rotation;

    // Shoot it in the right direction
    bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
    bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
};

// The update() method is called every frame
GameState.prototype.update = function() {
    // Check if bullets have collided with the ground
    //this.game.physics.arcade.collide(this.bulletPool, this.ground, function(bullet, ground) {
        // Create an explosion
        //this.getExplosion(bullet.x, bullet.y);

        // Kill the bullet
        //bullet.kill();
    //}, null, this);

    // Rotate all living bullets to match their trajectory
    this.bulletPool.forEachAlive(function(bullet) {
      if (!this.checkIfCanJump(bullet) && bullet.body.immovable == true) {
        bullet.body.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);
        bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);
      } else {
        bullet.velocity = 0;
        bullet.body.immovable = true;
      }
    }, this);



    // Aim the gun at the pointer.
    // All this function does is calculate the angle using
    // Math.atan2(yPointer-yGun, xPointer-xGun)
    this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);

    // Shoot a bullet
    if (this.game.input.activePointer.isDown) {
        this.shootBullet();
    }
};

GameState.prototype.checkIfCanJump = function(corpo) {
  var yAxis = p2.vec2.fromValues(0, 1);
  var result = false;
  for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++){
    var c = game.physics.p2.world.narrowphase.contactEquations[i];
    if (c.bodyA === corpo.body.data || c.bodyB === corpo.body.data){
      var d = p2.vec2.dot(c.normalA, yAxis);
      // Normal dot Y-axis
      if (c.bodyA === corpo.body.data)
      d *= -1;
      if (d > 0.5)
      result = true;
    }
  }
  return result;
}

// Try to get a used explosion from the explosionGroup.
// If an explosion isn't available, create a new one and add it to the group.
// Setup new explosions so that they animate and kill themselves when the
// animation is complete.
GameState.prototype.getExplosion = function(x, y) {
    // Get the first dead explosion from the explosionGroup
    var explosion = this.explosionGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (explosion === null) {
        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.anchor.setTo(0.5, 0.5);

        // Add an animation for the explosion that kills the sprite when the
        // animation is complete
        var animation = explosion.animations.add('boom', [0,1,2,3], 60, false);
        animation.killOnComplete = true;

        // Add the explosion sprite to the group
        this.explosionGroup.add(explosion);
    }

    // Revive the explosion (set it's alive property to true)
    // You can also define a onRevived event handler in your explosion objects
    // to do stuff when they are revived.
    explosion.revive();

    // Move the explosion to the given coordinates
    explosion.x = x;
    explosion.y = y;

    // Set rotation of the explosion at random for a little variety
    explosion.angle = this.game.rnd.integerInRange(0, 360);

    // Play the animation
    explosion.animations.play('boom');

    // Return the explosion itself in case we want to do anything else with it
    return explosion;
};

var game = new Phaser.Game(1080, 720, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
