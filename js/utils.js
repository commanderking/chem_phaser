const createAtomTextConfig = ({ text, x, y }) => ({
  x,
  y,
  text,
  style: {
    font: "bold 16px Arial",
    color: "#000000",
    align: "center"
  },
  origin: 0.5
});

const getElectronPosition = (index, valenceElectrons, radius) => {
  const distanceFromCenterOfAtom = radius + 10;
  const paddingBetweenElectrons = 7;

  // Both these electrons are placed in top (s) orbital
  if (index === 1) {
    const isOnlyElectronInOrbital = valenceElectrons === 1;
    return {
      x: isOnlyElectronInOrbital ? 0 : -paddingBetweenElectrons,
      y: -distanceFromCenterOfAtom
    };
  }
  if (index === 2) {
    return {
      x: paddingBetweenElectrons,
      y: -distanceFromCenterOfAtom
    };
  }

  // Electrons 3 and 6 are placed to the right of atom, in the px orbital
  if (index === 3) {
    // 6th electron will pair up with electron in this orbital
    const isOnlyElectronInOrbital = valenceElectrons < 6;
    return {
      x: distanceFromCenterOfAtom,
      y: isOnlyElectronInOrbital ? 0 : -paddingBetweenElectrons
    };
  }
  if (index === 6) {
    return {
      x: distanceFromCenterOfAtom,
      y: paddingBetweenElectrons
    };
  }

  // Electrons 4 and 7 are placed in the bottom of atom, in the py orbital
  if (index === 4) {
    const isOnlyElectronInOrbital = valenceElectrons < 7;
    return {
      x: isOnlyElectronInOrbital ? 0 : paddingBetweenElectrons,
      y: distanceFromCenterOfAtom
    };
  }

  if (index === 7) {
    return {
      x: -paddingBetweenElectrons,
      y: distanceFromCenterOfAtom
    };
  }

  // Electrons 5 and 8 are placed to the left of the atom, in the pz orbital
  if (index === 5) {
    const isOnlyElectronInOrbital = valenceElectrons < 8;
    return {
      x: -distanceFromCenterOfAtom,
      y: isOnlyElectronInOrbital ? 0 : -paddingBetweenElectrons
    };
  }
  if (index === 8) {
    return {
      x: -distanceFromCenterOfAtom,
      y: paddingBetweenElectrons
    };
  }
  throw new Error("there are more than 8 valence electrons passed in");
  return null;
};
