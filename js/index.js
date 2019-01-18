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
  const renderAtom = ({ name, color, diameter, startPosition, draggable }) => {
    const atom = new Phaser.Geom.Ellipse(
      diameter / 2,
      diameter / 2,
      diameter,
      diameter
    );

    const atomGraphics = this.add
      .graphics({ fillStyle: { color } })
      .fillEllipseShape(atom, 64);

    atomGraphics.generateTexture(name, diameter, diameter);
    const atomSprite = this.add.sprite(startPosition.x, startPosition.y, name);

    if (draggable) {
      atomSprite.setInteractive();
      this.input.setDraggable(atomSprite);
    }
    atomGraphics.destroy();
    atomSprite.name = name;
    return atomSprite;
  };

  const chlorineAtom = renderAtom({
    name: "chlorineAtom",
    color: 0xff0000,
    diameter: 100,
    startPosition: {
      x: 300,
      y: 300
    },
    draggable: false
  });

  const fluorine = renderAtom({
    name: "fluorine",
    color: 0x9400d3,
    diameter: 75,
    startPosition: {
      x: 200,
      y: 200
    },
    draggable: true
  });

  const sodium = renderAtom({
    name: "sodiumAtomSprite",
    color: 0xffffff,
    diameter: elements.sodium.diameter,
    startPosition: {
      x: 100,
      y: 100
    },
    draggable: true
  });

  this.input.on("drag", function(pointer, gameObject, dragX, dragY) {
    console.log(gameObject.name === "sodiumAtomSprite");
    if (
      gameObject.name === "sodiumAtomSprite" ||
      gameObject.name === "fluorine"
    ) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    }

    state.atomX = dragX;
    state.atomY = dragY;

    console.log("gameObject", gameObject.name);
  });
}
