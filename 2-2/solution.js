let intcodeReader = require('../2-1/solution');
let INPUTS = require('../2-1/inputs');

function findNounVerb(memory, target) {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      let workingMemory = [...memory];
      workingMemory[1] = i;
      workingMemory[2] = j;
      try {
        let result = intcodeReader(workingMemory);
        if (result[0] === target) return [i, j];
      } catch (error) {
        continue;
      }
    }
  }
}

console.log(findNounVerb(INPUTS, 19690720));
