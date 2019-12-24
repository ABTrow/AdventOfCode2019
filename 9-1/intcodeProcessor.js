class IntcodeProcessor {
  constructor(program, ...inputs) {
    this.program = program.concat(Array(5000).fill(0));
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

  findWriteTarget(mode, parameter) {
    if (mode === 2) return this.relativeBase + parameter;
    return parameter;
  }

  findReadArgument(mode, parameter) {
    if (mode === 2) return this.program[this.relativeBase + parameter];
    if (mode === 1) return parameter;
    return this.program[parameter];
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

      // console.log(`line ${i}:`);

      switch (instruction) {
        case 99:
          // console.log('program complete');
          return;
        case 1: {
          let noun = this.findReadArgument(parameterModes[0], code[i + 1]);
          let verb = this.findReadArgument(parameterModes[1], code[i + 2]);
          let target = this.findWriteTarget(parameterModes[2], code[i + 3]);
          // console.log(
          //   `adding ${noun}, ${verb} and placing it at ${target}`
          // );
          code[target] = noun + verb;
          i += 4;
          break;
        }
        case 2: {
          let noun = this.findReadArgument(parameterModes[0], code[i + 1]);
          let verb = this.findReadArgument(parameterModes[1], code[i + 2]);
          let target = this.findWriteTarget(parameterModes[2], code[i + 3]);
          // console.log(
          //   `multiplying ${noun}, ${verb} and placing it at ${target}`
          // );
          code[target] = noun * verb;
          i += 4;
          break;
        }
        case 3: {
          if (this.inputs.length) {
            let target = this.findWriteTarget(parameterModes[0], code[i + 1]);
            // console.log(`${i}: placing ${this.inputs[0]} at ${target}`);
            code[target] = this.inputs.shift();
            i += 2;
          } else {
            this.instructionPointer = i;
            this.isRunning = false;
          }
          break;
        }
        case 4: {
          this.output = this.findReadArgument(parameterModes[0], code[i + 1]);
          // console.log(`Line ${i}: ${this.output}`);
          this.sendOutput();
          i += 2;
          break;
        }
        case 5: {
          let noun = this.findReadArgument(parameterModes[0], code[i + 1]);
          let verb = this.findReadArgument(parameterModes[1], code[i + 2]);
          if (noun) i = verb;
          else i += 3;
          // console.log(`instruction 5 jumping to ${i}`);
          break;
        }
        case 6: {
          let noun = this.findReadArgument(parameterModes[0], code[i + 1]);
          let verb = this.findReadArgument(parameterModes[1], code[i + 2]);
          if (!noun) i = verb;
          else i += 3;
          // console.log(`instruction 6 jumping to ${i}`);
          break;
        }
        case 7: {
          let noun = this.findReadArgument(parameterModes[0], code[i + 1]);
          let verb = this.findReadArgument(parameterModes[1], code[i + 2]);
          let target = this.findWriteTarget(parameterModes[2], code[i + 3]);
          // console.log(`checking if ${noun} is less than ${verb}`);
          code[target] = noun < verb ? 1 : 0;
          // console.log(`placing ${code[target]} at ${target}`);
          i += 4;
          break;
        }
        case 8: {
          let noun = this.findReadArgument(parameterModes[0], code[i + 1]);
          let verb = this.findReadArgument(parameterModes[1], code[i + 2]);
          let target = this.findWriteTarget(parameterModes[2], code[i + 3]);
          // console.log(`checking if ${noun} is equal to ${verb}`);
          code[target] = noun === verb ? 1 : 0;
          // console.log(`placing ${code[target]} at ${target}`);
          i += 4;
          break;
        }
        case 9: {
          let noun = this.findReadArgument(parameterModes[0], code[i + 1]);
          this.relativeBase += noun;
          // console.log(`new relative base: ${this.relativeBase}`);
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
