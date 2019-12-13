let canvas = Array(24)
  .fill([])
  .map(item => Array(36).fill(' '));
canvas[0][0] = 1;

let gameStation = new GameStation(INPUT, canvas, 2);

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement('tbody');
// build a table row <tr>
for (let h = 0; h < gameStation.screenHeight; h++) {
  const tr = document.createElement('tr');
  // build a table column <td>
  for (let w = 0; w < gameStation.screenWidth; w++) {
    const td = document.createElement('td');
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.y = h;
    td.dataset.x = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById('canvas').append(table);

const paint = () => {
  let tds = document.querySelectorAll('td');
  tds.forEach(cell => {
    if (
      gameStation.canvas[Number(cell.dataset.y)][Number(cell.dataset.x)] === 1
    ) {
      cell.classList.add('alive');
    } else {
      cell.classList.remove('alive');
    }
  });
};

gameStation.start();
console.log(gameStation.score);
