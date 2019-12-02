let fs = require('fs');
let INPUTS = require('./inputs');

function intcodeReader(code) {
  for (let i = 0; i < code.length; i += 4) {
    if (code[i] === 99) return code;
    else if (code[i] === 1) {
      let [noun, verb, target] = code.slice(i + 1, i + 4);
      code[target] = code[noun] + code[verb];
    } else if (code[i] === 2) {
      let [noun, verb, target] = code.slice(i + 1, i + 4);
      code[target] = code[noun] * code[verb];
    } else {
      throw new Error(`You goofed. Invalid intCode ${code[i]}`);
    }
  }
}

module.exports = intcodeReader;
