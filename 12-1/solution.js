class Jupiter {
  constructor(...moons) {
    this.moons = moons.map(moon => {
      return {
        position: { x: moon.x, y: moon.y, z: moon.z },
        velocity: { x: 0, y: 0, z: 0 },
      };
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
}

let jupiter = new Jupiter(
  { x: 17, y: -12, z: 13 },
  { x: 2, y: 1, z: 1 },
  { x: -1, y: -17, z: 7 },
  { x: 12, y: -14, z: 18 }
);

jupiter.simulateSteps(1000);
jupiter.logPlanetPositions();
jupiter.logTotalSystemEnergy();
