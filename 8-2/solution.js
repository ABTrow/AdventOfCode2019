const INPUT = require('../8-1/input');

function imageCompressor(data) {
  let finalImage = Array(6).fill('x');
  finalImage = finalImage.map(row => Array(20).fill(undefined));

  for (let i = 0; i < 150; i++) {
    for (let j = 0; j < data.length; j += 150) {
      if (data[i + j] !== '2') {
        let row = Math.floor(i / 25);
        let column = i % 25;
        finalImage[row][column] = data[i + j] === '1' ? '@' : ' ';
        break;
      }
    }
  }

  return finalImage.map(row => row.join(''));
}

console.log(imageCompressor(INPUT));
