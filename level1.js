/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Nintendo Mario Tiles, Educational use only
 */

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 400,
  zoom: 1,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var player;
var platforms;
var cursors;
var kingpig;
var pig;

const game = new Phaser.Game(config);

function preload() {
  this.load.image("bg", "assets/bg.png");
  this.load.image("map", "assets/map.png");
  this.load.image("test", "assets/test.png");

  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 78,
    frameHeight: 58
  });

  this.load.spritesheet("kingpig", "assets/kingpig.png", {
    frameWidth: 38,
    frameHeight: 28
  });

  this.load.spritesheet("pig", "assets/pig.png", {
    frameWidth: 34,
    frameHeight: 28
  });
}

var platforms;
function create() {
  platforms = this.physics.add.staticGroup();
  platforms
    .create(250, 200, "map")
    .setScale(2)
    .refreshBody();

  player = this.physics.add.sprite(210, 150, "dude");
  player.body.width = 50;

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  kingpig = this.physics.add.sprite(300, 150, "kingpig");
  kingpig.body.width = 30;
  pig = this.physics.add.sprite(300, 120, "pig");
  pig.body.width = 28;
  // *********************dude movement*************************
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 9 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 9 }),
    frameRate: 10,
    repeat: -1
  });
  // *********************kingpig movement*************************
  this.anims.create({
    key: "idle_king",
    frames: this.anims.generateFrameNumbers("kingpig", { start: 0, end: 11 }),
    frameRate: 11,
    repeat: -1
  });

  // *********************pig movement*****************************
  this.anims.create({
    key: "idle_pig",
    frames: this.anims.generateFrameNumbers("pig", { start: 0, end: 10 }),
    frameRate: 10,
    repeat: -1
  });

  //********************keyboard**********************************

  cursors = this.input.keyboard.createCursorKeys();
  this.physics.add.collider(player, platforms);
  //*********************destory*********************************

  // this.physics.add.overlap(player, kingpig, () => {
  //   this.add.text(180, 250, "Game Over", { fontSize: "15px", fill: "#000000" });
  // });
  this.physics.add.collider(player, kingpig, () => {
    kingpig.destroy();
  });

  this.physics.add.collider(player, pig, () => {
    pig.destroy();
  });
}
function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("right", true);
    player.flipX = true;
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
    player.flipX = false;
  } else if (cursors.up.isDown) {
    player.setVelocityY(-160);
    player.anims.play("right", true);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.setVelocityY(0);
    kingpig.anims.play("idle_king", true);
    pig.anims.play("idle_pig", true);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
