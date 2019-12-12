const INPUT = require('./input');
const PainterRobot = require('./PainterRobot');

let canvas = Array(8)
  .fill([])
  .map(item => Array(50).fill(0));
canvas[0][0] = 1;

let robot = new PainterRobot(INPUT, canvas, 0, 0);

robot.paintCode();
let formattedCanvas = robot.canvas.map(line =>
  line
    .map(square => {
      return square ? square : ' ';
    })
    .join('')
);
console.log(formattedCanvas);
