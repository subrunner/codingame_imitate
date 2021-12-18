class CustomGameOfLife extends GameOfLife {

  id = "customGameOfLife";
  title = "Custom Game of Life";

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

  // we fill our release-tests with randomized stuff!
  releasetests =[];



}

CODE.GAMES.add(new CustomGameOfLife());