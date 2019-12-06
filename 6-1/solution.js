const INPUTS = require('./inputs');

function buildOrbitGraph(orbitMap) {
  let formattedMap = orbitMap.split('\n').map(line => {
    return line.split(')');
  });
  let orbitGraph = {};
  formattedMap.forEach(([center, satellite]) => {
    if (orbitGraph[center]) orbitGraph[center].satellites.push(satellite);
    else orbitGraph[center] = { satellites: [satellite], parent: null };
    if (!orbitGraph[satellite])
      orbitGraph[satellite] = { satellites: [], parent: center };
    else orbitGraph[satellite].parent = center;
  });

  return orbitGraph;
}

function orbitChecksum(orbitMap) {
  const orbitGraph = buildOrbitGraph(orbitMap);

  let orbitCounter = 0;

  function countOrbits(center, depth = 0) {
    orbitCounter += depth;
    for (let satellite of orbitGraph[center].satellites) {
      countOrbits(satellite, depth + 1);
    }
  }

  countOrbits('COM');

  return orbitCounter;
}

console.log(orbitChecksum(INPUTS));

module.exports = {
  buildOrbitGraph,
};
