const INPUT = require('./input');

// const INPUT = `03036732577212944063491565474664`;

// const INPUT = `12345678`;

const offset = Number(INPUT.slice(0, 7));

const longInput = INPUT.repeat(10000);

console.longInput;

let inputArray = longInput.split('').map(el => Number(el));

function cleanupTransmission(input, offset) {
  let output = [...input];

  for (let o = output.length - 2; o >= offset; o--) {
    output[o] = (output[o + 1] + output[o]) % 10;
  }
  return output;
}

function multiCleanup(inputArray, offset, phases) {
  let currentPhase = 0;
  let currentTransmission = [...inputArray];
  while (currentPhase < phases) {
    currentTransmission = cleanupTransmission(currentTransmission, offset);
    currentPhase++;
    console.log(`phase ${currentPhase} completed`);
  }
  return currentTransmission;
}

console.log(
  multiCleanup(inputArray, offset, 100)
    .join('')
    .slice(offset, offset + 8)
);
