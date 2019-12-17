const INPUT = require('./input');

// const INPUT = `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
// 17 NVRVD, 3 JNWZP => 8 VPVL
// 53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
// 22 VJHF, 37 MNCFX => 5 FWMGM
// 139 ORE => 4 NVRVD
// 144 ORE => 7 JNWZP
// 5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
// 5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
// 145 ORE => 6 MNCFX
// 1 NVRVD => 8 CXFTF
// 1 VJHF, 6 MNCFX => 4 RFSQX
// 176 ORE => 6 VJHF`;

const inputArray = INPUT.split('\n');

let conversionTable = {};

inputArray.forEach(conversion => {
  let [ingredients, result] = conversion.split(' => ');
  ingredients = ingredients
    .split(', ')
    .map(ingredient => ingredient.split(' '));
  [resultQuantity, resultName] = result.split(' ');
  let ingredientObject = { makes: Number(resultQuantity) };
  ingredients.forEach(([quantity, name]) => {
    ingredientObject[name] = Number(quantity);
  });
  conversionTable[resultName] = ingredientObject;
});

function minimumOre(conversionTable) {
  let extraStore = {};
  let totalOre = 0;

  function calculateIngredients(product, need) {
    let formula = conversionTable[product];

    console.log(`need ${need} ${product}`);
    if (extraStore[product]) {
      console.log(`have ${extraStore[product]} ${product} in storage`);
      reducedNeed = need - extraStore[product];
      console.log(`now only need ${reducedNeed} ${product}`);
      extraStore[product] = Math.max(0, extraStore[product] - need);
      need = reducedNeed;
      console.log(`${extraStore[product]} ${product} left in store`);
    }
    let batches = Math.ceil(need / formula.makes);
    console.log(`making ${batches} batches of ${product}`);

    let reactants = Object.keys(formula).filter(key => key !== 'makes');

    for (let key of reactants) {
      if (key === 'ORE') {
        totalOre += batches * formula.ORE;
        console.log(
          `added ${batches *
            formula.ORE} ore to make ${batches} batches of ${product}!`
        );
      } else {
        calculateIngredients(key, formula[key] * batches);
      }
    }

    extraStore[product] = batches * formula.makes - need;
    console.log(`put ${batches * formula.makes - need} back into storage`);
  }

  calculateIngredients('FUEL', 1);
  return totalOre;
}

console.log(minimumOre(conversionTable));
