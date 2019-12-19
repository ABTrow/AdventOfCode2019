const INPUT = require('./input');
const ASCIIBot = require('../17-1/ASCIIBot');

let movementRoutine = [
  `A,B,B,A,B,C,A,C,B,C`,
  `L,4,L,6,L,8,L,12`,
  `L,8,R,12,L,12`,
  `R,12,L,6,L,6,L,8`,
  `y`,
];

let robot = new ASCIIBot(INPUT);

robot.run();
console.log(robot.cameraFeed);
for (let routine of movementRoutine) {
  robot.sendRoutine(routine);
  console.log(robot.cameraFeed);
}
robot.run();
console.log(robot.cameraFeed);
console.log(robot.processor.output);
