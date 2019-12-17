const INPUT = require('./input');

const mazeArray = INPUT.map(line => line.split(' '));

function airFiller(maze) {
  let width = maze[0].length;
  let array1D = maze.reduce((accum, line) => accum.concat(line), []);

  let airEdges = [array1D.indexOf('X')];

  let clicks = 0;

  while (airEdges.length) {
    console.log(airEdges);
    let fillThisClick = [...airEdges];
    airEdges = [];
    fillThisClick.forEach(edge => diffuseAir(edge));
    clicks++;
  }

  function diffuseAir(index) {
    let toExplore = [index + 1, index - 1, index + width, index - width];
    toExplore.forEach(nextIndex => {
      if (array1D[nextIndex] === '.') {
        array1D[nextIndex] = 'X';
        airEdges.push(nextIndex);
      }
    });
    array1D[index] = 'O';
  }

  console.log(clicks);
}

airFiller(mazeArray);
