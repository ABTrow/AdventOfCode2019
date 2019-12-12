const INPUT = require('../10-1/input');
const { asteroidPlotter } = require('../10-1/solution');

function destroyAsteroids(asteroidMap, homeAsteroid) {
  const asteroidArray = asteroidPlotter(asteroidMap);

  let asteroidObject = {};

  asteroidArray.forEach(otherAsteroid => {
    let xDifference = otherAsteroid.x - homeAsteroid.x;
    let yDifference = homeAsteroid.y - otherAsteroid.y;
    let angle = Math.atan2(yDifference, xDifference);
    let distance = Math.sqrt(xDifference ** 2 + yDifference ** 2);
    if (asteroidObject[angle]) {
      asteroidObject[angle].push({ ...otherAsteroid, distance });
      asteroidObject[angle].sort((a, b) => a.distance - b.distance);
    } else {
      asteroidObject[angle] = [{ ...otherAsteroid, distance }];
    }
  });

  let asteroidAngles = Object.keys(asteroidObject).sort(
    (a, b) => Number(b) - Number(a)
  );
  let destroyedCount = 0;
  let asteroidAngleIdx = asteroidAngles.findIndex(
    angle => angle <= Math.PI / 2
  );

  while (destroyedCount < 200) {
    let currentAngle = asteroidAngles[asteroidAngleIdx];
    let justDestroyed = null;
    if (asteroidObject[currentAngle].length) {
      justDestroyed = asteroidObject[currentAngle].shift();
      destroyedCount++;
    }
    if (destroyedCount === 200) return justDestroyed;
    asteroidAngleIdx = (asteroidAngleIdx + 1) % asteroidAngles.length;
  }
}

console.log(destroyAsteroids(INPUT, { x: 11, y: 13 }));
