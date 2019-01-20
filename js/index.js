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
  const renderAtom = ({ name, color, radius }) => {
    const atom = new Phaser.Geom.Ellipse(
      radius,
      radius,
      radius * 2,
      radius * 2
    );

    const atomGraphics = this.add
      .graphics({ fillStyle: { color } })
      .fillEllipseShape(atom, 64);

    const texture = atomGraphics.generateTexture(name, radius * 2, radius * 2);
    atomGraphics.destroy();
    return texture;
  };

  // Generate electron texture, but does not add it to the scene yet
  // Follow up with this.sprite.add or this.container.add
  const createElectronTexture = (index, atomName) => {
    const radius = 5;
    const electron = new Phaser.Geom.Ellipse(
      radius,
      radius,
      radius * 2,
      radius * 2
    );
    const electronGraphics = this.add
      .graphics({
        fillStyle: { color: 0xffff00 }
      })
      .fillEllipseShape(electron, 64);
    const texture = electronGraphics.generateTexture(
      `${atomName}Electron${index}`,
      radius * 2,
      radius * 2
    );
    electronGraphics.destroy();
    return `${atomName}Electron${index}`;
  };

  // Renders Atom texture, text, and makes container draggable
  const renderAtomContainer = ({
    key,
    atomColor,
    radius,
    symbol,
    initPosition,
    valenceElectrons
  }) => {
    const { x, y } = initPosition;
    const container = this.add.container(x, y);
    container.key = `${key}Container`;

    // Create atom texture
    const atom = renderAtom({
      name: key,
      color: atomColor,
      radius
    });
    const sodiumSprite = this.add.sprite(0, 0, key);

    // Create and configure text
    const containerText = this.add.text(0, 0, symbol, {
      font: "bold 20px Arial",
      color: "black"
    });
    containerText.setOrigin(0.5, 0.5);

    // Create the electrons
    for (let i = 1; i <= valenceElectrons; i++) {
      const electronPosition = getElectronPosition(i, valenceElectrons, radius);
      const { x, y } = electronPosition;
      const electronKey = createElectronTexture(i, key);
      let electronSprite = this.add.sprite(x, y, electronKey);
      electronSprite.setOrigin(0.5, 0.5);

      container.add(electronSprite);
    }

    // Add everything to container
    container.add(sodiumSprite);
    container.add(containerText);

    // Making the container draggable
    container.setInteractive({
      draggable: true,
      useHandCursor: true,
      hitArea: new Phaser.Geom.Circle(0, 0, radius),
      hitAreaCallback: Phaser.Geom.Circle.Contains
    });
    container.on("drag", function(pointer, dragX, dragY) {
      container.x = dragX;
      container.y = dragY;
    });

    return container;
  };
  elementsForActivity.forEach(atom => renderAtomContainer(atom));
}
