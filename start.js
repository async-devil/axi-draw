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

  const draw = () => {};

  draw();

  const margin = 0;
  const box = [margin, margin, width - margin, height - margin];
  const lines = clipPolylinesToBox(pathsToPolylines(paths, { units }), box);

  return (props) => renderPaths(lines, props);
};

canvasSketch(sketch, settings);
