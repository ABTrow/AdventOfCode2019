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
      if (xDifference || yDifference) {
        visibileAsteroids.add(Math.atan2(yDifference, xDifference));
      }
    });
    if (visibileAsteroids.size > mostVisbile) {
      bestAsteroid = homeAsteroid;
      mostVisbile = visibileAsteroids.size;
    }
  });
  console.log(bestAsteroid, mostVisbile);
  return [bestAsteroid, mostVisbile];
}

// visibilityFinder(INPUT);

module.exports = {
  asteroidPlotter,
  visibilityFinder,
};
