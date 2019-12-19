function create() {
  this.add.text(150, 200, "Start Game!");
}

const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 600,
  scene: {
    create
  },
  backgroundColor: "#a0a0dd"
};

const game = new Phaser.Game(config);
