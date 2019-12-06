const INPUTS = require('../6-1/inputs');
const { buildOrbitGraph } = require('../6-1/solution');

function transferCounter(orbitMap) {
  const orbitGraph = buildOrbitGraph(orbitMap);
  let start = orbitGraph['YOU'].parent;
  let end = orbitGraph['SAN'].parent;

  let startPath = makePathFromCOM(orbitGraph, start);
  let endPath = makePathFromCOM(orbitGraph, end);

  let totalTransfers = startPath.length + endPath.length;

  for (let i = 1; i < startPath.length; i++) {
    // if the paths share a node, it is an unecessary transfer that can be elimated from each path
    if (startPath[i] === endPath[i]) totalTransfers -= 2;
    else return totalTransfers;
  }
}

function makePathFromCOM(orbitGraph, target) {
  let path = [];
  let currentNode = orbitGraph[target];
  while (currentNode.parent) {
    path.unshift(currentNode.parent);
    currentNode = orbitGraph[currentNode.parent];
  }
  return path;
}

console.log(transferCounter(INPUTS));
