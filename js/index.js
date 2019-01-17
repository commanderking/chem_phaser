var state = {
  atomX: null,
  atomY: null
};
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create
  }
};

var game = new Phaser.Game(config);
function preload() {}
function create() {
  var chlorineAtom = new Phaser.Geom.Ellipse(50, 50, 100, 100);

  var chlroineGraphics = this.add
    .graphics({ fillStyle: { color: 0xff0000 } })
    .fillEllipseShape(chlorineAtom, 64);

  chlroineGraphics.generateTexture("circleTexture", 100, 100);
  var chlorineSprite = this.add.sprite(300, 300, "circleTexture");

  chlorineSprite.setInteractive();
  this.input.setDraggable(chlorineSprite);

  chlroineGraphics.destroy();

  var sodiumAtom = new Phaser.Geom.Ellipse(
    25,
    25,
    elements.sodium.diameter,
    elements.sodium.diameter
  );

  var sodiumGraphics = this.add
    .graphics({ fillStyle: { color: 0xffffff } })
    .fillEllipseShape(sodiumAtom, 64);

  sodiumGraphics.generateTexture(
    "sodiumAtomTexture",
    elements.sodium.diameter,
    elements.sodium.diameter
  );
  var sodiumAtomSprite = this.add.sprite(100, 100, "sodiumAtomTexture");

  sodiumAtomSprite.setInteractive();
  sodiumAtomSprite.name = "sodiumAtomSprite";
  this.input.setDraggable(sodiumAtomSprite);

  this.input.on("drag", function(pointer, gameObject, dragX, dragY) {
    console.log(gameObject.name === "sodiumAtomSprite");
    if (gameObject.name === "sodiumAtomSprite") {
      gameObject.x = dragX;
      gameObject.y = dragY;
    }

    state.atomX = dragX;
    state.atomY = dragY;

    console.log("gameObject", gameObject.name);
  });

  sodiumGraphics.destroy();
}
