const INPUT = require('./input');
const ASCIIBot = require('./ASCIIBot');

let robot = new ASCIIBot(INPUT);

robot.run();

let initialFeed = robot.cameraFeed.split('\n').map(line => line.split(''));

let calibrationParameter = 0;

for (let row = 1; row < initialFeed.length - 1; row++) {
  for (let column = 1; column < initialFeed[0].length - 1; column++) {
    if (
      initialFeed[row][column] === '#' &&
      initialFeed[row - 1][column] === '#' &&
      initialFeed[row + 1][column] === '#' &&
      initialFeed[row][column - 1] === '#' &&
      initialFeed[row][column + 1] === '#'
    )
      calibrationParameter += row * column;
  }
}

console.log(calibrationParameter);
