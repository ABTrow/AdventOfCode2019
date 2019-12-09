const IntcodeProcessor = require('./intcodeProcessor');
const INPUT = require('../9-1/input');

let processor = new IntcodeProcessor(INPUT, 1);

console.log(processor.executeCode());
