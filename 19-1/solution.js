const INPUT = require('./input');
const DroneControl = require('./DroneControl');

let controller = new DroneControl(INPUT);

// controller.findTractorBeamArea();
// console.log(controller.closeSpace.map(row => row.join('')));

controller.findTractorBeamSquare(100);

// controller.checkSpace(263216, 304029);
// console.log(controller.tractionAtLastChecked);
