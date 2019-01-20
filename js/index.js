const { SODIUM, CHLORINE, FLUORINE } = elements;

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
  // Creates graphic and texture for atom, then deletes graphic
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

    const texture = atomGraphics.generateTexture(name, diameter, diameter);
    atomGraphics.destroy();
    return texture;
  };

  // Renders Atom texture, text, and makes container draggable
  const renderAtomContainer = ({
    key,
    atomColor,
    diameter,
    symbol,
    initPosition
  }) => {
    const { x, y } = initPosition;
    const container = this.add.container(x, y);
    container.key = `${key}Container`;

    const atom = renderAtom({
      name: key,
      color: atomColor,
      diameter
    });
    const sodiumSprite = this.add.sprite(0, 0, key);

    const containerText = this.add.text(0, 0, symbol, {
      font: "bold 20px Arial",
      color: "green"
    });
    containerText.setOrigin(0.5, 0.5);

    container.add(sodiumSprite);
    container.add(containerText);

    // Making the container draggable
    container.setInteractive(
      new Phaser.Geom.Circle(0, 0, diameter / 2),
      Phaser.Geom.Circle.Contains
    );
    this.input.setDraggable(container);
    container.on("drag", function(pointer, dragX, dragY) {
      container.x = dragX;
      container.y = dragY;
    });

    return container;
  };

  renderAtomContainer(CHLORINE);
  renderAtomContainer(FLUORINE);
  renderAtomContainer(SODIUM);
}
