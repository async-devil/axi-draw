const canvasSketch = require("canvas-sketch");
const { clipPolylinesToBox } = require("canvas-sketch-util/geometry");
const { renderPaths, pathsToPolylines } = require("canvas-sketch-util/penplot");
const Random = require("./Random");
const { rect, arc } = require("./utils");

const settings = {
  dimensions: "A4",
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "mm",
};

const defaultSeed = "";

const random = new Random(defaultSeed || undefined);

console.log("Random Seed:", random.seed);
document.title = random.seed

const sketch = ({ width, height, units }) => {
  const paths = [];

  const centerX = width / 2;
  const centerY = height / 2;

  const max = 50;

  const radius = (i) => {
    return (width / 2 ) - (width / 2 / max) * i;
  };

  for (let i = 0; i < max; i++) {
    const startA = random.randomGaussianArbitary(0, 360)
    let endA = startA + (360 / max) * i 
    endA = endA > 360 ? startA - (360 / max) * i : endA

    arc(
      paths,
      centerX,
      centerY,
      radius(i),
      random.randomGaussianArbitary(0, 360, 0.25),
      random.randomGaussianArbitary(0, 360, 1)
    );
  }

  for (let i = 0; i < max; i++) {
    const startA = random.randomGaussianArbitary(0, 360);
    let endA = startA + (360 / max) * i;
    endA = endA > 360 ? startA - (360 / max) * i : endA;

    arc(
      paths,
      centerX,
      centerY,
      radius(i),
      random.randomGaussianArbitary(0, 360, 0.25),
      random.randomGaussianArbitary(0, 360, 1)
    );
  }

  const margin = 0;
  const box = [margin, margin, width - margin, height - margin];
  const lines = clipPolylinesToBox(pathsToPolylines(paths, { units }), box);

  return (props) => renderPaths(lines, props);
};

canvasSketch(sketch, settings);
