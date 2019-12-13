const GameStation = require('./GameStation');
const INPUT = require('./input');

let canvas = Array(24)
  .fill([])
  .map(item => Array(36).fill(' '));
canvas[0][0] = 1;

let gameStation = new GameStation(INPUT, canvas, 2);

gameStation.start();
console.log(gameStation.score);
