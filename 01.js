const canvasSketch = require("canvas-sketch");
const { clipPolylinesToBox } = require("canvas-sketch-util/geometry");
const { renderPaths, pathsToPolylines } = require("canvas-sketch-util/penplot");
const Random = require("canvas-sketch-util/random");
const { rect } = require("./utils");

const settings = {
  dimensions: "A4",
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "mm",
};

const defaultSeed = "";

Random.setSeed(defaultSeed || Random.getRandomSeed());
console.log("Random Seed:", Random.getSeed());

const sketch = ({ width, height, units }) => {
  const paths = [];

  const gap = height / 60;
  const rectWidth = (width - gap * 7) / 4;
  const rectHeight = rectWidth;

  const rows = 4;
  const cols = 4;

  for (let ix = 0; ix < rows; ix++) {
    for (let iy = 0; iy < cols; iy++) {
      const x = ix * (rectWidth + gap) + 10;
      const y = iy * (rectHeight + gap) + 10;
      rect(paths, x, y, rectWidth, rectHeight, 0);

      const randomInnerRect = (margin) => {
        if (Random.gaussian(2, 4) > 0) {
          rect(
            paths,
            x + margin / 2,
            y + margin / 2,
            rectWidth - margin,
            rectHeight - margin,
            0
          );
        }

        if (Random.gaussian(2, 4) > 0)
          randomInnerRect(Math.min(margin + 6, rectHeight));
      };

      randomInnerRect(gap);
    }
  }
  const margin = 1.0;
  const box = [margin, margin, width - margin, height - margin];
  const lines = clipPolylinesToBox(pathsToPolylines(paths, { units }), box);

  return (props) => renderPaths(lines, props);
};

canvasSketch(sketch, settings);
