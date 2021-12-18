class GameOfLife extends Game {

  id = "gameOfLife";
  title = "Conway's Game of Life I";
  description = "Einen Schritt in Conway's Game of Life simulieren";
  synopsis = "Deine Aufgabe ist es, einen Simulator für zelluläre Automaten zu schreiben. Dein Boss gibt dir die Aufgabe, dich zuerst einmal mit den Regeln vertraut zu machen, bevor er dich an das eigentliche Projekt lässt.";
  successMessage = "Du hast das Spiel des Lebens gemeistert! Naja, den Anfang. Aber aller Anfang ist schwer, und jetzt kannst du deinem Boss zeigen was du drauf hast. Mach mit Teil II weiter!";
  codeTemplate = `// Code Template zum Einlesen der Variablen.
// Dieses Template darf selbstverständlich verändert werden!
const H = parseInt(await readline());
const W = parseInt(await readline());
for (let i = 0; i < H; i++){
  const line = await readLine();
}

// Eingaben sind eingelesen. 
// TODO: Code schreiben, der das neue Feld berechnet.

// Outputs mit console.log(...) schreiben
// Debugging mit console.debug(...)
console.log('...');`;
  rules =  `
  <p><b>Conway's Game of Life</b> gehört zu den zellulären Automaten. 
  <div class="quote">
    <b>Zellulärer Automat</b> - <i>Wikipedia</i>
    <p>
      Zelluläre oder auch zellulare Automaten dienen der Modellierung räumlich diskreter dynamischer Systeme, 
      wobei die Entwicklung einzelner Zellen zum Zeitpunkt <span class="var">t + 1</span> primär von den 
      Zellzuständen in einer vorgegebenen Nachbarschaft und vom eigenen Zustand zum Zeitpunkt 
      <span class="var">t</span> abhängt. 
  </div>
  <p> Conway's Game of Life schränkt diese doch sehr allgemeine Aussage erheblich ein:
  <ul>
    <li><b>räumlich diskret:</b> ein Feld das mit <span class='var'>H</span> Zeilen à 
        <span class='var'>W</span> Zellen gefüllt ist. 
    <li><b>Mögliche Zustände:</b> Jede Zelle kann nur genau 2 Zustände einnehmen: lebendig und tot.
    <li><b>Nachbarschaft:</b> die (bis zu) <span class="num">8</span> Zellen direkt um eine Zelle herum - 
      horizontal, vertikal, diagonal. An den Rändern werden die nicht existierenden Zellen außerhalb als tot 
      gewertet. Die linke obere Ecke hat somit nur maximal 3 lebendige Nachbarn.
    <li><b>Entwicklung:</b> Es gibt Regeln, wann Zellen sterben, wann sie überleben, und wann sie geboren werden.
      <ul>
        <li><b>Überleben:</b> Eine zu <span class="var">t</span> lebendige Zelle ist in <span class="var">t + 1</span>
          noch lebendig genau dann wenn sie 2 oder 3 lebendige Nachbarn hatte.
        <li><b>Sterben:</b> Eine zu <span class="var">t</span> lebendige Zelle stirbt in <span class="var">t + 1</span>
          wenn sie zu einsam war (0 oder 1 lebendige Nachbarn), oder erdrückt wurde (4 oder mehr lebendige Nachbarn).
        <li><b>Geburt:</b>Eine zu <span class="var">t</span> tote Zelle wird in <span class="var">t + 1</span>
          geboren (lebendig), wenn sie genau 3 lebendige Nachbarn hatte - nicht mehr, nicht weniger.
      </ul>
      
  </ul>
  <p>Trotz der relativ simplen Regeln können sich daraus extrem komplexe Verhaltensmuster ergeben. Es gibt
    statische Formen (Zustand in t+1 = t), zyklische (Zustand in t+x = t), Schiffe 
    (in t+x existiert die selbe Formation wie in t, nur horizontal und/oder vertikal verschoben), Generatoren
    (zyklische Muster, die im Rahmen ihres Zykluses Schiffe generieren), etc. - oder auch schlicht weg Chaos bei
    dem man nicht vorhersehen kann ob sich das Spielfeld auslöscht oder nicht. 
  
  <p>So ein Automat kann gut als Serie von Spielfeldern dargestellt werden. 
    
  <div class="sample">
  <p>Beispiel eines 3x3 Spielfeldes mit einem Blinker (2er-Zyklus): 
  <div class="example">
    <p>Zeitpunkt <span class="var">t</span></p>
    <table class="life" style="border-collapse: collapse; height: 100px; width: 100px">
      <tr><td class="cell dead"/><td class="cell live"/> <td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell live"/> <td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell live"/> <td class="cell dead"/></tr>
    </table>
  </div>
  <div class="example">
    <p><span class="var">t+1</span></p>
    <table class="life" style="border-collapse: collapse; height: 100px; width: 100px">
      <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell dead"/></tr>
      <tr><td class="cell live"/><td class="cell live"/> <td class="cell live"/></tr>
      <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell dead"/></tr>
    </table>
  </div>
  <div class="example">
    <p><span class="var">t+2</span></p>
    <table class="life" style="border-collapse: collapse; height: 100px; width: 100px">
      <tr><td class="cell dead"/><td class="cell live"/> <td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell live"/> <td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell live"/> <td class="cell dead"/></tr>
    </table>
  </div>
  </div>

  
  <div class="sample">
  <p>Glider-Schiff, das einfachste Schiff das existiert (4er-Zyklus)
  <div class="example">
    <p>Zeitpunkt <span class="var">t</span></p>
    <table class="life" style="border-collapse: collapse; height: 100px; width: 100px">
      <tr><td class="cell dead"/><td class="cell live"/> <td class="cell dead"/><td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell live"/><td class="cell dead"/></tr>
      <tr><td class="cell live"/><td class="cell live"/> <td class="cell live"/><td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell dead"/><td class="cell dead"/></tr>
    </table>
  </div>
  <div class="example">
    <p><span class="var">t+1</span></p>
    <table class="life" style="border-collapse: collapse; height: 100px; width: 100px">
      <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell dead"/><td class="cell dead"/></tr>
      <tr><td class="cell live"/><td class="cell dead"/> <td class="cell live"/><td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell live"/> <td class="cell live"/><td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell live"/> <td class="cell dead"/><td class="cell dead"/></tr>
  </table>
  </div>
  <div class="example">
    <p><span class="var">t+2</span></p>
    <table class="life" style="border-collapse: collapse; height: 100px; width: 100px">
      <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell dead"/><td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell live"/><td class="cell dead"/></tr>
      <tr><td class="cell live"/><td class="cell dead"/> <td class="cell live"/><td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell live"/> <td class="cell live"/><td class="cell dead"/></tr>

    </table>
  </div>
  <div class="example">
  <p><span class="var">t+3</span></p>
  <table class="life" style="border-collapse: collapse; height: 100px; width: 100px">
    <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell dead"/><td class="cell dead"/></tr>
    <tr><td class="cell dead"/><td class="cell live"/> <td class="cell dead"/><td class="cell dead"/></tr>
    <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell live"/><td class="cell live"/></tr>
    <tr><td class="cell dead"/><td class="cell live"/> <td class="cell live"/><td class="cell dead"/></tr>

  </table>
  </div>
  <div class="example">
    <p><span class="var">t+4</span></p>
    <table class="life" style="border-collapse: collapse; height: 100px; width: 100px">
      <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell dead"/><td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell live"/><td class="cell dead"/></tr>
      <tr><td class="cell dead"/><td class="cell dead"/> <td class="cell dead"/><td class="cell live"/></tr>
      <tr><td class="cell dead"/><td class="cell live"/> <td class="cell live"/><td class="cell live"/></tr>

    </table>
  </div>
  </div>

  <p>Ziel von diesem Spiel ist es, anhand von einem gegebenen Zustand zum Zeitpunkt <span class="var">t</span>
    den nächsten Zustand <span class="var">t+1</span> zu errechnen.
  </p>
  `;
  input = "Eine Zeile mit Höhe <span class='var'>H</span>, eine mit Breite <span class='var'>W</span>, und danach <span class='var'>H</span> Zeilen mit den Spielfeld-Zeilen. <ul><li>Tote Zellen: <span class='num'>.</span> (Punkt)</li><li>Lebendige Zellen: <span class='num'>O</span> (großes o, keine Null!)</li></ul><p>Beispiel: <span class='console'>3<br>3<br>.O.<br>.O.<br>.O.</span>";
  output = "Simulation des Spielfeldes nach 1 Schritt Conway's Game. <span class='var'>H</span> Zeilen mit einem String der Länge <span class='var'>W</span>, der den Tot- oder Lebendig-Status der Zellen in der Zeile angibt.<p>Beispiel:  <span class='console'>...<br>OOO<br>...</span>";
  skills = ["String Manipulation", "Loops", "Conditions"];
  skillLevel = 2;
  // how many lines need to be read via readline() before user gets the testcase input
  numberLinesInitialRead = 2;

  // css file - should be the same for all games of life!
  cssFile = "./js/games/gameOfLife/gameOfLife.css";

  // we don't need to wait between readlines, because we aren't rendering anything!
  readlineSleep = 0;
  
  /**
   * The rules for a Conway game of life
   */
  static CONWAY_RULES = {
    alive: [0, 0, 1, 1, 0, 0, 0, 0, 0],
    dead: [0, 0, 0, 1, 0, 0, 0, 0, 0]
  }

  testcases = [
    new GameOfLifeTestcase(
      "Beispiel",
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
      `..O..
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
    let tc = CODE.C.testcase,
      line;
    // are we still initializing, or reading the game of life input?
    if (this.currentRead < 0) {
      // initial line
      line = this.readInit(this.currentRead);

    } else {
      // testcase input
      line = tc.input[this.currentRead];
    }

    // increment our read pointer
    this.currentRead++;
    return line;
  }

  /**
   * 
   * @param {number} lineIndex the this.currentRead index of the input line the user wants to read - 
   *  any line before the actual testcase input reading!
   * @returns the line
   */
  readInit = (lineIndex) => {
    let tc = CODE.C.testcase;
    switch(lineIndex){
      case -2: return tc.dim[0];
      case -1: return tc.dim[1];
      default: throw Error("We should not have landed here in state " + lineIndex);
    }
  }

  prepareTestcase = () => {
    this.currentRead = (-1) * this.numberLinesInitialRead;
    this.currentLog = 0;
    this.currentUserLog = [];
  }

  consolelog = (args) => {
    //console._log("args: ", args, "testcase", CODE.C.testcase);
    let userInput = args[0];
    this.currentUserLog.push(userInput)
    this.checkInputAgainstTarget(userInput, CODE.C.testcase.output);
  }

  end = () => {
    this.endCheckInputAgainstTarget(CODE.C.testcase.output, 'Great game simulation!');
  }

  initGameArea = (elPlayingfield) => {
    elPlayingfield.innerHTML = `<table id='life' class='life'>
    </table>
    <div class='btnPanel'>
      <div class='btn' id='showInitial'>Show Initial State</div>
      <div class='btn' id='showMySolution'>Show My Solution</div>
      <div class='btn' id='playSimulation'>Play Simulation</div>
    </div>`;

    // add the button clickhandlers
    // show initial
    document.getElementById("showInitial").onclick = () => { this.displayShowInitial() };

    // play simulation
    document.getElementById("playSimulation").onclick = () => {
       this.displayGameSimulation();
    };

    // show the user output
    document.getElementById("showMySolution").onclick = () => { this.displayUserOutput() };

  }

  /**
   * shows the current user input
   * @returns nothing
   */
  displayUserOutput = () => {
    let tc = CODE.C.testcase,
      tcOut = tc.output,
      userOut = this.currentUserLog;

    // check if everything is initialized; stop other simulations from playing
    if (!this.displayIsInitialized()) {
      return;
    }


    // go through the rows and compare user output to the actual output
    for (let r = 0; r < tcOut.length; r++) {
      let tcLine = tcOut[r],
        userLine = userOut[r] || ""; // in case the user hasn't gotten that far, assume an empty string
      for (let c = 0; c < tcLine.length; c++) {
        let tcChar = tcLine[c],
          isAlive = tcChar === 'O',
          userChar = userLine[c],
          isUserRight = tcChar === userChar,
          elCell = document.getElementById(r + "_" + c),
          // class for the cell: remember if the user chose correctly or not
          cellClass = isUserRight ? "correct-" : "incorrect-";

        // tell the element class whether the original is alive or not
        if (isAlive)
          cellClass += "live";
        else
          cellClass += "dead";

        // set the element class
        elCell.className = cellClass;

      }
    }
  }

  /**
   * Checks whether everything is initialized so that we can start rendering our testcase.
   * Aborts all other current simulations.
   * @param {GameOfLifeTestcase} testcase null: checks for CODE.C.testcase
   * @returns {boolean} false: no testcase is selected
   */
  displayIsInitialized = (testcase=null) => {
    // abort previous simulations
    if (this.objSimulationAbort) {
      this.objSimulationAbort.abort = true;
    }

    // if we have a testcase, check if we actually have a valid one...
    if (testcase ){
      // invalid testcase
      if (!testcase.input){
        alert("Please select a testcase first!");
        return false;
      }

      // valid testcase
      return true;
    }

    // make sure we have initialized things...
    if (!CODE.C.testcase || !CODE.C.testcase.input) {
      alert("Please play a testcase first!");
      return false;
    }

    return true;
  }

  /**
   * Shows the chosen testcase input
   * @param {GameOfLifeTestcase} testcase null: shows for CODE.C.testcase
   * @returns {number[][]} the initial field or null if no testcase was chosen
   */
  displayShowInitial = (testcase=null) => {
    let tc = testcase? testcase : CODE.C.testcase,
      field,
      elTable = document.getElementById("life"),
      tableHtml = [];

    // check if everything is initialized; stop other simulations from playing
    if (!this.displayIsInitialized(tc)) {
      return null;
    }

    field = GameOfLifeSimulator.getFieldFromInput(tc);


    // prepare the table
    field.forEach((row, r) => {
      tableHtml.push("<tr>");
      row.forEach((cell, c) => {

        tableHtml.push("<td id='" + r + "_" + c + "' class='" + (field[r][c] ? "live" : "dead") + "'></td>");
      })
      tableHtml.push("</tr>");
    });
    elTable.innerHTML = tableHtml.join('');

    return field;
  }

  /**
   * 
   * Starts off the game-of-life simulation for all steps as designed in CODE.C.testcase.
   * 
   */
  displayGameSimulation = (testcase = null) => {
    let tc = testcase? testcase : CODE.C.testcase,
      numberTurns,
      field = this.displayShowInitial(tc);

    // in case we don't have a field, something went wrong.
    if (!field){
      return;
    }

    // initialize our fields
    numberTurns = tc.numberTurns;
    
    // start the simulation
    this.objSimulationAbort = GameOfLifeSimulator.simulateRounds(field, tc.rules, numberTurns);

  }

  updateGameArea = (isNewTestcase) => {


    if (isNewTestcase) {
      this.displayShowInitial();
      return;
    } // END if isNesTestcase


    // not a new playing field: show user output
    this.displayUserOutput();
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
   * Assumption: display has been initialized beforehand!
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

    
    // simulate the next round after waiting
    setTimeout(() => {
      if (objAbort.abort){
        return;
      }
      // do our round
      let newField = GameOfLifeSimulator.calculateRound(field, rules, true);

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
    this.output = output;

    if (!output) {
      // no output available: calculate the expected output
      this.output = this.calculateExpectedOutput();
      //console._log(this);
    }

  }

  calculateExpectedOutput() {
    let outputField = GameOfLifeSimulator.calculateOutput(this);

    // translate back from field to output format
    return outputField.map(outputRow => outputRow.map(cell => cell ? 'O' : '.').join(''))
  }
} // END class GameOfLifeTestcase

CODE.GAMES.add(new GameOfLife());