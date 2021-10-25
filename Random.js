class Random {
  /** @private @param {number} intSeed 32bit seed number made of string seed by xmur3 */
  intSeed;
  /** @private @param {string} strSeed string seed */
  strSeed;

  /**
   * @param {string | undefined} seed seed for PRNG, will generate new if not passed
   */
  constructor(seed) {
    this.strSeed = seed || (Math.random() + 1).toString(36).substring(2);
    this.intSeed = this.xmur3(this.strSeed);
  }

  /**
   * xmur3 seed generate algorithm
   * @private
   * @param {string} str string seed
   * @returns {number} 32bit seed
   */
  xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }

    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);

    return (h ^= h >>> 16) >>> 0;
  }

  /**
   * mulberry32 PRNG algorithm
   * @private
   * @param {number} seed 32bit seed
   * @returns {number} pseudo random float from 0 to 1
   */
  mulberry32(seed) {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;

    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  get seed() {
    return this.strSeed;
  }

  /**
   * Get pseudo random float between 0 and 1
   * @returns {number} pseudo random float between 0 and 1
   */
  randomFloat() {
    const seed = this.intSeed++;

    return this.mulberry32(seed);
  }

  /**
   * Get pseudo random integet between min and max inclusive
   * @param {number} min inclusive min number
   * @param {number} max inclusive max number
   * @returns {number} pseudo random integer between min and max inclusive
   */
  randomIntArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(this.randomFloat() * (max - min + 1)) + min;
  }

  /**
   * Get pseudo random float normal distributed between min and max exclusive and skew if needed
   * @param {number} min exclusive min number @default 0
   * @param {number} max exclisive max number @default 1
   * @param {number | undefined} skew skew parameter @default 1
   * @returns {number} normal distributed pseudo random number
   */
  randomGaussianArbitary(min, max, skew) {
    const u = this.randomFloat();
    const v = this.randomFloat();

    skew = skew || 1;
    min = min || 0;
    max = max || 1;

    let num =
      Math.sqrt(-2.0 * Math.log(u || u + 0.2)) *
      Math.cos(2.0 * Math.PI * (v || v + 0.2));

    num = num / 10.0 + 0.5; // Translate to 0 -> 1

    if (num > 1 || num < 0) num = this.randomGaussianArbitary(min, max, skew);
    // resample between 0 and 1 if out of range
    else {
      num = Math.pow(num, skew); // Skew
      num *= max - min; // Stretch to fill range
      num += min; // offset to min
    }
    return num;
  }
}

module.exports = Random;
