const INPUT = `#########
#b.A.@.a#
#########`;

function exploreMaze(mazeMap) {
  let mapArray = mazeMap.split('\n').map(line => line.split(''));

  let startingKeys = {};
  let startingY = Math.floor(mazeMap.indexOf('@') / mapArray[0].length);
  let startingX = mazeMap.indexOf('@') % mapArray[0].length;

  function findAvailableKeys(keys, x, y, currentSteps) {}
}

exploreMaze(INPUT);
