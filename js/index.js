const { SODIUM, CHLORINE, FLUORINE } = elements;

var state = {
  atomX: null,
  atomY: null
};

let atomToTextMap = {};

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
var text;
function preload() {}
function create() {
  const renderAtom = ({ name, color, diameter }) => {
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
    atomGraphics.destroy();
  };

  const chlorine = renderAtom({
    name: "chlorine",
    color: 0xff0000,
    diameter: 100
  });

  const fluorine = renderAtom({
    name: "fluorine",
    color: 0x9400d3,
    diameter: 75
  });

  const sodium = renderAtom({
    name: "sodium",
    color: 0xffffff,
    diameter: SODIUM.diameter
  });

  this.atoms = this.add.group([
    {
      key: "sodium",
      setXY: {
        x: 100,
        y: 300
      }
    },
    {
      key: "fluorine",
      setXY: {
        x: 200,
        y: 200
      }
    },
    {
      key: "chlorine",
      setXY: {
        x: 300,
        y: 300
      }
    }
  ]);

  atomToTextMap[CHLORINE.key] = this.make.text(
    createAtomTextConfig({ text: "Cl", x: 300, y: 300 })
  );
  atomToTextMap[SODIUM.key] = this.make.text(
    createAtomTextConfig({ text: "Na", x: 100, y: 300 })
  );

  atomToTextMap[FLUORINE.key] = this.make.text(
    createAtomTextConfig({ text: "F", x: 200, y: 200 })
  );

  Phaser.Actions.Call(
    this.atoms.getChildren(),
    function(item) {
      item.setInteractive();
      this.input.setDraggable(item);
      item.on("drag", function(pointer, dragX, dragY) {
        console.log("item", item.texture.key);
        console.log("atomTextMap", atomToTextMap);
        console.log(atomToTextMap[item.texture.key]);
        item.x = dragX;
        item.y = dragY;

        atomToTextMap[item.texture.key].x = dragX;
        atomToTextMap[item.texture.key].y = dragY;
        // secondText.x = dragX;
        // secondText.y = dragY;

        state.atomX = dragX;
        state.atomY = dragY;
      });
    },
    this
  );

  var text = this.add.text(200, 100, "Sample Text", {
    font: "bold 64px Arial",
    align: "center",
    color: "white",
    align: "center"
  });
  text.setOrigin(0.5);
  text.alpha = 1;
  text.visible = 1;
}
