const INPUT = require('./input');
const PainterRobot = require('./PainterRobot');

let robot = new PainterRobot(INPUT);

robot.paintCode();
console.log(robot.history.size);
