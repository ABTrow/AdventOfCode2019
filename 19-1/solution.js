const INPUT = require('./input');
const DroneControl = require('./DroneControl');

let controller = new DroneControl(INPUT);

controller.findTractorBeamArea();
