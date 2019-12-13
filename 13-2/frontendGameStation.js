class GameStation {
  constructor(program, canvas) {
    this.processor = new IntcodeProcessor(program);
    this.instructionQueue = [];
    this.canvas = canvas;
    this.screenHeight = canvas.length;
    this.screenWidth = canvas[0].length;
    this.joystickDirection = 0;
    this.score = 0;
    this.processor.setOutputDestination(this);
  }

  receiveInput(input) {
    console.log('got input from processor');
    this.instructionQueue.push(input);
    if (this.instructionQueue.length === 3) {
      this.handleInstruction();
    }
  }

  start() {
    this.processor.executeCode();
  }

  handleInstruction() {
    if (this.instructionQueue[0] === -1) {
      this.score = this.instructionQueue[2];
    } else {
      let x = this.instructionQueue[0];
      let y = this.instructionQueue[1];
      let blockType = this.instructionQueue[2];

      this.setPixel({ x, y, blockType });
      console.log(
        this.canvas.map(line => {
          return line.join('');
        })
      );
      this.processor.receiveInput(this.joystickDirection);
    }

    this.instructionQueue = [];
  }

  setPixel(instruction) {
    let { x, y, blockType } = instruction;
    this.canvas[y][x] = drawDictionary[blockType];
  }
}
