const IntcodeProcessor = require('../9-1/intcodeProcessor');

class ASCIIBot {
  constructor(program) {
    this.cameraFeed = ``;
    this.processor = new IntcodeProcessor(program);
    this.processor.setOutputDestination(this);
  }

  receiveInput(input) {
    this.cameraFeed += String.fromCharCode(input);
  }

  run() {
    this.processor.executeCode();
  }
}

module.exports = ASCIIBot;
