class RepairRobot {
  constructor(INPUT) {
    this.x = 21;
    this.y = 21;
    this.map = Array(41)
      .fill([])
      .map(line => Array(41).fill(' '));
    this.map[this.y][this.x] = '8';
    this.processor = new IntcodeProcessor(INPUT);
    this.processor.setOutputDestination(this);
    this.lastCommand = null;
    this.nextX = null;
    this.nextY = null;
  }

  move(command) {
    this.lastCommand = command;
    switch (command) {
      case 1:
        this.nextX = this.x;
        this.nextY = this.y - 1;
        break;
      case 2:
        this.nextX = this.x;
        this.nextY = this.y + 1;
        break;
      case 3:
        this.nextX = this.x - 1;
        this.nextY = this.y;
        break;
      case 4:
        this.nextX = this.x + 1;
        this.nextY = this.y;
        break;
      default:
        console.log('Invalid Command!');
        return;
    }
    this.processor.receiveInput(command);
  }

  receiveInput(input) {
    switch (input) {
      case 0:
        this.map[this.nextY][this.nextX] = '#';
        break;
      case 1:
        this.map[this.nextY][this.nextX] = '8';
        this.map[this.y][this.x] = '.';
        this.x = this.nextX;
        this.y = this.nextY;
        break;
      case 2:
        this.map[this.nextY][this.nextX] = 'X';
        this.map[this.y][this.x] = '.';
        break;
    }
    console.log(this.map.map(line => line.join(' ')));
  }
}
