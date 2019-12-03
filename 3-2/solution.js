const { path1, path2 } = require('../3-1/inputs');

const path1Formatted = path1.split(',');
const path2Formatted = path2.split(',');

function intersectionFinder2(path1, path2) {
  let path1Nodes = [[0, 0, 0]];

  for (let step of path1) {
    let lastNode = path1Nodes[path1Nodes.length - 1];
    let direction = step[0];
    let amount = Number(step.slice(1));

    switch (direction) {
      case 'U':
        path1Nodes.push([
          lastNode[0],
          lastNode[1] + amount,
          lastNode[2] + amount,
        ]);
        break;
      case 'D':
        path1Nodes.push([
          lastNode[0],
          lastNode[1] - amount,
          lastNode[2] + amount,
        ]);
        break;
      case 'R':
        path1Nodes.push([
          lastNode[0] + amount,
          lastNode[1],
          lastNode[2] + amount,
        ]);
        break;
      case 'L':
        path1Nodes.push([
          lastNode[0] - amount,
          lastNode[1],
          lastNode[2] + amount,
        ]);
        break;
    }
  }

  let [path2x, path2y, path2amount] = [0, 0, 0];
  let intersections = [];

  for (let step of path2) {
    let direction = step[0];
    let amount = Number(step.slice(1));

    for (let i = 0; i < path1Nodes.length - 1; i++) {
      let [path1x1, path1y1, path1amount1] = path1Nodes[i];
      let [path1x2, path1y2, path2amount2] = path1Nodes[i + 1];

      switch (direction) {
        case 'U':
          if (
            path2x >= Math.min(path1x1, path1x2) &&
            path2x <= Math.max(path1x1, path1x2) &&
            path1y1 >= path2y &&
            path1y1 <= path2y + amount
          )
            intersections.push(
              path1amount1 +
                Math.abs(path1x1 - path2x) +
                path2amount +
                Math.abs(path2y - path1y1)
            );
          break;
        case 'D':
          if (
            path2x >= Math.min(path1x1, path1x2) &&
            path2x <= Math.max(path1x1, path1x2) &&
            path1y1 <= path2y &&
            path1y1 >= path2y - amount
          )
            intersections.push(
              path1amount1 +
                Math.abs(path1x1 - path2x) +
                path2amount +
                Math.abs(path2y - path1y1)
            );
          break;
        case 'R':
          if (
            path2y >= Math.min(path1y1, path1y2) &&
            path2y <= Math.max(path1y1, path1y2) &&
            path1x1 >= path2x &&
            path1x1 <= path2x + amount
          )
            intersections.push(
              path1amount1 +
                Math.abs(path1y1 - path2y) +
                path2amount +
                Math.abs(path2x - path1x1)
            );
          break;
        case 'L':
          if (
            path2y >= Math.min(path1y1, path1y2) &&
            path2y <= Math.max(path1y1, path1y2) &&
            path1x1 <= path2x &&
            path1x1 >= path2x - amount
          )
            intersections.push(
              path1amount1 +
                Math.abs(path1y1 - path2y) +
                path2amount +
                Math.abs(path2x - path1x1)
            );
          break;
      }
    }

    switch (direction) {
      case 'U':
        path2y += amount;
        path2amount += amount;
        break;
      case 'D':
        path2y -= amount;
        path2amount += amount;
        break;
      case 'R':
        path2x += amount;
        path2amount += amount;
        break;
      case 'L':
        path2x -= amount;
        path2amount += amount;
        break;
    }
  }

  let intersectionDistances = intersections.filter(distance => distance > 0);

  console.log(intersectionDistances);

  return Math.min(...intersectionDistances);
}

path1test = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51`.split(',');
path2test = `U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`.split(',');

console.log(intersectionFinder2(path1test, path2test));

console.log(intersectionFinder2(path1Formatted, path2Formatted));
