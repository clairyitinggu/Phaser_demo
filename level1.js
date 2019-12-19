var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload
    // create: create,
    // update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("map", "/assets/map.png");
  this.load.spritesheet("king", "/assets/dude.png", {
    frameWidth: 100,
    frameHeight: 100
  });
}

function create() {}

function update() {}
