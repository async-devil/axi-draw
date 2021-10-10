const { createPath } = require("canvas-sketch-util/penplot");

/**
 * Convert degrees to radians
 * @param {number} degrees angle in degrees
 * @returns angle in radians
 */
function degToRad(degrees) {
  return (Math.PI / 180) * degrees
}

/**
 * Rotate point around the center point where y going down
 * @param {number} cx center point x
 * @param {number} cy center point y
 * @param {number} x rotate point x
 * @param {number} y rotate point y
 * @param {number} angle angle in degrees
 * @returns {number[]} rotated x and y
 */
function rotate(cx, cy, x, y, angle) {
  if (angle === 0 || !angle) return [x, y];

  const radians = degToRad(angle);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  
  const nx = cos * (x - cx) - sin * (y - cy) + cx;
  const ny = cos * (y - cy) + sin * (x - cx) + cy;

  return [nx, ny];
}

/**
 * Create rectangle, rotate if needed and push it to array
 * @param {Path[]} paths paths array
 * @param {number} x top left start x point 
 * @param {number} y top left start y point 
 * @param {number} width 
 * @param {number} height 
 * @param {number | undefined} angle angle in degrees
 */
function rect(paths, x, y, width, height, angle) {
  const xy1 = rotate(x, y, x, y, angle); // Top left corner
  const xy2 = rotate(x, y, x + width, y, angle); // Top right corner
  const xy3 = rotate(x, y, x + width, y + height, angle); // Bottom left corner
  const xy4 = rotate(x, y, x, y + height, angle); // Bottom right corner

  const path = createPath()

  path.moveTo(...xy1);
  path.lineTo(...xy2);
  path.lineTo(...xy3);
  path.lineTo(...xy4);
  path.lineTo(...xy1);

  paths.push(path)
}

module.exports = {degToRad, rect, rotate}
