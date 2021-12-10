class Asteroids extends Game{

  id="asteroids";
  title="Asteroids";
  description = "Extrapolate the position of asteroids from two pictures of the sky";
  synopsis = "<p>You have just been given a job at the Very Large Telescope. Your task is to keep track of all the asteroids that get photographed, in case one comes closer to earth.<p>But there are so many of them, both photographs and asteroids! Thankfully, you are also a budding programmer. You try and make the computer do your work for you.";
  successMessage = "<p>The computer can now do your work for you! You always know where the asteroids are going! <p style='font-size:0.8rem'>As long as they don't move in the third dimension, but whatever...</p>"
  skillLevel=1;
  skills = ["Loops"];
  readlineSleep = 0;

  testcases = [
    {
      name: "Horizontal Motion",
      times: [1,2,3],
      dim: [5,5],
      input: `A.... .A...
..... .....
..... .....
..... .....
..... .....`.split('\n'),
solution: `..A..
.....
.....
.....
.....`.split('\n')
    },{
      name: "Vertical Motion",
      times: [1,2,3],
      dim: [5,5],
      input: `A.... .....
..... A....
..... .....
..... .....
..... .....`.split('\n'),
solution: `.....
.....
A....
.....
.....`.split('\n')
    },{
      name: "Combined Motion",
      times: [1,2,3],
      dim: [5,5],
      input: `A.... .....
..... .A...
..... .....
..... .....
..... .....`.split('\n'),
solution: `.....
.....
..A..
.....
.....`.split('\n')
    },{
      name: "Negative Motion",
      times: [1,2,3],
      dim: [5,5],
      input: `..... .....
..... .A...
..A.. .....
..... .....
..... .....`.split('\n'),
solution: `A....
.....
.....
.....
.....`.split('\n')
    },{
      name: "Greater Delta",
      times: [1,2,3],
      dim: [6,6],
      input: `A..... ......
...... ......
...... A.....
...... ......
...... ......
...... ......`.split('\n'),
solution: `......
......
......
......
A.....
......`.split('\n')
    },{
      name: "Different Time Ratios",
      times: [1,5,6],
      dim: [6,6],
      input: `A..... ....A.
...... ......
...... ......
...... ......
...... ......
...... ......`.split('\n'),
solution: `.....A
......
......
......
......
......`.split('\n')
    },{
      name: "Multiple Asteroids",
      times: [1,3,5],
      dim: [6,6],
      input: `A..... .A....
...... B.....
B..... ......
...... ......
...... ......
...... ......`.split('\n'),
solution: `B.A...
......
......
......
......
......`.split('\n')
    }, {
      name: "Depth",
      times: [1,6,11],
      dim: [6,6],
      input: `..H... ......
...... ..H...
E...G. .E.G..
...... ..F...
..F... ......
...... ......`.split('\n'),
solution: `......
......
..E...
......
......
......`.split('\n')
    }, {
      name: "No Motion",
      times: [0,1255,9999],
      dim: [5,5],
      input: `..... .....
.C... .C...
..... .....
...D. ...D.
..... .....`.split('\n'),
solution: `.....
.C...
.....
...D.
.....`.split('\n')
    }, {
      name: "Out of Bounds",
      times: [0,100,200],
      dim: [10,10],
      input: `A......... .A........
B......... ..B.......
C......... ...C......
D......... ....D.....
E......... .....E....
.........F ........F.
.........G .......G..
.........H ......H...
.........I .....I....
.........J ....J.....`.split('\n'),
solution: `..A.......
....B.....
......C...
........D.
..........
.......F..
.....G....
...H......
.I........
..........`.split('\n')
    }, {
      name: "Armageddon",
      times: [25, 75, 100],
      dim: [20,20],
      input: `.................O.. G...................
.....N...........U.. ...............W....
.............L.R.... ...................C
.................... ...E................
..........Z..V.H.... ..............K.....
................X... ...........T........
.............P...... ............A.......
.............A...... .....P...FLI......N.
.Q.............T.... ....................
..................F. ........D...........
.................... ......S..Y.........M
......K............W .........B....Z.....
...............Y.... ....................
..............S..... ....V.............J.
...........JE......D .........O..........
...M................ ..X...........U.....
......B..G...C....I. ....................
.................... ....................
.................... ..Q................R
.................... .......H............`.split('\n'),
solution: `..................K.
....................
.......I............
.........T..........
....................
...........A........
..D.F...............
.P..................
..S.......B.........
......Y.L...........
....................
....................
....................
....................
................Z...
....................
....................
....................
....................
....................`.split('\n')
    }
  ];

  releasetests = [ {
    name: "Rectangular grid",
    times: [0,100,150],
    dim: [10,15],
    input: `A......... .A........
B......... ..B.......
C......... ...C......
D.L....... ....D.....
E......... .....E....
...O.....F ........F.
.........G .......G..
.........H ...O..H...
.........I .....I....
.........J ...LJ.....
K......... ..........
.......... ....K.....
.......... ....N.....
...N...... ..........
.......M.. .......M..`.split('\n'),
solution: `.A........
...B......
....C.....
......D...
.......E..
.......F..
......G...
....H.....
...I......
.J........
..........
....N.K...
...L......
..........
.......M..`.split('\n')
  }, {
    name: "Check for all",
    times: [0, 30, 40],
    dim: [20,20],
    input: `.................O.. G...................
.....N...........U.. ...............W....
.............L.R.... ...................C
.................... ...E................
..........Z..V.H.... ..............K.....
................X... ...........T........
.............P...... ............A.......
.............A...... .....P...FLI......N.
.Q.............T.... ....................
..................F. ........D...........
.................... ......S..Y.........M
......K............W .........B....Z.....
...............Y.... ....................
..............S..... ....V.............J.
...........JE......D .........O..........
...M................ ..X...........U.....
......B..G...C....I. ....................
.................... ....................
.................... ..Q................R
.................... .......H............`.split('\n'),
solution: `....................
................K...
....................
....................
........IT..........
...........A........
......F.............
..P.D...............
.........L..........
...S...Y..B.........
....................
....................
....................
...............Z....
....................
....................
.V..................
....................
......O.............
.............U......`.split('\n')
  }];

  prepareTestcase = () => {
    let tc = CODE.C.testcase;
    this.currentRead = -1;
    this.currentLog = 0;
  }

  initGameArea = ()=>{
    // we have no game area
  }

  updateGameArea = () => { }

  readline = () => {
    let tc = CODE.C.testcase;
    if (this.currentRead < 0){
      // initial line
      this.currentRead++;
      return tc.dim.join(' ') + " " + tc.times.join(' ');
      
    }
    return CODE.C.testcase.input[this.currentRead++];
  }

  consolelog = (args) => {
    this.checkInputAgainstTarget(args[0], CODE.C.testcase.solution);
  }

  

  end = () => {
    this.endCheckInputAgainstTarget(CODE.C.testcase.solution, 'You are making progress in getting the computer to work for you!');    
  }

  codeTemplate = `
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * For debugging, use console.debug('')
 **/

var inputs = (await readline()).split(' ');
const W = parseInt(inputs[0]);
const H = parseInt(inputs[1]);
const T1 = parseInt(inputs[2]);
const T2 = parseInt(inputs[3]);
const T3 = parseInt(inputs[4]);
for (let i = 0; i < H; i++) {
  var inputs = (await readline()).split(' ');
  const firstPictureRow = inputs[0];
  const secondPictureRow = inputs[1];

}

// print the first line of output:
// console.log('....A')`;

  rules = `<p>You have been tasked with studying a region of space to detect potentially dangerous asteroids.
  You are given two pictures of the night sky of dimensions <span class="var">W</span> * <span class="var">H</span>, taken at two different times <span class="var">t1</span> and <span class="var">t2</span>.
  For your convenience, asteroids have been marked with capital letters <span class="num">A</span> to <span class="num">Z</span>, the rest is empty space represented by a dot (<span class="num">.</span>) .
  Using the information contained in those two pictures, determine the position of the asteroids at <span class="var">t3</span>, and output a picture of the same region of the sky.
  
  <p>If necessary, the final coordinates are to be rounded-down (floor).
  <p>Asteroids travel at different altitudes (with <span class="num">A</span> being the closest and <span class="num">Z</span> the farthest from your observation point) and therefore cannot collide with each other during their transit.
  If two or more asteroids have the same final coordinates, output only the closest one.
  <p>It is guaranteed that all asteroids at <span class="var">t1</span> will still be present at <span class="var">t2</span>, that no asteroids are hidden in the given pictures, and that there is only one asteroid per altitude.`;

  input = `
  <p><b>Line 1:</b> five ints separated by a space, <span class="var">W</span> <span class="var">H</span> <span class="var">t1</span> <span class="var">t2</span> <span class="var">t3</span>
<p><b>Next H lines:</b> a row of picture 1 and picture 2, separated by a white space.
<p><b>Example Testcase 0:</b><span class="console">5 5 1 2 3<br>
A.... .A...<br>
..... .....<br>
..... .....<br>
..... .....<br>
..... .....</span>
<p><b>Constraints:</b><br>
0 &leq; <span class="var">t1</span> &lt; <span class="var">t2</span> &lt; <span class="var">t3</span> &leq; 1000<br>
0 &lt; <span class="var">W</span>, <span class="var">H</span>  &leq; 20`;

  output = `
  <p><span class="var">H</span> lines for the state of the sky at <span class="var">t3</span>
  <p><b>Example Testcase 0:</b><span class="console">..A..<br>
  .....<br>
  .....<br>
  .....<br>
  .....</span>`
}


CODE .GAMES.add(new Asteroids());