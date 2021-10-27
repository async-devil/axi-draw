const canvasSketch = require("canvas-sketch");
const { clipPolylinesToBox } = require("canvas-sketch-util/geometry");
const { renderPaths, pathsToPolylines } = require("canvas-sketch-util/penplot");
const Random = require("./Random");
const utils = require("./utils");

const defaultSeed = "";

const random = new Random(defaultSeed || undefined);

console.log("Random Seed:", random.seed);
document.title = random.seed;

const date = new Date();
const stringDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
const stringTime = `${date.getHours()}:${date.getMinutes()}`;
const name = `${stringDate}-${stringTime}-${random.seed}`;

const settings = {
  dimensions: "A4",
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "mm",
  name: name,
};

const sketch = ({ width, height, units }) => {
  const paths = [];

  const count = 100;
  const rWidth = width * 0.1;
  const rHeight = height * 0.01;

  const draw = () => {
    for (let i = 0; i < count / 2; i++) {
      utils.rectRotateByRadius(
        paths,
        width / 2,
        height / 2,
        width * 0.1,
        rWidth * random.randomGaussianArbitary(0, 1, 2),
        rHeight * random.randomGaussianArbitary(),
        (360 * i) / (count / 2)
      );
    }

    for (let i = 0; i < count; i++) {
      utils.rectRotateByRadius(
        paths,
        width / 2,
        height / 2,
        width * 0.2,
        rWidth * random.randomGaussianArbitary(0, 1, 2),
        rHeight * random.randomGaussianArbitary(),
        (360 * i) / count
      );
    }

    for (let i = 0; i < count; i++) {
      utils.rectRotateByRadius(
        paths,
        width / 2,
        height / 2,
        width * 0.3,
        rWidth * random.randomGaussianArbitary(),
        rHeight * random.randomGaussianArbitary(),
        (360 * i) / count
      );
    }

    for (let i = 0; i < count; i++) {
      utils.rectRotateByRadius(
        paths,
        width / 2,
        height / 2,
        width * 0.4,
        rWidth * random.randomGaussianArbitary(0, 1, 2),
        rHeight * random.randomGaussianArbitary(),
        (360 * i) / count
      );
    }
  };

  draw();

  const margin = 0;
  const box = [margin, margin, width - margin, height - margin];
  const lines = clipPolylinesToBox(pathsToPolylines(paths, { units }), box);

  return (props) => renderPaths(lines, props);
};

canvasSketch(sketch, settings);
