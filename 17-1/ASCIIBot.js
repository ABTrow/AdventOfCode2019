const IntcodeProcessor = require('../9-1/intcodeProcessor');

class ASCIIBot {
  constructor(program, main, a, b, c) {
    this.cameraFeed = ``;
    this.processor = new IntcodeProcessor(program);
    this.processor.setOutputDestination(this);
    this.main = main;
    this.a = a;
    this.b = b;
    this.c = c;
  }

  sendRoutine(routine) {
    let stringRoutine = routine + '\n';
    for (let i = 0; i < stringRoutine.length; i++) {
      this.processor.receiveInput(stringRoutine.charCodeAt(i));
    }
  }

  receiveInput(input) {
    this.cameraFeed += String.fromCharCode(input);
  }

  run() {
    this.processor.executeCode();
  }
}

module.exports = ASCIIBot;
