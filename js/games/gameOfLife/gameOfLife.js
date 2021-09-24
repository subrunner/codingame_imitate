class GameOfLife extends Game {

  id = "gameOfLife";
  title = "Game of Life";
  cssFile = "./js/games/gameOfLife/gameOfLife.css";

  testcases = [
    {
      name: "Stable",
      dim: [3, 4],
      numberTurns: 1,
      alive: [0, 0, 1, 1, 0, 0, 0, 0, 0],
      dead: [0, 0, 0, 1, 0, 0, 0, 0, 0],
      input: `.OO.
O..O
.OO.`.split('\n'),
      output: `.OO.
O..O
.OO.
`.split('\n')
    }, {
      name: "1 turn",
      dim: [5, 5],
      numberTurns: 1,
      alive: [0, 0, 1, 1, 0, 0, 0, 0, 0],
      dead: [0, 0, 0, 1, 0, 0, 0, 0, 0],
      input: `.....
.OOO.
.OOO.
.OOO.
.....`.split('\n'),
      output: `
..O..
.O.O.
O...O
.O.O.
..O..
`.split('\n')
    }, {
      name: "Oscillator",
      dim: [3, 3],
      numberTurns: 3,
      alive: [0, 0, 1, 1, 0, 0, 0, 0, 0],
      dead: [0, 0, 0, 1, 0, 0, 0, 0, 0],
      input: `.O.
.O.
.O.`.split('\n'),
      output: `
...
OOO
...
`.split('\n')
    }, {
      name: "Spaceship 4 turns",
      dim: [4, 4],
      numberTurns: 4,
      alive: [0, 0, 1, 1, 0, 0, 0, 0, 0],
      dead: [0, 0, 0, 1, 0, 0, 0, 0, 0],
      input: `..O.
O.O.
.OO.
....`.split('\n'),
      output: `
....
...O
.O.O
..OO
`.split('\n')
    }, {
      name: "New Rules Simple",
      numberTurns: 1,
      alive: [0, 0, 0, 1, 0, 0, 0, 0, 0],
      dead: [0, 0, 1, 1, 0, 0, 0, 0, 0],
      input: `....
.OOO
.O..
....`.split('\n'),
      output: `
.OOO
O.O.
O..O
....
`.split('\n')
    }, {
      name: "A bit more complex",
      numberTurns: 1,
      alive: [0, 1, 0, 1, 0, 0, 0, 0, 0],
      dead: [0, 0, 1, 0, 0, 0, 0, 0, 0],
      input: `.....
.OO..
..OO.
...O.
.....`.split('\n'),
      output: `
.OO..
..O..
...OO
....O
.....
`.split('\n')


    }, {
      name: "Weird rules",
      dim: [6, 6],
      numberTurns: 1,
      alive: [1, 0, 0, 0, 0, 0, 0, 0, 1],
      dead: [1, 0, 0, 0, 0, 0, 0, 0, 1],
      input: `...OOO
...O.O
...OOO
.OO..O
..OO..
......`.split('\n'),
      output: `
OO....
OO..O.
......
......
......
O....O
`.split('\n')
    }, {
      name: "Complex Rules, more turns",
      dim: [10, 10],
      numberTurns: 8,
      alive: [0, 0, 0, 1, 1, 0, 0, 0, 0],
      dead: [0, 0, 1, 0, 0, 0, 0, 0, 0],
      input: `..........
.OO.OOO...
..OO..OOO.
..O..OO...
....O..OOO
...O..OO..
..........
OOOO...OO.
OOOOOOOOOO
....OOO.OO`.split('\n'),
      output: `
.......O..
.OO.O..O..
O.O....OO.
O....OO.O.
O....O...O
OO...OOOO.
.........O
.O..O..OO.
.OOO......
.........O
`.split('\n')
    }, {
      name: "Insane, random rules and grid",
      dim: [20, 20],
      numberTurns: 15,
      alive: [1, 0, 1, 1, 1, 0, 0, 1, 0],
      dead: [0, 1, 1, 0, 1, 1, 0, 0, 0],
      input: `OOO.OO.O.O..OOO..OOO
.O.O..OOOOOO.OO.O.O.
OO.OOO.O..OOO.O..O..
..OOO....OO..OOO....
OOO..O..OO.O...OOOO.
OOOOO...OO.OO.OOOOOO
OO.O.........OO.O.O.
O..OOOO.O.OO.O.OOO..
O..O...O.OO...OOOOOO
...OOOOOO.OO...O.OO.
...O...OOOOO...O.O..
...OO...OO...OO..OO.
....O..OOO...OOOO.O.
..OO...OO.OOOO.....O
OOOO.OOOO.O.OO......
O..OO.O..OOO...OOO..
O.O.O..OOO..OO.O.O..
OOOOO.O..O..OO..O...
O...OOOO.O..O...O...
.O...O....OOOOO...O.`.split('\n'),
      output: `
OOOOOOOOOOOOOOOOO..O
OO..OOO.....OOOO..OO
O.OO.O.OOOOOOOO.OO.O
OO..OOOO.OO..OO.OO..
O...OO.OOO.OOOOO...O
O...OO.O.O.OOOOO....
OOOOOO....OOO.OOO.O.
O.OOOO....OO.OOOOO.O
O.O..O......OO..OOOO
O.OOOOOO.OO..O.OO.OO
O.O..OOOOO..OOOO.O.O
OOO..O..OOOOOOOOOOOO
OO.O..OOOOOO.O.OOO..
OOOO...OOO.OOOOOOOOO
OOOOO...OOOOO.OOOOO.
OOO.O.O.OO.O.OO....O
OO.O.O...OOOOO.OOO.O
OOO.......OOOO.OO.O.
O..O.......O.OOOOOOO
OOOOOOOOOOOOOOOOOOOO
`.split('\n')
    }
  ]

  readline = () => {
    let tc = CODE.C.testcase;
    if (this.currentRead < 0) {
      // initial line
      this.currentRead++;
      return tc.dim.join(' ') + " " + tc.numberTurns;

    }
    return CODE.C.testcase.input[this.currentRead++];
  }

  prepareTestcase = () => {
    this.currentLog = -3;
  }

  consolelog = (args) => {
    this.checkInputAgainstTarget(args[0], CODE.C.testcase.output);
  }

  end = () => {
    this.endCheckInputAgainstTarget(CODE.C.testcase.output, 'Great game simulation!');
  }

  initGameArea = (elPlayingfield) => {
    elPlayingfield.innerHTML = "<table id='life'></table>";
  }

  updateGameArea = (isNewTestcase) => {
    let tc = CODE.C.testcase,
      numberTurns = tc.numberTurns,
      field = tc.input.map(inp => inp.split('').map(c => c === '.' ? 0 : 1));

    if (isNewTestcase) {
      let elTable = document.getElementById("life"),
        tableHtml = [];

      // prepare the table
      field.forEach((row, r) => {
        tableHtml.push("<tr>");
        row.forEach((isAlive, c) => {

          tableHtml.push("<td id='" + r + "_" + c + "' class='" + (field[r][c] ? "live" : "dead") + "'></td>");
        })
        tableHtml.push("</tr>");
      });
      elTable.innerHTML = tableHtml.join('');
      this.isSimulationStarted = false;
      return;
    }

    this.isSimulationStarted = true;

    // not a new playing field: start our simulation!
    this.simulateRound(field, numberTurns, true);
  }

  /**
   * 
   * @param {*} field will not be edited in place - gets replaced with new field!
   * @param {*} numberTurns 
   * @param {*} isAsync 
   * @returns 
   */
  simulateRound = (field, numberTurns, isAsync) => {
    console._log("simulate round " + numberTurns);
    let newField = [];

    // abort if we have no turns left!
    if (!numberTurns) {
      return;
    }
    numberTurns--;

    // simulate our round
    field.forEach((row, r) => {
      newField.push([])
      row.forEach((isAlive, c) => {
        let aliveNeighbors = this.getNumberAliveNeighbors(field, r, c),
          newAlive = false;

        // stay alive
        if (isAlive && CODE.C.testcase.alive[aliveNeighbors])
          newAlive = true;

        // dead cell come back to life
        else if (!isAlive && CODE.C.testcase.dead[aliveNeighbors])
          newAlive = true;

        // save!
        newField[r].push(newAlive);
        document.getElementById(r + "_" + c).className = (newAlive ? "live" : "dead");
      })
    });

    // set the field
    field = newField;

    // decide what to do with the next round
    if (isAsync) {
      setTimeout(() => {
        this.simulateRound(field, numberTurns, isAsync);
      }, 500);
    } else {
      this.simulateRound(field, numberTurns, isAsync);
    }
  }

  getNumberAliveNeighbors = (field, row, column) => {
    let ret = 0,
      isColSmallerWidth = column < field[0].length - 1,
      isRowSmallerHeight = row < field.length - 1;

    if (row > 0) {
      // N
      if (field[row - 1][column])
        ret++;

      // NW
      if (column > 0 && field[row - 1][column - 1])
        ret++;

      // NE
      if (isColSmallerWidth && field[row - 1][column + 1])
        ret++;
    }

    if (isRowSmallerHeight) {
      // S
      if (field[row + 1][column])
        ret++

      // SW
      if (column > 0 && field[row + 1][column - 1])
        ret++;

      // SE
      if (isColSmallerWidth && field[row + 1][column + 1])
        ret++;
    }

    // W
    if (column > 0 && field[row][column - 1])
      ret++;

    // E
    if (isColSmallerWidth && field[row][column + 1])
      ret++;

    //console._log("Cell " + row + "," + column + " has " + ret + " live neighbors");
    return ret;
  }

}

CODE.GAMES.add(new GameOfLife());