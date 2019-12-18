const INPUT = require('./input');

// const INPUT = `80871224585914546619083218645595`;

// const INPUT = `12345678`;

let inputArray = INPUT.split('').map(el => Number(el));

function cleanupTransmission(input) {
  let output = [...input];
  let basePattern = [0, 1, 0, -1];

  output = output.map((outputEl, outputIndex) => {
    let newTotal = 0;
    let patternIndex = 0;
    let patternCount = 1;
    input.forEach(inputEl => {
      if (patternCount === outputIndex + 1) {
        patternCount = 0;
        patternIndex = (patternIndex + 1) % basePattern.length;
      }
      patternCount++;
      newTotal += inputEl * basePattern[patternIndex];
    });
    return Math.abs(newTotal) % 10;
  });
  return output;
}

function multiCleanup(inputArray, phases) {
  let currentPhase = 0;
  let currentTransmission = [...inputArray];
  while (currentPhase < phases) {
    currentTransmission = cleanupTransmission(currentTransmission);
    currentPhase++;
  }
  return currentTransmission;
}

console.log(multiCleanup(INPUT, 100).join(''));
