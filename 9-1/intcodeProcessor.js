class IntcodeProcessor {
  constructor(program, ...inputs) {
    this.program = program;
    this.inputs = [...inputs];
    this.output = null;
    this.instructionPointer = 0;
    this.relativeBase = 0;
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
    let code = this.program.concat(Array(5000).fill(0));

    while (i < code.length && this.isRunning) {
      let [instruction, parameterModes] = this.parseInstruction(code[i]);

      let params = [code[code[i + 1]], code[code[i + 2]]];

      parameterModes.forEach((parameterMode, idx) => {
        if (parameterMode === 1) {
          params[idx] = code[i + idx + 1];
        } else if (parameterMode === 2) {
          params[idx] = code[this.relativeBase + code[i + idx + 1]];
        }
      });

      switch (instruction) {
        case 99:
          console.log('program complete');
          return;
        case 1: {
          let target = code[i + 3];
          console.log(
            `adding ${params[0]}, ${params[1]} and placing it at ${target}`
          );
          code[target] = params[0] + params[1];
          i += 4;
          break;
        }
        case 2: {
          let target = code[i + 3];
          console.log(
            `multiplying ${params[0]}, ${params[1]} and placing it at ${target}`
          );
          code[target] = params[0] * params[1];
          i += 4;
          break;
        }
        case 3: {
          if (this.inputs.length) {
            let target = parameterModes[0] === 2 ? params[0] : code[i + 1];
            console.log(`${i}: placing ${this.inputs[0]} at ${target}`);
            console.log(`relative base: ${this.relativeBase}`);
            code[target] = this.inputs.shift();
            i += 2;
          } else {
            this.instructionPointer = i;
            this.isRunning = false;
          }
          break;
        }
        case 4: {
          this.output = params[0];
          // console.log(`Line ${i}: ${this.output}`);
          this.sendOutput();
          i += 2;
          break;
        }
        case 5: {
          if (params[0]) i = params[1];
          else i += 3;
          console.log(`instruction 5 jumping to ${i}`);
          break;
        }
        case 6: {
          if (!params[0]) i = params[1];
          else i += 3;
          // console.log(`instruction 6 jumping to ${i}`);
          break;
        }
        case 7: {
          let target = code[i + 3];
          console.log(`checking if ${params[0]} is less than ${params[1]}`);
          code[target] = params[0] < params[1] ? 1 : 0;
          console.log(`placing ${code[target]} at ${target}`);
          i += 4;
          break;
        }
        case 8: {
          let target = code[i + 3];
          code[target] = params[0] === params[1] ? 1 : 0;
          // console.log(`placing ${code[target]} at ${target}`);
          i += 4;
          break;
        }
        case 9: {
          this.relativeBase += params[0];
          console.log(`new relative base: ${this.relativeBase}`);
          i += 2;
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

module.exports = IntcodeProcessor;
