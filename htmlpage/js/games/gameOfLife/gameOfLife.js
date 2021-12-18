class GameOfLife extends Game {

  id = "gameOfLife";
  title = "Game of Life";
  cssFile = "./js/games/gameOfLife/gameOfLife.css";

  /**
   * The rules for a Conway game of life
   */
  static CONWAY_RULES = {
    alive: [0, 0, 1, 1, 0, 0, 0, 0, 0],
    dead: [0, 0, 0, 1, 0, 0, 0, 0, 0]
  }

  testcases = [
    new GameOfLifeTestcase(
      "Bar Oscillator Step 1",
      `.O.
.O.
.O.`.split('\n'),
      GameOfLife.CONWAY_RULES),
    new GameOfLifeTestcase(
      "Bar Oscillator Step 2",
      `...
OOO
...`.split('\n'),
      GameOfLife.CONWAY_RULES),
    new GameOfLifeTestcase(
      "Stable",
      `.OO.
O..O
.OO.`.split('\n'),
      GameOfLife.CONWAY_RULES,
      1,
      `.OO.
O..O
.OO.
`.split('\n')
    ),
    new GameOfLifeTestcase(
      "5x5 grid",
      `.....
.OOO.
.OOO.
.OOO.
.....`.split('\n'),
      GameOfLife.CONWAY_RULES,
      1,
      `
..O..
.O.O.
O...O
.O.O.
..O..
`.split('\n')
    ),
    new GameOfLifeTestcase(
      "Spaceship",
      `..O.
O.O.
.OO.
....`.split('\n'),
      GameOfLife.CONWAY_RULES
    ),
    new GameOfLifeTestcase(
      "Random Small",
      `...OOO
...O.O
...OOO
.OO..O
..OO..
......`.split('\n'),
      GameOfLife.CONWAY_RULES
    ),
    new GameOfLifeTestcase(
      "Random Medium",
      `..........
.OO.OOO...
..OO..OOO.
..O..OO...
....O..OOO
...O..OO..
..........
OOOO...OO.
OOOOOOOOOO
....OOO.OO`.split('\n'),
      GameOfLife.CONWAY_RULES
    ),
    new GameOfLifeTestcase(
      "Random Large",
      `OOO.OO.O.O..OOO..OOO
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
      GameOfLife.CONWAY_RULES
    )
  ]

  // we fill our release-tests with randomized stuff!
  releasetests = [
    new GameOfLifeTestcase(
      "Stable",
      `....
.OO.
.OO.
....`.split('\n'),
      GameOfLife.CONWAY_RULES
    ),
    new GameOfLifeTestcase(
      "Block",
      `000
000
000`.split('\n'),
      GameOfLife.CONWAY_RULES
    ),
    new GameOfLifeTestcase(
      "Ship II",
      `..O.
O.O.
.OO.
....`.split('\n'),
      GameOfLife.CONWAY_RULES
    )
  ];

  constructor() {
    // call super constructor before this becomes possible
    super();

    // Adds some truely random release tests
    for (let i = 0; i < 3; i++) {
      let input = [],
        lifeDensity = Math.random(),
        numberRows = (i + 1) * 5,
        numberCols = (i + 1) * 7;
      for (let r = 0; r < numberRows; r++) {
        let row = "";
        for (let c = 0; c < numberCols; c++) {
          row += Math.random() < lifeDensity ? 'O' : '.';
        }
        input.push(row);
      }

      this.releasetests.push(new GameOfLifeTestcase(
        "Random " + numberRows + "x" + numberCols + " - " + (lifeDensity * 100).toFixed(2) + "% popuplation density",
        input,
        this.getRandomRules()
      ))
    }
  }

  /**
   * Returns random rules for initiating the random release tests.
   * Classes extendint this one may want to change the algorithm, because
   * this one only returns the Conway rules...
   * @returns rules.alive: cells staying alive, rules.dead: cells resurrecting
   */
  getRandomRules() {
    return GameOfLife.CONWAY_RULES;
  }

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
      field = GameOfLifeSimulator.getFieldFromInput(tc);

    if (isNewTestcase) {
      let elTable = document.getElementById("life"),
        tableHtml = [];

      // prepare the table
      field.forEach((row, r) => {
        tableHtml.push("<tr>");
        row.forEach((cell, c) => {

          tableHtml.push("<td id='" + r + "_" + c + "' class='" + (field[r][c] ? "live" : "dead") + "'></td>");
        })
        tableHtml.push("</tr>");
      });
      elTable.innerHTML = tableHtml.join('');

      // abort previous simulations
      if (this.objSimulationAbort) {
        this.objSimulationAbort.abort = true;
        this.objSimulationAbort = {
          abort: false
        }
      }
      return;
    } // END if isNesTestcase


    // not a new playing field: start our simulation!
    this.objSimulationAbort = GameOfLifeSimulator.simulateRounds(field, tc.rules, numberTurns);
  }


}

class GameOfLifeSimulator {

  /**
  * 
  * @param {GameOfLifeTestcase} testcase input must be set
  * @returns {number[][]} playing field with row-column format. 0=dead cell, 1=alive cell
  */
  static getFieldFromInput(testcase) {
    return testcase.input.map(inp => inp.split('').map(c => c === '.' ? 0 : 1));
  }

  /**
   * Does a simulation of numberTurns rounds. Waits 500ms after every round to give display time to render. 
   * Can be aborted by setting objAbort.abort=true!
   * @param {number[][]} field will not be edited in place, configuration from where the simulation starts
   * @param {object} rules rules.alive: configuration for cells staying alive; rules.dead: configuration for cells resurrecting
   * @param {number} numberTurns number of rounds to be simulated
   * @param {object} objAbort optional. Only useful during showSimulation! If set, the objAbort.abort = true/false says whether the simulation should abort
   * @returns {object} if objAbort is set, objAbort - otherwise a new object that lets you abort the simulation by setting ret.abort=true
   */
  static simulateRounds(field, rules, numberTurns, objAbort = null) {
    // make sure our abort object exists
    if (!objAbort) {
      objAbort = { abort: false };
    }

    // do we get told to abort?
    if (objAbort.abort) {
      console._log("Simulator.simulateRounds aborting!");
      return;
    }

    // abort if we have no turns left!
    if (!numberTurns) {
      return;
    }
    numberTurns--;

    // do our round
    let newField = GameOfLifeSimulator.calculateRound(field, rules, true);

    // simulate the next round after waiting
    setTimeout(() => {
      GameOfLifeSimulator.simulateRounds(newField, rules, numberTurns, objAbort);
    }, 500);

    return objAbort;
  }

  /**
   * Calculates what the field will look like after numberTurn rounds
   * @param {GameOfLifeTestcase} testcase the test case with rules and numberTurns
   * @returns {number[][]} the end result 
   */
  static calculateOutput(testcase) {
    let field = GameOfLifeSimulator.getFieldFromInput(testcase);

    // do as many turns as we need
    for (let i = 0; i < testcase.numberTurns; i++) {
      // feed the output of the last round into the calculation for the new round
      field = GameOfLifeSimulator.calculateRound(field, testcase.rules, false);
    }
    return field;
  }


  /**
   * Calculates a single round
   * @param {number[][]} field will not be edited in place - gets replaced with new field!
   * @param {object} rules rules.alive: configuration for cells staying alive; rules.dead: configuration for cells resurrecting
   * @param {boolean} showSimulation true: edits the display of the current GameOfLife instance; otherwise, does nothing
   * @returns {number[][]} the new playing field after the simulated round
   */
  static calculateRound(field, rules, showSimulation) {
    let newField = [];



    // simulate our round
    field.forEach((row, r) => {
      newField.push([])
      row.forEach((isAlive, c) => {
        let aliveNeighbors = GameOfLifeSimulator.getNumberAliveNeighbors(field, r, c),
          newAlive = false;

        // stay alive
        if (isAlive && rules.alive[aliveNeighbors])
          newAlive = true;

        // dead cell come back to life
        else if (!isAlive && rules.dead[aliveNeighbors])
          newAlive = true;

        // save!
        newField[r].push(newAlive);
        if (showSimulation)
          document.getElementById(r + "_" + c).className = (newAlive ? "live" : "dead");
      })
    });

    // set the field
    return newField;


  }

  static getNumberAliveNeighbors = (field, row, column) => {
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

} // END class GameOfLifeSimulator

class GameOfLifeTestcase {

  /**
   * 
   * @param {string} name name of the testcase
   * @param {string[]} input the input the user gets - one line per row, each line the same column length. Alive: 'O', dead: '.'
   * @param {object} rules Default: Conway Rules. rules.alive: boolean[9] - true if the cell stays alive with this many neighbors. rules.dead: boolean[9] - 
   * true if the cell resurrects with this many neighbors
   * @param {number} numberTurns Default: 1. After how many turns the output is expected
   * @param {string[]} output Default: output gets calculated from the input according to the rules and number turns. 
   * What output the user should produce
   */
  constructor(name, input, rules = GameOfLife.CONWAY_RULES, numberTurns = 1, output = null) {
    this.name = name;
    this.input = input;
    this.rules = rules;
    this.numberTurns = numberTurns;
    // dimension: [rows, columns]
    this.dim = [input.length, input[0].length];

    if (!output) {
      // no output available: calculate the expected output
      this.output = this.calculateExpectedOutput();
    }

  }

  calculateExpectedOutput() {
    let outputField = GameOfLifeSimulator.calculateOutput(this);

    // translate back from field to output format
    return outputField.map(outputRow => outputRow.map(cell => cell ? 'O' : '.').join(''))
  }
} // END class GameOfLifeTestcase

CODE.GAMES.add(new GameOfLife());