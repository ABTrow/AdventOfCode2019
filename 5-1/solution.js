const INPUTS = require('./input');

function intcodeReaderV2(code, ...inputs) {
  function parseInstruction(rawInstruction) {
    // get instruction from tens and units place
    let instruction = rawInstruction % 100;

    //get parameters from hundreds and up
    let parameters = Math.floor(rawInstruction / 100);

    //if there are parameters split and reverse for easier use later
    if (parameters > 0) {
      parameters = String(parameters)
        .split('')
        .reverse()
        .map(char => Number(char));
    }
    return [instruction, parameters];
  }

  let outputs = [];
  let inputIndex = 0;
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
      case 99:
        // console.log('program complete');
        return outputs;
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
        target = code[i + 1];
        // console.log(`placing ${inputs[inputIndex]} at ${target}`);
        code[target] = inputs[inputIndex];
        inputIndex++;
        i += 2;
        break;
      }
      case 4: {
        let output = param1;
        // console.log(`Line ${i}: ${output}`);
        outputs.push(output);
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

  return outputs;
}

module.exports = { intcodeReaderV2 };
