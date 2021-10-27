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
  units: "mm",
  scaleToView: true,

  background: "black",
  foreground: "white",
  lineWidth: 0.3,

  name: name,
};

const sketch = ({ width, height, units }) => {
  const paths = [];

  const draw = () => {
    const count = 1000;

    for (let i = 0; i < count; i++) {
      const slice = (360 * i) / count;

      utils.arc(
        paths,
        width / 2,
        height / 2,
        width * random.randomFloat(),
        slice * random.randomGaussianArbitary(0, 1),
        slice * random.randomGaussianArbitary(0, 1)
      );
    }
  };

  draw();

  const margin = 5;
  const box = [margin, margin, width - margin, height - margin];
  const lines = clipPolylinesToBox(pathsToPolylines(paths, { units }), box);

  return (props) =>
    renderPaths(lines, {
      ...props,
      lineWidth: settings.lineWidth,
      background: settings.background,
      foreground: settings.foreground,
    });
};

canvasSketch(sketch, settings);
