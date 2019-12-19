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
      debug: false
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
const game = new Phaser.Game(config);

function preload() {
  this.load.image("bg", "assets/bg.png");
  this.load.image("map", "assets/map.png");
  this.load.image("ground", "assets/ground.png");
  this.load.image("key", "assets/key.png");
  this.load.image("door", "assets/door.png");
  this.load.image("sm", "assets/sm.png");

  this.load.image("bm", "assets/bm.png");

  //   this.load.image("du", "assets/dude.png");
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 78,
    frameHeight: 58
  });
}

var platforms;
function create() {
  this.add.image(170, 209, "door");
  this.add.image(250, 110, "sm");
  this.add.image(252, 140, "bm");
  this.add.image(210, 220, "key");
  platforms = this.physics.add.staticGroup();
  platforms
    .create(250, 200, "map")
    .setScale(2)
    .refreshBody();

  player = this.physics.add.sprite(210, 150, "dude");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  cursors = this.input.keyboard.createCursorKeys();
  this.physics.add.collider(player, platforms);
}
function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("right", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  }
  else if (cursors.up.isDown){
    player.setVelocityY(-160);
    player.anims.play("right",true);
  }
  else if(cursors.down.isDown)
  {
    player.setVelocityY(160);
    player.anims.play("right",true);
  } 
  else {
    player.setVelocityX(0);
    player.setVelocityY(0);
    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
