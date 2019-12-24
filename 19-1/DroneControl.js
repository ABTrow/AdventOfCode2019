const IntcodeProcessor = require('../9-1/intcodeProcessor');

class DroneControl {
  constructor(program) {
    this.program = program;
    this.processor = new IntcodeProcessor(program);
    this.processor.setOutputDestination(this);
    this.tractorBeamArea = 0;
  }

  receiveInput(input) {
    if (input === 1) {
      this.tractorBeamArea++;
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
      }
    }
    console.log('Tractor Beam Area:', this.tractorBeamArea);
  }
}

module.exports = DroneControl;
