const INPUT = require('../8-1/input');

function imageCompressor(data) {
  let finalImage = Array(6);
  finalImage = finalImage.map(row => Array(25).fill(null));
  console.log(finalImage);
}

imageCompressor(INPUT);
