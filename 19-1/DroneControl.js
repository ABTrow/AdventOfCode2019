const IntcodeProcessor = require('../9-1/intcodeProcessor');

class DroneControl {
  constructor(program) {
    this.program = program;
    this.processor = new IntcodeProcessor(program);
    this.processor.setOutputDestination(this);
    this.tractorBeamArea = 0;
    this.tractionAtLastChecked = false;
    this.closeSpace = Array(50)
      .fill([])
      .map(row => Array(50).fill('.'));
  }

  receiveInput(input) {
    if (input === 1) {
      this.tractorBeamArea++;
      this.tractionAtLastChecked = true;
    } else {
      this.tractionAtLastChecked = false;
    }
  }

  checkSpace(x, y) {
    this.processor.receiveInput(x);
    this.processor.receiveInput(y);
    this.processor = new IntcodeProcessor(this.program);
    this.processor.setOutputDestination(this);
  }

  findTractorBeamArea() {
    for (let x = 0; x < 50; x++) {
      for (let y = 0; y < 50; y++) {
        this.checkSpace(x, y);
        if (this.tractionAtLastChecked) {
          console.log(`${x}, ${y}`);
          this.closeSpace[y][x] = '#';
        }
      }
    }
    console.log('Tractor Beam Area:', this.tractorBeamArea);
  }

  findTractorBeamSquare(size) {
    size--;
    let x = 3;
    let y = 0;
    while (true) {
      this.checkSpace(x, y);
      // console.log(x, y);
      if (this.tractionAtLastChecked) {
        console.log(`found beam at ${x}, ${y}`);
        this.checkSpace(x - size, y);
        if (this.tractionAtLastChecked) {
          this.checkSpace(x, y + size);
          if (this.tractionAtLastChecked) {
            this.checkSpace(x - size, y + size);
            if (this.tractionAtLastChecked) {
              console.log(`x: ${x}, y: ${y}`);
              return;
            } else {
              console.log('failed x, y');
              x++;
              y = 0;
            }
          } else {
            console.log('failed on y check');
            x++;
            y = 0;
          }
        } else {
          console.log('failed on x check');
          x++;
        }
      } else {
        y++;
      }
    }
  }
}

module.exports = DroneControl;
