function intcodeReaderV2(code, ...inputs) {
  let i = 0;
  while (i < code.length) {
    let [instruction, parameters] = parseInstruction(code[i]);

    switch (instruction) {
      case '99':
        console.log('program complete');
        return;
      case '01':
        let [noun, verb, target] = code.slice(i + 1, i + 4);
        code[target] = code[noun] + code[verb];
        i += 4;
        break;
      case '02':
        [noun, verb, target] = code.slice(i + 1, i + 4);
        code[target] = code[noun] * code[verb];
        i += 4;
        break;
      case '03':
        // target = code[i + 1];
        code[code[i + 1]] = inputs[0];
        i += 2;
        break;
      case '04':
        // target = code[i + 1];
        console.log(code[code[i + 1]]);
        i += 2;
        break;
      default:
        throw new Error(
          `You goofed. Invalid intCode ${code[i]} at location ${i}`
        );
    }
  }
}

function parseInstruction(rawInstruction) {
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
      .split('');
  }
  return [instruction, parameters];
}

intcodeReaderV2([3, 0, 4, 0, 99], 15);
