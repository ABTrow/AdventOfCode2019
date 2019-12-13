let canvas = Array(24)
  .fill([])
  .map(item => Array(36).fill(' '));
canvas[0][0] = 1;

let gameStation = new GameStation(INPUT, canvas, 2);
// most recent joystick input

// document.addEventListener('keydown', event => {
//   if (event.key === 'ArrowRight') {
//     gameStation.joystickInput(1);
//   } else if (event.key === 'ArrowLeft') {
//     gameStation.joystickInput(-1);
//   }
//   paint();
// });

// Actual table cells
const tds = [];

const scoreboard = document.getElementById('scoreboard');

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
  scoreboard.innerHTML = `SCORE: ${gameStation.score}`;
  // let tds = document.querySelectorAll('td');
  tds.forEach(cell => {
    switch (
      gameStation.canvas[Number(cell.dataset.y)][Number(cell.dataset.x)]
    ) {
      case 1:
        cell.className = 'wall';
        break;
      case 2:
        cell.className = 'block';
        break;
      case 3:
        cell.className = 'paddle';
        break;
      case 4:
        cell.className = 'ball';
        break;
      default:
        cell.className = '';
        break;
    }
  });
  gameStation.paddlePos =
    tds.findIndex(td => td.className === 'paddle') % gameStation.screenWidth;

  gameStation.ballPos =
    tds.findIndex(td => td.className === 'ball') % gameStation.screenWidth;
};

const tick = () => {
  console.log(gameStation.paddlePos, gameStation.ballPos);

  if (gameStation.paddlePos < gameStation.ballPos) {
    gameStation.joystickInput(1);
  } else if (gameStation.paddlePos > gameStation.ballPos) {
    gameStation.joystickInput(-1);
  } else {
    gameStation.joystickInput(0);
  }
  paint();
};

gameStation.start();
setInterval(() => tick(), 50);
