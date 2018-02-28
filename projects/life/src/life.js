/**
 * Implementation of Conway's game of Life
 */

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  let a = new Array(height);
  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * Life class
 */
class Life {

  /**
   * Constructor
   */
  constructor(width, height) {
    // !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;
    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];

    this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const rand = (Math.random()*2)|0;
        this.buffer[this.currentBufferIndex][y][x] = rand;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    // Fill the offscreen buffer with the next life generation
    // from the current buffer.

    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

     // See if we have a neighbor to infect this one
     function hasInfectiousNeighbor(x, y) {
      const nextValue = (currentBuffer[y][x] + 1) % 2;
      let neighborCount = 0;

      // North West -  neighbor of cell x, y
      if (y > 0 && x > 0) {
        if (currentBuffer[y - 1][x - 1] === nextValue) {
          neighborCount++;
        }
      }

      // North -  neighbor of cell x, y
      if (y > 0) {
        if (currentBuffer[y - 1][x] === nextValue) {
          neighborCount++;
        }
      }

      // North East -  neighbor of cell x, y
      if (y > 0 && y < this.width - 1) {
        if (currentBuffer[y - 1][x + 1] === nextValue) {
          neighborCount++;
        }
      }

      // East -  neighbor of cell x, y
      if (y < this.width - 1) {
        if (currentBuffer[y][x + 1] === nextValue) {
          neighborCount++;
        }
      }

      // South East -  neighbor of cell x, y
      if (y < this.height - 1 && y < this.width - 1) {
        if (currentBuffer[y + 1][x + 1] === nextValue) {
          neighborCount++;
        }
      }

      // South -  neighbor of cell x, y
      if (y < this.height - 1) {
        if (currentBuffer[y + 1][x] === nextValue) {
          neighborCount++;
        }
      }

      // South West -  neighbor of cell x, y
      if (y < this.height - 1 && x > 0) {
        if (currentBuffer[y + 1][x - 1] === nextValue) {
          neighborCount++;
        }
      }

      // WEST -  neighbor of cell x, y
      if (x > 0) {
        if (currentBuffer[y][x - 1] === nextValue) {
          neighborCount++;
        }
      }

      // If we've made it this far we aren't infected
      return neighborCount;
    }

    // Loop through and decide the state of the next generation
    // for each cell processed.
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // let count = hasInfectiousNeighbor.call(this, x, y);
        let count = (hasInfectiousNeighbor.bind(this))(x, y);
        let current = currentBuffer[y][x];

        if (current === 1) {
          if (count < 2 || count > 3) {
            backBuffer[y][x] = 0;
          } else {
            backBuffer[y][x] = 1;
          }
        } else {
          if (count === 3) {
            backBuffer[y][x] = 1;
          } else {
            backBuffer[y][x] = 0;
          }
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
