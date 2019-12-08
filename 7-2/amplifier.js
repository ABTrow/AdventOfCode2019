class Amplifier {
  constructor(program, ...inputs) {
    this.program = program;
    this.inputs = [...inputs];
    this.output = null;
    this.instructionPointer = 0;
    this.isRunning = false;
    this.outputDestination = null;
  }

  setOutputDestination(destination) {
    this.outputDestination = destination;
  }

  receiveInput(input) {
    this.inputs.push(input);
    if (!this.isRunning) {
      this.executeCode();
    }
  }

  sendOutput() {
    if (this.outputDestination) {
      this.outputDestination.receiveInput(this.output);
    } else {
      console.log(this.output);
    }
  }

  executeCode() {
    this.isRunning = true;
    let i = this.instructionPointer;
    let code = this.program;

    while (i < code.length && this.isRunning) {
      let [instruction, parameterModes] = this.parseInstruction(code[i]);

      let param1 = parameterModes[0] ? code[i + 1] : code[code[i + 1]];
      let param2 = parameterModes[1] ? code[i + 2] : code[code[i + 2]];

      switch (instruction) {
        case 99:
          // console.log('program complete');
          return this.output;
        case 1: {
          let target = code[i + 3];
          // console.log(`adding ${param1}, ${param2} and placing it at ${target}`);
          code[target] = param1 + param2;
          i += 4;
          break;
        }
        case 2: {
          let target = code[i + 3];
          // console.log(`multiplying ${param1}, ${param2} and placing it at ${target}`);
          code[target] = param1 * param2;
          i += 4;
          break;
        }
        case 3: {
          if (this.inputs.length) {
            let target = code[i + 1];
            // console.log(`placing ${inputs[inputIndex]} at ${target}`);
            code[target] = this.inputs.shift();
            i += 2;
          } else {
            this.instructionPointer = i;
            this.isRunning = false;
          }
          break;
        }
        case 4: {
          this.output = param1;
          // console.log(`Line ${i}: ${this.output}`);
          this.sendOutput();
          i += 2;
          break;
        }
        case 5: {
          if (param1) i = param2;
          else i += 3;
          break;
        }
        case 6: {
          if (!param1) i = param2;
          else i += 3;
          break;
        }
        case 7: {
          let target = code[i + 3];
          code[target] = param1 < param2 ? 1 : 0;
          i += 4;
          break;
        }
        case 8: {
          let target = code[i + 3];
          code[target] = param1 === param2 ? 1 : 0;
          i += 4;
          break;
        }
        default:
          throw new Error(
            `You goofed. Invalid intCode ${code[i]} at location ${i}`
          );
      }
    }
  }

  parseInstruction(rawInstruction) {
    let instruction = rawInstruction % 100;
    let parameters = Math.floor(rawInstruction / 100);

    parameters = String(parameters)
      .split('')
      .reverse()
      .map(char => Number(char));

    return [instruction, parameters];
  }
}

module.exports = Amplifier;
