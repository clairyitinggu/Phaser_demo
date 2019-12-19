//import { ENGINE_METHOD_ALL } from "constants";

/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Nintendo Mario Tiles, Educational use only
 */
let content = document.getElementById("status");
let detectMonsters = function(monster, mainCharacter) {
  let gainEXP = function(exp, character) {
    character.exp += exp;
    if (character.exp >= character.nextlevelexp) {
      let remainexp = character.exp - character.nextlevelexp;
      character.level = character.level + 1;
      character.nextlevelexp = character.nextlevelexp + 7;
      character.attack = character.attack + 5;
      character.exp = remainexp;
      character.maxHP = character.maxHP + 5;
      character.HP = character.maxHP;
    }
  };
  mainCharacterTurn = true;
  while (mainCharacter.HP > 0 && monster.HP > 0) {
    if (mainCharacterTurn === true) {
      monster.HP -= mainCharacter.attack;
      mainCharacterTurn = false;
    } else {
      mainCharacter.HP -= monster.attack;
      mainCharacterTurn = true;
    }
  }
  if (mainCharacter.HP <= 0) {
    content.innerHTML = "Game Over!";
    this.physics.pause();
    //mainCharacter.setTint(0xff0000);
  } else {
    gainEXP(monster.exp, mainCharacter);
    content.innerHTML =
      "HP:" +
      mainCharacter.HP +
      " / " +
      mainCharacter.maxHP +
      "ATTACK:" +
      mainCharacter.attack +
      "Level: " +
      mainCharacter.level +
      "Exp:" +
      mainCharacter.exp +
      " / " +
      mainCharacter.nextlevelexp;
    monster.destroy();
  }
};
const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,
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
var pig;
var kingpig;
var platforms;
var cursors;
var Text;
var door;
const game = new Phaser.Game(config);
function preload() {
  this.load.image("bg", "assets/bg.png");
  this.load.image("map", "assets/map.png");

  //game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 78,
    frameHeight: 58
  });

  this.load.spritesheet("king_attack", "assets/king_attack.png", {
    frameWidth: 78,
    frameHeight: 58
  });

  this.load.spritesheet("door_in", "assets/door_in.png", {
    frameWidth: 78,
    frameHeight: 58
  });

  this.load.spritesheet("door_out", "assets/door_out.png", {
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

  this.load.spritesheet("closing", "assets/closing.png", {
    frameWidth: 45,
    frameHeight: 56
  });

  this.load.spritesheet("opening", "assets/opening.png", {
    frameWidth: 45,
    frameHeight: 56
  });
}

function create() {
  platforms = this.physics.add.staticGroup();
  platforms
    .create(250, 200, "map")
    .setScale(2)
    .refreshBody();

  doorclosing = this.physics.add.sprite(170, 346, "closing");
  door = this.physics.add.sprite(170, 346, "opening");

  player = this.physics.add.sprite(210, 150, "dude");
  player.body.width = 50;
  player.body.height = 50;
  player.HP = 10;
  player.maxHP = 10;
  player.attack = 5;
  player.level = 0;
  player.exp = 0;
  player.nextlevelexp = 1;
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  kingpig = this.physics.add.sprite(300, 150, "kingpig");
  kingpig.body.width = 30;
  kingpig.HP = 15;
  kingpig.attack = 7;
  kingpig.exp = 10;
  kingpig.body.width = 30;
  pig = this.physics.add.sprite(300, 350, "pig");
  pig.body.width = 28;
  pig.body.width = 28;
  pig.exp = 7;
  pig.attack = 2;
  pig.HP = 10;

  // *********************door opening & closing*************************
  this.anims.create({
    key: "opening",
    frames: this.anims.generateFrameNumbers("opening", { start: 0, end: 4 }),
    frameRate: 5,
    repeat: 0
  });

  this.anims.create({
    key: "closing",
    frames: this.anims.generateFrameNumbers("closing", { start: 0, end: 2 }),
    frameRate: 3,
    repeat: 0
  });
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

  this.anims.create({
    key: "attack",
    frames: this.anims.generateFrameNumbers("king_attack", {
      start: 0,
      end: 2
    }),
    frameRate: 3,
    repeat: 0
  });

  this.anims.create({
    key: "door_in",
    frames: this.anims.generateFrameNumbers("door_in", {
      start: 0,
      end: 7
    }),
    frameRate: 8,
    repeat: 0
  });

  this.anims.create({
    key: "door_out",
    frames: this.anims.generateFrameNumbers("door_out", {
      start: 0,
      end: 7
    }),
    frameRate: 8,
    repeat: 0
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
  this.physics.add.collider(player, kingpig, () => {
    player.anims.play("attack", true);
    // kingpig.destroy();
  });

  this.physics.add.collider(player, pig, () => {
    player.anims.play("attack", true);
    // pig.destroy();
  });
  //*********************door opening & close*********************************
  this.physics.add.overlap(player, door, () => {
    player.anims.play("door_in", true);
    door.anims.play("opening", true);
  });

  this.physics.add.overlap(player, doorclosing, () => {
    door.anims.play("closing", true);
  });

  // this.physics.add.overlap(player, kingpig, () => {
  //   this.add.text(180, 250, "Game Over", { fontSize: "15px", fill: "#000000" });
  // });
  console.log(typeof player);
  console.log(typeof kingpig);
  let a = function(player, enemy) {
    enemy.destroy();
  };
  this.physics.add.overlap(kingpig, player, detectMonsters);

  this.physics.add.overlap(pig, player, detectMonsters);
}

function empty() {}

function update() {
  if (cursors.left.isDown) {
    player.setVelocity(-160, 0);

    player.anims.play("right", true);
    player.flipX = true;
  } else if (cursors.right.isDown) {
    player.setVelocity(160, 0);
    player.anims.play("right", true);
    player.flipX = false;
  } else if (cursors.up.isDown) {
    player.setVelocity(0, -160);
    player.anims.play("right", true);
  } else if (cursors.down.isDown) {
    player.setVelocity(0, 160);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.setVelocityY(0);
    kingpig.anims.play("idle_king", true);
    pig.anims.play("idle_pig", true);
  }
}
