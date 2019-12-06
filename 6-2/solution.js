const INPUTS = require('../6-1/inputs');
const { buildOrbitGraph } = require('../6-1/solution');

function transferCounter(orbitMap) {
  const orbitGraph = buildOrbitGraph(orbitMap);
  let start = orbitGraph['YOU'].parent;
  let end = orbitGraph['SAN'].parent;

  let totalTransfers = 0;
  let startPath = [];
  let endPath = [];

  let currentNode = orbitGraph[start];
  while (currentNode.parent) {
    totalTransfers++;
    startPath.unshift(currentNode.parent);
    currentNode = orbitGraph[currentNode.parent];
  }

  currentNode = orbitGraph[end];
  while (currentNode.parent) {
    totalTransfers++;
    endPath.unshift(currentNode.parent);
    currentNode = orbitGraph[currentNode.parent];
  }

  console.log(totalTransfers);

  for (let i = 1; i < startPath.length; i++) {
    if (startPath[i] === endPath[i]) totalTransfers -= 2;
    else return totalTransfers;
  }
}

console.log(transferCounter(INPUTS));
