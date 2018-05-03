/**
 * Implementation of Conway's game of Life
 */
const MODULO = 2;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  //NOTE:  Iterate through Array2D row first then column
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
    ]

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
    for (let row = 0; row < this.height; row ++) {
      this.buffer[this.currentBufferIndex][row].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col ++) {
        this.buffer[this.currentBufferIndex][row][col] = (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    //console.log("stepping");
    let backBufferIndex = this.currentBufferIndex === 0 ? 1: 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];



    function countLivingNeighbors(row, col) {
      let neighbors = 0;
      // console.log("called CountLivingNeighbors");
      
      for (let nRow = -1; nRow <= 1; nRow++) {
        let rowPos = row + nRow;
        if(rowPos < 0 || rowPos >= this.height) {
          continue;
        }
        for(let nCol = -1; nCol <= 1; nCol++) {
          let colPos = col + nCol;
          if(colPos < 0 || colPos >= this.width) {
            continue;
          }
          if(currentBuffer[rowPos][colPos] === 1) {
            if(!(rowPos === row && colPos === col)) {
              neighbors++;
            }
          }
        }
      }
      return neighbors;
    }

    for (let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        let numOfNeighbors = countLivingNeighbors.call(this, row, col);
        if(currentBuffer[row][col] === 1) {
          if(numOfNeighbors < 2) {
            backBuffer[row][col] = 0;
          }
          if (numOfNeighbors === 2 || numOfNeighbors === 3) {
            backBuffer[row][col] = 1;
          }
          if(numOfNeighbors > 3) {
            backBuffer[row][col] = 0;            
          }
        } else if (currentBuffer[row][col] === 0) {
          if(numOfNeighbors === 3) {
            backBuffer[row][col] = 1;
          } else {
            backBuffer[row][col] = 0;            
          }
        } else {
          console.log("error, invalid value");
        }
      }
    }


    // for(let row = 0; row < this.height; row++){
    //   for(let col = 0; col < this.width; col++){
    //     if (hasInfectionsNeighbor.call(this, row, col)){
    //       //console.log("changing color");
    //       backBuffer[row][col] = (currentBuffer[row][col] + 1) % 2;
    //     }
    //     else{
    //       backBuffer[row][col] = currentBuffer[row][col];
    //     }
    //   }
    // }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1: 0;
    //console.log("after changing buffer index, ", this.currentBufferIndex);
  }
}

export default Life;
