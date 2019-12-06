const INPUTS = require('./input');

function intcodeReaderV2(code, ...inputs) {
  let i = 0;
  while (i < code.length) {
    let [instruction, parameterModes] = parseInstruction(code[i]);

    let param1 = parameterModes[0] ? code[i + 1] : code[code[i + 1]];
    let param2 = parameterModes[1] ? code[i + 2] : code[code[i + 2]];
    let param3 = parameterModes[2] ? code[i + 3] : code[code[i + 3]];

    // console.log(
    //   ` at ${i}: action ${instruction} with parameter modes ${parameterModes}`
    // );
    switch (instruction) {
      case '99':
        console.log('program complete');
        return;
      case '01': {
        let target = code[i + 3];
        // console.log(`adding ${param1}, ${param2} and placing it at ${target}`);
        code[target] = param1 + param2;
        i += 4;
        break;
      }
      case '02': {
        let target = code[i + 3];
        // console.log(`multiplying ${param1}, ${param2} and placing it at ${target}`);
        code[target] = param1 * param2;
        i += 4;
        break;
      }
      case '03': {
        target = code[i + 1];
        // console.log(`placing ${inputs[0]} at ${target}`);
        code[target] = inputs[0];
        i += 2;
        break;
      }
      case '04': {
        let output = param1;
        console.log(`Line ${i}: ${output}`);
        i += 2;
        break;
      }
      case '05': {
        if (param1) i = param2;
        else i += 3;
        break;
      }
      case '06': {
        if (!param1) i = param2;
        else i += 3;
        break;
      }
      case '07': {
        let target = code[i + 3];
        code[target] = param1 < param2 ? 1 : 0;
        i += 4;
        break;
      }
      case '08': {
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

intcodeReaderV2(INPUTS, 5);
