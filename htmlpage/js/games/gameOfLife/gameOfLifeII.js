class GameOfLifeII extends GameOfLife {

  id = "gameOfLifeII";
  title = "Conway's Game of Life II";
  description = "Berechnen, wie Conway's Game of Life nach mehreren Schritten aussieht";
  synopsis = "Nachdem du deinen Boss davon überzeugt hast dass du weißt wie die Regeln von Conway's Spiel funktionieren, darfst du nun ans Eingemachte gehen!";
  successMessage = "Das Spiel des Lebens kann dir keine Überraschungen mehr bereiten - du hast es algorithmisch völlig durchdacht. Großartig!";
  codeTemplate = `// Code Template zum Einlesen der Variablen.
// Dieses Template darf selbstverständlich verändert werden!
const H = parseInt(await readline());
const W = parseInt(await readline());
const N = parseInt(await readline());
for (let i = 0; i < H; i++){
  const line = await readline();
}

// Eingaben sind eingelesen. 
// TODO: Code schreiben, der das neue Feld berechnet.

// Outputs mit console.log(...) schreiben
// Debugging mit console.debug(...)
console.log('...');`;
  rules =  `
  <p>Was genau Conway's Game of Life ist hat du in <a href="#game:gameOfLife">Teil I</a> schon kennen gelernt. Hier noch 
    einmal kurz die Regeln wie sich die Zellen entwickeln:
  <ul>
    <li><b>Überleben:</b> Eine zu <span class="var">t</span> lebendige Zelle ist in <span class="var">t + 1</span>
      noch lebendig genau dann wenn sie 2 oder 3 lebendige Nachbarn hatte.
    <li><b>Sterben:</b> Eine zu <span class="var">t</span> lebendige Zelle stirbt in <span class="var">t + 1</span>
      wenn sie zu einsam war (0 oder 1 lebendige Nachbarn), oder erdrückt wurde (4 oder mehr lebendige Nachbarn).
    <li><b>Geburt:</b>Eine zu <span class="var">t</span> tote Zelle wird in <span class="var">t + 1</span>
      geboren (lebendig), wenn sie genau 3 lebendige Nachbarn hatte - nicht mehr, nicht weniger.
  </ul>
  <p>Deine Aufgabe besteht nun darin, den Zustand des zellulären Automaten nach <span class='var'>numberTurns</span>
    Schritten zu berechnen.
  <p>Dafür kannst du gerne den Code aus Teil I wieder verwenden und erweitern!
  `;
  input = `Eine Zeile mit Höhe <span class='var'>H</span>, eine mit Breite <span class='var'>W</span>, 
    eine mit der Anzahl der Schritte <span class='var'>numberTurns</span> 
    und danach <span class='var'>H</span> Zeilen mit den Spielfeld-Zeilen. 
    <ul>
      <li>Tote Zellen: <span class='num'>.</span> (Punkt)</li>
      <li>Lebendige Zellen: <span class='num'>O</span> (großes o, keine Null!)</li>
    </ul>
    <p>Beispiel 1: 
      <span class='console'>3<br>3<br>1<br>.O.<br>.O.<br>.O.</span>
    <p>Beispiel 2:
      <span class='console'>4<br>4<br>3<br>.O..<br>..O.<br>OOO.<br>....</span>
    `;
  output = `Simulation des Spielfeldes nach <span class='var'>numberTurns</span> Schritten Conway's Game. 
  <span class='var'>H</span> Zeilen mit einem String der Länge <span class='var'>W</span>, 
  der den Tot- oder Lebendig-Status der Zellen in der Zeile angibt.<p>Beispiel:  
  <p>Beispiel 1:
    <span class='console'>...<br>OOO<br>...</span>
  <p>Beispiel 2:
    <span class='console'>....<br>.O..<br>..OO<br>.OO.</span>
  `;
  
  skillLevel = 3;
  numberLinesInitialRead = 3;
  
  testcases = [
    new GameOfLifeTestcase(
      "Beispiel 1",
      `.O.
.O.
.O.`.split('\n'),
      GameOfLife.CONWAY_RULES,
      1
    ),
    new GameOfLifeTestcase(
      "Bar Oscillator 2 steps",
      `.O.
.O.
.O.`.split('\n'),
      GameOfLife.CONWAY_RULES,
      2
    ),
    new GameOfLifeTestcase(
      "Stable 5 steps",
      `.OO.
O..O
.OO.`.split('\n'),
      GameOfLife.CONWAY_RULES,
      5,
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
      5
    ),
    new GameOfLifeTestcase(
      "Beispiel 2",
      `..O.
O.O.
.OO.
....`.split('\n'),
      GameOfLife.CONWAY_RULES,
      3
    ),
    new GameOfLifeTestcase(
      "Glider",
      `..O..
O.O..
.OO..
.....`.split('\n'),
      GameOfLife.CONWAY_RULES,
      8
    ),
    new GameOfLifeTestcase(
      "Gosper Glider Gun",
      `......................................
.........................O............
.......................O.O............
.............OO......OO............OO.
............O...O....OO............OO.
.OO........O.....O...OO...............
.OO........O...O.OO....O.O............
...........O.....O.......O............
............O...O.....................
.............OO.......................
......................................
......................................
......................................
......................................
......................................
......................................`.split("\n"),
      GameOfLife.CONWAY_RULES,
      30
    ),
    new GameOfLifeTestcase(
      "Random Small",
      `...OOO
...O.O
...OOO
.OO..O
..OO..
......`.split('\n'),
      GameOfLife.CONWAY_RULES,
      3
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
      GameOfLife.CONWAY_RULES,
      10
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
      GameOfLife.CONWAY_RULES,
      6
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
      GameOfLife.CONWAY_RULES,
      3
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
      GameOfLife.CONWAY_RULES,
      4
    )
  ];

  readInit = (lineIndex) => {
    let tc = CODE.C.testcase;
    switch(lineIndex){
      case -3:
        return tc.dim[0];
      case -2: 
        return tc.dim[1];
      case -1:
        return tc.numberTurns;
      default: 
        console._error("Line index ", lineIndex);
        throw Error("We should not have landed here in state " + lineIndex);
    }
  }

 


}


CODE.GAMES.add(new GameOfLifeII());