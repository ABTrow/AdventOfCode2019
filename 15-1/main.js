let robot = new RepairRobot(INPUT);

document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      robot.move(1);
      break;
    case 'ArrowDown':
      robot.move(2);
      break;
    case 'ArrowLeft':
      robot.move(3);
      break;
    case 'ArrowRight':
      robot.move(4);
      break;
  }
});
