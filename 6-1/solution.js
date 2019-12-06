const INPUTS = require('./inputs');

function buildOrbitGraph(orbitMap) {
  let formattedMap = orbitMap.split('\n').map(line => {
    return line.split(')');
  });
  let orbitGraph = {};
  formattedMap.forEach(([center, satellite]) => {
    if (orbitGraph[center]) orbitGraph[center].push(satellite);
    else orbitGraph[center] = [satellite];
    if (!orbitGraph[satellite]) orbitGraph[satellite] = [];
  });

  return orbitGraph;
}

function orbitChecksum(orbitMap) {
  const orbitGraph = buildOrbitGraph(orbitMap);

  let orbitCounter = 0;

  function countOrbits(center, depth = 0) {
    orbitCounter += depth;
    for (let satellite of orbitGraph[center]) {
      countOrbits(satellite, depth + 1);
    }
  }

  countOrbits('COM');

  return orbitCounter;
}

console.log(orbitChecksum(INPUTS));
