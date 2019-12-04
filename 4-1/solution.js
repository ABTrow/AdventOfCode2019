function comboCounter(low, high) {
  let comboCounter = 0;

  for (let i = low; i <= high; i++) {
    const numberDigits = String(i)
      .split('')
      .map(char => Number(char));
    if (
      numberDigits[0] > numberDigits[1] ||
      numberDigits[1] > numberDigits[2] ||
      numberDigits[2] > numberDigits[3] ||
      numberDigits[3] > numberDigits[4] ||
      numberDigits[4] > numberDigits[5]
    ) {
      continue;
    }
    if (
      numberDigits[0] === numberDigits[1] ||
      numberDigits[1] === numberDigits[2] ||
      numberDigits[2] === numberDigits[3] ||
      numberDigits[3] === numberDigits[4] ||
      numberDigits[4] === numberDigits[5]
    ) {
      comboCounter++;
    }
  }

  return comboCounter;
}

console.log(comboCounter(246540, 787419));
