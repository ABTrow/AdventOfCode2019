class Jupiter {
  constructor(...moons) {
    this.moons = moons.map(moon => {
      return {
        position: { x: moon.x, y: moon.y, z: moon.z },
        velocity: { x: 0, y: 0, z: 0 },
      };
    });
    this.initialState = this.moons.map(moon => {
      return { position: { ...moon.position }, velocity: { ...moon.velocity } };
    });
  }

  simulateSteps(steps) {
    let currentStepCount = 0;
    while (currentStepCount < steps) {
      this.applyGravity();
      this.movePlanets();
      currentStepCount++;
    }
  }

  applyGravity() {
    for (let i = 0; i < this.moons.length; i++) {
      let firstMoon = this.moons[i];
      for (let j = i + 1; j < this.moons.length; j++) {
        let secondMoon = this.moons[j];

        // apply x velocity
        if (firstMoon.position.x > secondMoon.position.x) {
          firstMoon.velocity.x--;
          secondMoon.velocity.x++;
        }
        if (firstMoon.position.x < secondMoon.position.x) {
          firstMoon.velocity.x++;
          secondMoon.velocity.x--;
        }

        // apply y velocity
        if (firstMoon.position.y > secondMoon.position.y) {
          firstMoon.velocity.y--;
          secondMoon.velocity.y++;
        }
        if (firstMoon.position.y < secondMoon.position.y) {
          firstMoon.velocity.y++;
          secondMoon.velocity.y--;
        }

        // apply z velocity
        if (firstMoon.position.z > secondMoon.position.z) {
          firstMoon.velocity.z--;
          secondMoon.velocity.z++;
        }
        if (firstMoon.position.z < secondMoon.position.z) {
          firstMoon.velocity.z++;
          secondMoon.velocity.z--;
        }
      }
    }
  }

  movePlanets() {
    this.moons.forEach(moon => {
      moon.position.x += moon.velocity.x;
      moon.position.y += moon.velocity.y;
      moon.position.z += moon.velocity.z;
    });
  }

  logPlanetPositions() {
    this.moons.forEach(moon => {
      console.log(moon.position);
    });
  }

  logTotalSystemEnergy() {
    let totalEnergy = this.moons.reduce((energy, moon) => {
      let moonenergy =
        (Math.abs(moon.position.x) +
          Math.abs(moon.position.y) +
          Math.abs(moon.position.z)) *
        (Math.abs(moon.velocity.x) +
          Math.abs(moon.velocity.y) +
          Math.abs(moon.velocity.z));
      return energy + moonenergy;
    }, 0);

    console.log(totalEnergy);
  }

  moonsAreEqual(moon1, moon2) {
    return (
      moon1.position.x === moon2.position.x &&
      moon1.position.y === moon2.position.y &&
      moon1.position.z === moon2.position.z &&
      moon1.velocity.x === moon2.velocity.x &&
      moon1.velocity.y === moon2.velocity.y &&
      moon1.velocity.z === moon2.velocity.z
    );
  }

  runUntilRepeat() {
    let currentStepCount = 0;
    let xIsRepeat = false;
    let yIsRepeat = false;
    let zIsRepeat = false;
    do {
      this.applyGravity();
      this.movePlanets();
      currentStepCount++;
      if (!xIsRepeat) {
        if (
          (xIsRepeat = this.moons.every((moon, idx) => {
            return (
              moon.position.x === this.initialState[idx].position.x &&
              moon.velocity.x === this.initialState[idx].velocity.x
            );
          }))
        )
          xIsRepeat = currentStepCount;
      }
      if (!yIsRepeat) {
        if (
          this.moons.every((moon, idx) => {
            return (
              moon.position.y === this.initialState[idx].position.y &&
              moon.velocity.y === this.initialState[idx].velocity.y
            );
          })
        )
          yIsRepeat = currentStepCount;
      }
      if (!zIsRepeat) {
        if (
          (zIsRepeat = this.moons.every((moon, idx) => {
            return (
              moon.position.z === this.initialState[idx].position.z &&
              moon.velocity.z === this.initialState[idx].velocity.z
            );
          }))
        )
          zIsRepeat = currentStepCount;
      }
      if (currentStepCount % 1000000 === 0) console.log(currentStepCount);
    } while (!xIsRepeat || !yIsRepeat || !zIsRepeat);
    console.log(xIsRepeat, yIsRepeat, zIsRepeat);
    console.log(this.findLCM(xIsRepeat, yIsRepeat, zIsRepeat));
  }

  findLCM(...numbers) {
    function gcd(a, b) {
      return !b ? a : gcd(b, a % b);
    }

    let multiple = Math.min(...numbers);

    numbers.forEach(num => {
      let gcf = gcd(multiple, num);
      multiple = (num * multiple) / gcf;
    });

    return multiple;
  }
}

let jupiter = new Jupiter(
  { x: 17, y: -12, z: 13 },
  { x: 2, y: 1, z: 1 },
  { x: -1, y: -17, z: 7 },
  { x: 12, y: -14, z: 18 }
);

// let jupiter = new Jupiter(
//   { x: -1, y: 0, z: 2 },
//   { x: 2, y: -10, z: -7 },
//   { x: 4, y: -8, z: 8 },
//   { x: 3, y: 5, z: -1 }
// );

jupiter.runUntilRepeat();
