const Amplifier = require('./amplifier');
const INPUT = require('../7-1/input');
const { permutationMaker } = require('../7-1/solution');

const possiblePhaseSettings = permutationMaker([5, 6, 7, 8, 9]);

function findAmplifiedMax(settingsArray, program) {
  let maxThrust = -Infinity;

  settingsArray.forEach(setting => {
    let amplifierArray = [];
    setting.forEach(amplifierSetting => {
      amplifierArray.push(new Amplifier([...program], amplifierSetting));
    });
    amplifierArray.forEach((amplifier, idx) => {
      let nextAmplifierIndex = (idx + 1) % amplifierArray.length;
      amplifier.setOutputDestination(amplifierArray[nextAmplifierIndex]);
    });

    amplifierArray[0].receiveInput(0);

    maxThrust = Math.max(maxThrust, amplifierArray[4].output);
  });

  return maxThrust;
}

console.log(findAmplifiedMax(possiblePhaseSettings, INPUT));

// let amplifier = new Amplifier(INPUT, 0, 0);
// console.log(amplifier.executeCode());
