const INPUT = require('./input');

function asteroidPlotter(asteroidMap) {
  const mapArray = asteroidMap.split('\n').map(row => row.split(''));
  const asteroidArray = [];
  mapArray.forEach((row, y) => {
    row.forEach((column, x) => {
      if (column === '#') asteroidArray.push({ x, y });
    });
  });
  return asteroidArray;
}

function visibilityFinder(asteroidMap) {
  let bestAsteroid = null;
  let mostVisbile = -Infinity;
  let asteroidArray = asteroidPlotter(asteroidMap);

  asteroidArray.forEach(homeAsteroid => {
    let visibileAsteroids = new Set();
    asteroidArray.forEach(otherAsteroid => {
      let xDifference = homeAsteroid.x - otherAsteroid.x;
      let yDifference = homeAsteroid.y - otherAsteroid.y;
      visibileAsteroids.add(Math.atan2(xDifference, yDifference));
    });
    if (visibileAsteroids.size > mostVisbile) {
      bestAsteroid = homeAsteroid;
      mostVisbile = visibileAsteroids.size;
    }
    console.log(visibileAsteroids);
  });
  // console.log(mostVisbile);
  // return bestAsteroid;
}

console.log(visibilityFinder(INPUT));
