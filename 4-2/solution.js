function comboCounter2(low, high) {
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

    let foundDouble = false;
    let currentStreak = 1;

    for (let i = 0; i <= 4; i++) {
      if (numberDigits[i] === numberDigits[i + 1]) {
        currentStreak++;
      } else {
        if (currentStreak === 2) foundDouble = true;
        currentStreak = 1;
      }
    }

    if (foundDouble === true || currentStreak === 2) comboCounter++;
  }

  return comboCounter;
}

console.log(comboCounter2(246540, 787419));
