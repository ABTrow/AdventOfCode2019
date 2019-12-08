const { intcodeReaderV2 } = require('../5-1/solution');
const INPUT = require('./input');

function permutationMaker(array) {
  let outerPermutations = [];
  if (array.length === 1) {
    outerPermutations.push(array);
  } else {
    array.forEach((number, idx) => {
      let firstNum = number;
      let leftToPermute = array.slice(0, idx).concat(array.slice(idx + 1));
      let innerPermutations = permutationMaker(leftToPermute);
      innerPermutations.forEach(permutation => {
        outerPermutations.push([firstNum].concat(permutation));
      });
    });
  }
  return outerPermutations;
}

const possiblePhaseSettings = permutationMaker([0, 1, 2, 3, 4]);

function findMaxThrust(settingsArray, program) {
  console.log(`testing ${JSON.stringify(settingsArray)}`);
  let maxThrust = -Infinity;
  settingsArray.forEach(setting => {
    let currentInput = 0;
    setting.forEach(amplifierSetting => {
      let programCopy = [...program];
      console.log(amplifierSetting, currentInput);
      currentInput = intcodeReaderV2(
        programCopy,
        amplifierSetting,
        currentInput
      )[0];
    });
    maxThrust = Math.max(maxThrust, currentInput);
  });
  return maxThrust;
}

module.exports = { permutationMaker };
