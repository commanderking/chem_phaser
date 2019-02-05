const elementsEnum = {
  CHLORINE: "CHLORINE",
  SODIUM: "SODIUM",
  FLUORINE: "FLUORINE",
  MAGENSIUM: "MAGENSIUM"
};

const elementData = {
  SODIUM: {
    name: "Sodium",
    symbol: "Na",
    atomColor: 0xffffff,
    radius: 60,
    valenceElectrons: 1,
    initPosition: {
      x: 100,
      y: 300
    }
  },
  CHLORINE: {
    symbol: "Cl",
    name: "Chlorine",
    atomColor: 0xff0000,
    radius: 33.3,
    valenceElectrons: 7,
    initPosition: {
      x: 500,
      y: 500
    }
  },
  FLUORINE: {
    symbol: "F",
    name: "Fluorine",
    atomColor: 0x9400d3,
    radius: 16.66,
    valenceElectrons: 7,
    initPosition: {
      x: 200,
      y: 200
    }
  },
  MAGNESIUM: {
    symbol: "Mg",
    element: elementsEnum.Magnesium,
    atomColor: 0x9400d3,
    radius: 50,
    valenceElectrons: 2,
    initPosition: {
      x: 250,
      y: 250
    }
  }
};

const elementsForActivity = [
  {
    key: "sodium1",
    element: elementsEnum.SODIUM,
    ...elementData.SODIUM
  },
  {
    key: "chlorine",
    element: elementsEnum.CHLORINE,
    ...elementData.CHLORINE
  },
  {
    key: "fluorine",
    element: elementsEnum.FLUORINE,
    ...elementData.FLUORINE
  },
  {
    key: "magnesium",
    element: elementsEnum.MAGNESIUM,
    ...elementData.MAGNESIUM
  }
];
