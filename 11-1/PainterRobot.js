const IntcodeProcessor = require('../9-1/intcodeProcessor');

class PainterRobot {
  constructor(program) {
    this.processor = new IntcodeProcessor(program);
    this.instructionQueue = [];
    this.location = { x: 100, y: 100 };
    this.direction = 90;
    this.history = new Set();
    this.canvas = Array(200)
      .fill([])
      .map(e => Array(200).fill(0));

    this.processor.setOutputDestination(this);
  }

  receiveInput(input) {
    this.instructionQueue.push(input);
    if (this.instructionQueue.length === 2) {
      this.paintAndMove();
    }
  }

  paintAndMove() {
    this.history.add(`${this.location.x},${this.location.y}`);
    this.canvas[this.location.y][
      this.location.x
    ] = this.instructionQueue.shift();
    let turn = this.instructionQueue.shift();
    if (turn === 0) this.direction += 90;
    else this.direction -= 90;
    this.direction = (360 + this.direction) % 360;

    switch (this.direction) {
      case 0:
        this.location.x++;
        break;
      case 90:
        this.location.y--;
        break;
      case 180:
        this.location.x--;
        break;
      case 270:
        this.location.y++;
        break;
    }

    this.paintCode();
  }

  paintCode() {
    this.processor.receiveInput(this.canvas[this.location.y][this.location.x]);
  }
}

module.exports = PainterRobot;
