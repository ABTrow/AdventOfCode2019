const INPUT = require('./input');

function imageChecker(data) {
  let bestLayer = { '0': Infinity, '1': 0, '2': 0 };

  for (let i = 0; i < data.length; i += 150) {
    let currentLayer = { '0': 0, '1': 0, '2': 0 };
    for (let j = 0; j < 150; j++) {
      let currentChar = data[i + j];
      currentLayer[currentChar] += 1;
    }
    if (currentLayer['0'] < bestLayer['0']) {
      bestLayer = { ...currentLayer };
    }
  }

  return bestLayer['1'] * bestLayer['2'];
}

console.log(imageChecker(INPUT));
