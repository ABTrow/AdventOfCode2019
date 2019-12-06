const INPUTS = require('./input');

function intcodeReaderV2(code, ...inputs) {
  let i = 0;
  while (i < code.length) {
    let [instruction, parameters] = parseInstruction(code[i]);
    // console.log(
    //   ` at ${i}: action ${instruction} with parameters ${parameters}`
    // );
    switch (instruction) {
      case '99':
        console.log('program complete');
        return;
      case '01': {
        noun = parameters[0] ? code[i + 1] : code[code[i + 1]];
        verb = parameters[1] ? code[i + 2] : code[code[i + 2]];
        target = code[i + 3];
        // console.log(`adding ${noun}, ${verb} and placing it at ${target}`);
        code[target] = noun + verb;
        i += 4;
        break;
      }
      case '02': {
        noun = parameters[0] ? code[i + 1] : code[code[i + 1]];
        verb = parameters[1] ? code[i + 2] : code[code[i + 2]];
        target = code[i + 3];
        // console.log(`multiplying ${noun}, ${verb} and placing it at ${target}`);
        code[target] = noun * verb;
        i += 4;
        break;
      }
      case '03': {
        let target = code[i + 1];
        code[target] = inputs[0];
        i += 2;
        break;
      }
      case '04': {
        let output = parameters[0] ? code[i + 1] : code[code[i + 1]];
        console.log(`Line ${i}: ${output}`);
        i += 2;
        break;
      }
      case '05': {
        let isTrue = parameters[0] ? code[i + 1] : code[code[i + 1]];
        let target = parameters[1] ? code[i + 2] : code[code[i + 2]];
        if (isTrue) i = target;
        else i += 3;
        break;
      }
      case '06': {
        let isTrue = parameters[0] ? code[i + 1] : code[code[i + 1]];
        let target = parameters[1] ? code[i + 2] : code[code[i + 2]];
        if (!isTrue) i = target;
        else i += 3;
        break;
      }
      case '07': {
        let first = parameters[0] ? code[i + 1] : code[code[i + 1]];
        let second = parameters[1] ? code[i + 2] : code[code[i + 2]];
        let target = code[i + 3];
        code[target] = first < second ? 1 : 0;
        i += 4;
        break;
      }
      case '08': {
        let first = parameters[0] ? code[i + 1] : code[code[i + 1]];
        let second = parameters[1] ? code[i + 2] : code[code[i + 2]];
        let target = code[i + 3];
        code[target] = first === second ? 1 : 0;
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

function parseInstruction(rawInstruction) {
  // console.log(rawInstruction);
  let stringInstruction = String(rawInstruction);
  let instruction = '';
  let parameters = [];
  if (stringInstruction.length === 1) {
    instruction = '0' + stringInstruction;
  } else {
    instruction = stringInstruction.slice(stringInstruction.length - 2);
  }
  if (stringInstruction.length > 2) {
    parameters = stringInstruction
      .slice(0, stringInstruction.length - 2)
      .split('')
      .reverse()
      .map(char => Number(char));
  }
  return [instruction, parameters];
}

intcodeReaderV2([3, 0, 4, 0, 99], 15);

intcodeReaderV2(INPUTS, 1);
