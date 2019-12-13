const IntcodeProcessor = require('../9-1/intcodeProcessor');

class GameStation {
  constructor(program, canvas) {
    this.program = program;
    this.processor = new IntcodeProcessor(program);
    this.instructionQueue = [];
    this.renderInstructions = [];
    this.canvas = canvas;
    this.screenHeight = this.canvas.length;
    this.screenWidth = this.canvas[0].length;
    this.processor.setOutputDestination(this);
  }

  receiveInput(input) {
    this.instructionQueue.push(input);
    if (this.instructionQueue.length === 3) {
      this.addRenderInstruction();
    }
  }

  start() {
    this.processor.executeCode();
  }

  addRenderInstruction() {
    let x = this.instructionQueue[0];
    let y = this.instructionQueue[1];
    let blockType = this.instructionQueue[2];

    this.instructionQueue = [];
    this.renderInstructions.push({ x, y, blockType });
    if (
      this.renderInstructions.length ===
      this.screenHeight * this.screenWidth
    ) {
      this.renderFrame();
    }
  }

  renderFrame() {
    console.log('rendering frame....');
    for (let instruction of this.renderInstructions) {
      this.drawPixel(instruction);
    }
    console.log(
      this.canvas.map(line => {
        return line.join('');
      })
    );
  }

  drawPixel(instruction) {
    let { x, y, blockType } = instruction;
    const drawDictionary = [' ', '◊', '#', '–', '•'];
    this.canvas[y][x] = drawDictionary[blockType];
  }
}

module.exports = GameStation;
