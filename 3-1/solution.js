const { path1, path2 } = require('./inputs');

const path1Formatted = path1.split(',');
const path2Formatted = path2.split(',');

function intersectionFinder(path1, path2) {
  let path1Nodes = [[0, 0]];

  for (let step of path1) {
    let lastNode = path1Nodes[path1Nodes.length - 1];
    let direction = step[0];
    let amount = Number(step.slice(1));

    switch (direction) {
      case 'U':
        path1Nodes.push([lastNode[0], lastNode[1] + amount]);
        break;
      case 'D':
        path1Nodes.push([lastNode[0], lastNode[1] - amount]);
        break;
      case 'R':
        path1Nodes.push([lastNode[0] + amount, lastNode[1]]);
        break;
      case 'L':
        path1Nodes.push([lastNode[0] - amount, lastNode[1]]);
        break;
    }
  }

  let [path2x, path2y] = [0, 0];
  let intersections = [];

  for (let step of path2) {
    let direction = step[0];
    let amount = Number(step.slice(1));

    for (let i = 0; i < path1Nodes.length - 1; i++) {
      [path1x1, path1y1] = path1Nodes[i];
      [path1x2, path1y2] = path1Nodes[i + 1];

      switch (direction) {
        case 'U':
          if (
            path2x >= Math.min(path1x1, path1x2) &&
            path2x <= Math.max(path1x1, path1x2) &&
            path1y1 >= path2y &&
            path1y1 <= path2y + amount
          )
            intersections.push(Math.abs(path2x) + Math.abs(path1y1));
          break;
        case 'D':
          if (
            path2x >= Math.min(path1x1, path1x2) &&
            path2x <= Math.max(path1x1, path1x2) &&
            path1y1 <= path2y &&
            path1y1 >= path2y - amount
          )
            intersections.push(Math.abs(path2x) + Math.abs(path1y1));
          break;
        case 'R':
          if (
            path2y >= Math.min(path1y1, path1y2) &&
            path2y <= Math.max(path1y1, path1y2) &&
            path1x1 >= path2x &&
            path1x1 <= path2x + amount
          )
            intersections.push(Math.abs(path2y) + Math.abs(path1x1));
          break;
        case 'L':
          if (
            path2y >= Math.min(path1y1, path1y2) &&
            path2y <= Math.max(path1y1, path1y2) &&
            path1x1 <= path2x &&
            path1x1 >= path2x - amount
          )
            intersections.push(Math.abs(path2y) + Math.abs(path1x1));
          break;
      }
    }

    switch (direction) {
      case 'U':
        path2y += amount;
        break;
      case 'D':
        path2y -= amount;
        break;
      case 'R':
        path2x += amount;
        break;
      case 'L':
        path2x -= amount;
        break;
    }
  }

  let intersectionDistances = intersections.filter(distance => distance > 0);

  console.log(intersectionDistances);

  return Math.min(...intersectionDistances);
}

path1test = `R75,D30,R83,U83,L12,D49,R71,U7,L72`.split(',');
path2test = `U62,R66,U55,R34,D71,R55,D58,R83`.split(',');

console.log(intersectionFinder(path1test, path2test));

console.log(intersectionFinder(path1Formatted, path2Formatted));
