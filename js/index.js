let state = {
  atomPositions: {},
  atomContainers: []
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

  const createElectronAndAddToContainer = (
    container,
    electronNumber,
    valenceElectrons,
    radius,
    key
  ) => {
    const electronPosition = getElectronPosition(
      electronNumber,
      valenceElectrons,
      radius
    );
    const { x, y } = electronPosition;
    const electronKey = createElectronTexture(electronNumber, key);
    let electronSprite = this.add.sprite(x, y, electronKey);
    electronSprite.setOrigin(0.5, 0.5);
    electronSprite.setData({
      valenceElectrons,
      electronNumber
    });

    container.add(electronSprite);
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
    container.setData("atomKey", key);

    // Create atom texture
    const atom = renderAtom({
      name: key,
      color: atomColor,
      radius
    });
    const atomSprite = this.add.sprite(0, 0, key);

    // Create and configure text
    const containerText = this.add.text(0, 0, symbol, {
      font: "bold 20px Arial",
      color: "black"
    });
    containerText.setOrigin(0.5, 0.5);

    // Create the electrons
    for (let i = 1; i <= valenceElectrons; i++) {
      createElectronAndAddToContainer(
        container,
        i,
        valenceElectrons,
        radius,
        key
      );
    }

    // Add everything to container
    container.add(atomSprite);
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

      state.atomPositions[key] = {
        x: dragX,
        y: dragY
      };
      const draggedAtomContainerBounds = container.getBounds();

      // hardcode to sodium for now for testing - will likely need to for loop over this logic
      const nonDraggedAtomContainer = state.atomContainers[0];

      const intersection = Phaser.Geom.Rectangle.Intersection(
        draggedAtomContainerBounds,
        nonDraggedAtomContainer.getBounds()
      );

      // Logic for if this atom intersects with another atom
      if (intersection.width !== 0 || intersection.height !== 0) {
        const nonDraggedAtomContainerChildren = nonDraggedAtomContainer.list;
        const draggedAtomKey = container.getData("atomKey");
        // This only finds one electron. We'll need logic to see how many electrons can be donated and
        // see how many can actually carry over
        console.log("nonDraggedAtomContainer", nonDraggedAtomContainer);
        const electronSprite = nonDraggedAtomContainerChildren.find(child => {
          return (
            child.type === "Sprite" &&
            child.texture.key.includes(
              `${nonDraggedAtomContainer.getData("atomKey")}Electron`
            )
          );
        });

        if (electronSprite) {
          // Get all electrons that belong to the currently dragged item and destroy them
          const electronSprites = container.list.filter(atom => {
            return (
              atom.type === "Sprite" &&
              atom.texture.key.includes(`${draggedAtomKey}Electron`)
            );
          });
          electronSprites.forEach(electron => electron.destroy());

          // Get the atom information from the element in the store
          // Should we just move all the info onto the data part of each sprite?
          const atomIndex = state.atomContainers.find(
            atom => atom.key === draggedAtomKey
          );
          console.log("state.atomContainers", state.atomContainers);
          console.log("atomIndex", atomIndex);
          const draggedAtom = state.atomContainers.find(
            atom => atom.key === draggedAtomKey
          );
          console.log("draggedAtom", draggedAtom);

          // TODO: Need to update with correct valence electrons depending on how many electrons
          // can be pulled off
          // Updating the state of the dragged item to have the correct number of valece electrons
          const newNumberOfValenceElectrons = valenceElectrons + 1;
          const newElectronState = [...state.atomContainers];
          newElectronState[atomIndex] = {
            ...newElectronState[atomIndex],
            valeneceElectrons: newNumberOfValenceElectrons
          };

          // Re-render those electrons on the dragged atom based on the new valence electron state
          state.atomContainers = newElectronState;
          console.log("container", container);
          for (let i = 1; i <= newNumberOfValenceElectrons; i++) {
            createElectronAndAddToContainer(
              container,
              i,
              newNumberOfValenceElectrons,
              16.66, // This is radius for Fluorine, update to be dynamic
              draggedAtomKey
            );
          }
          // destory electron on dragged item
          electronSprite.destroy();
        }
      }
    });

    state.atomContainers.push(container);
    return container;
  };
  elementsForActivity.forEach(atom => renderAtomContainer(atom));
}
