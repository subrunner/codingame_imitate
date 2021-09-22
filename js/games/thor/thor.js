class Thor {


  id = "thor";
  title = "Thor - Find the Light!";
  description = 'Help Thor <img src="./js/games/thor/thor.png" style="width:40px;height:40px"> to reach the light <img src="./js/games/thor/light.png" style="width:40px;height:40px"> of power.';
  successMessage = "Thor is now immune against Loki's light-stealing powers. At the very least, he knows how to get it back no matter where Loki hides it. <p>Good job!"
  synopsis = `
<p>The final battle of Ragnarök, the twilight of the gods is approaching. You incarnate Thor who is participating in this final battle against all the forces of evil, led by Loki, Thor's wizard brother.
<p>Thor was wounded during a previous battle against Fenrir, the wolf-god. During the battle, Loki took advantage of the general confusion and used his magic to annihilate the magical powers of Thor’s hammer, Mjöllnir, by separating it from his soul: the light of power.
<p>Thor, who now feels very weak, must find and reach the light of power, as fast as possible, since it is the only thing which can restore his and Mjollnir's powers.</p>`
  hasStarted = false;
  chosenTestcase = -1;
  currentTurn = -1;
  currentThor = [];
  light = [];
  dim = [30, 15];
  cssFile = "./js/games/thor/thor.css";

  /**
   * Keeps track of which testcases were successfully completed
   */
  successfulTestcases = [];

  /**
   * The configured testcases
   */
  testcases = [
    {
      name: "Straight Line I",
      thor: [10, 5],
      light: [10, 8],
      numberTurns: 10
    },
    {
      name: "Straight Line II",
      thor: [17, 8],
      light: [10, 8],
      numberTurns: 20
    },
    {
      name: "Diagonal",
      thor: [18, 10],
      light: [3, 5],
      numberTurns: 22
    },{
      name: "Diagonal - Quick",
      thor: [8, 10],
      light: [13, 5],
      numberTurns: 5
    }
  ];

  svgHtml;

  constructor() {
    this.testcases.forEach(t => this.successfulTestcases.push(false));


  }

  displayGame = (elPlayingfield) => {
    if (!this.svgHtml) {
      /**
     * render the SVG
     */
      let width = this.dim[0] * 10,
        height = this.dim[1] * 10,
        svg = ['<svg viewBox="0 0 ' + width + ' ' + height + '">']
        ;
      // rectangle
      svg.push('<rect x="0" y="0" width="' + width + '" height="' + height + '" class="background"></rect>');

      // lines. Assume: width > height!
      for (let i = 10; i < width; i += 10) {
        
        // vertical
        svg.push('<line x1="' + i + '" x2="' + i + '" y1="0" y2="' + height + '" class="line"></line>')

        // horizontal
        if (i < height) {
          svg.push('<line x1="0" x2="' + width + '" y1="' + i + '" y2="' + i + '" class="line"></line>');
        }
      }
      for (let i = 0; i <= width; i += 50) {
        let isTenline = i%100===0,
          clazz = isTenline ?"tenLine": "fiveLine" ; 

        // vertical
        svg.push('<line x1="' + i + '" x2="' + i + '" y1="0" y2="' + height + '" class="line ' + clazz + '"></line>')

        // horizontal
        if (i <= height) {
          svg.push('<line x1="0" x2="' + width + '" y1="' + i + '" y2="' + i + '" class="line ' + clazz + '"></line>');
        }
      }

      
      // text
      svg.push('<text x="0" y="10">(0,0)</text>');
      svg.push('<text x="' + (width - 35) + '" y="' + (height - 2) + '">(' + this.dim[0] + "," + this.dim[1] + ')</text>')

      // compass
      this.getCompass(svg, width - 40, 42, 20);

      // end
      svg.push('</svg>')

      // Thor and Light
      svg.push('<div id="light"><span>(L)</span></div>');
      svg.push('<div id="thor"><span>(T)</span></div>');

      this.svgHtml = svg.join("\n")
    }

    // show the SVG
    elPlayingfield.innerHTML = this.svgHtml;

    // if we have a testcase, show the light and Thor
    if (this.chosenTestcase > -1) {
      let elLight = document.getElementById("light"),
        elThor = document.getElementById("thor"),
        testcase = this.testcases[this.chosenTestcase];
      this.setGamePosition(elThor, testcase.thor);
      this.setGamePosition(elLight, testcase.light);
    }
  } // END displayGame

  /**
   * Creates SVG compass
   * @param {array} svg array to fill with the individual svg lines
   * @param {number} centerX center x-coordinate
   * @param {number} centerY compass center y-coordinate
   * @param {number} radius compass circle radius
   * @returns {array} the svg array
   */
  getCompass(svg, centerX, centerY, radius) {
    let center = [centerX, centerY],
      sqrtRadius = radius / Math.sqrt(2),
      transform,
      x, y;
    svg.push('<circle cx="' + center[0] + '" cy="' + center[1] + '" r="' + radius + '" stroke="black" stroke-width="2" fill="none"/>');

    // south needle
    x = center[0];
    y = center[1] + radius;
    transform = 'translate(' + x + ' ' + y + ')';
    svg.push('<polygon points="-5,0 0,10 5,0 0,0 0,10" transform="' + transform + '" class="compassNeedle"/>');
    svg.push('<text x="' + x + '" y="' + y + '" dx="-3" dy="20">S</text>');

    // north needle
    y = center[1] - radius;
    transform = 'translate(' + x + ' ' + y + ') rotate(180)';
    svg.push('<polygon points="-5,0 0,10 5,0 0,0 0,10" transform="' + transform + '" class="compassNeedle"/>');
    svg.push('<text x="' + x + '" y="' + y + '" dx="-3" dy="-12">N</text>');

    // west needle
    x = center[0] - radius;
    y = center[1];
    transform = 'translate(' + x + ' ' + y + ') rotate(90)';
    svg.push('<polygon points="-5,0 0,10 5,0 0,0 0,10" transform="' + transform + '" class="compassNeedle"/>');
    svg.push('<text x="' + x + '" y="' + y + '" dx="-22" dy="5">W</text>');

    // east needle
    x = center[0] + radius;
    transform = 'translate(' + x + ' ' + y + ') rotate(270)';
    svg.push('<polygon points="-5,0 0,10 5,0 0,0 0,10" transform="' + transform + '" class="compassNeedle"/>');
    svg.push('<text x="' + x + '" y="' + y + '" dx="12" dy="5">E</text>');

    // SW needle
    x = center[0] - sqrtRadius;
    y = center[1] + sqrtRadius;
    transform = 'translate(' + x + ' ' + y + ') rotate(45)';
    svg.push('<polygon points="-3,0 0,5 3,0" transform="' + transform + '" class="compassNeedle"/>');
    svg.push('<text x="' + x + '" y="' + y + '" dx="-15" dy="10" class="mixedDir">SW</text>');

    // NW needle
    x = center[0] - sqrtRadius;
    y = center[1] - sqrtRadius;
    transform = 'translate(' + x + ' ' + y + ') rotate(135)';
    svg.push('<polygon points="-3,0 0,5 3,0" transform="' + transform + '" class="compassNeedle"/>');
    svg.push('<text x="' + x + '" y="' + y + '" dx="-15" dy="-5" class="mixedDir">NW</text>');

    // NE needle
    x = center[0] + sqrtRadius;
    y = center[1] - sqrtRadius;
    transform = 'translate(' + x + ' ' + y + ') rotate(215)';
    svg.push('<polygon points="-3,0 0,5 3,0" transform="' + transform + '" class="compassNeedle"/>');
    svg.push('<text x="' + x + '" y="' + y + '" dx="4" dy="-5" class="mixedDir">NE</text>');

    // SW needle
    x = center[0] + sqrtRadius;
    y = center[1] + sqrtRadius;
    transform = 'translate(' + x + ' ' + y + ') rotate(305)';
    svg.push('<polygon points="-3,0 0,5 3,0" transform="' + transform + '" class="compassNeedle"/>');
    svg.push('<text x="' + x + '" y="' + y + '" dx="4" dy="10" class="mixedDir">SE</text>');

    return svg;
  }

  /**
   * 
   * @param {HTMLElement} el the element to set top + left
   * @param {array} pos [0]: x coordinate, [1]: y cooridnate
   */
  setGamePosition = function (el, pos) {
    el.style.display = "inline-block";
    el.style.left = (100 * (pos[0] - 0.333) / this.dim[0]) + "%";
    el.style.top = (100 * (pos[1] - 0.333) / this.dim[1]) + "%";
  } // END setGamePosition

  /**
   * Returns what the user gets as input
   * @returns {String} what the user gets as input  
   */
  readline = () => {
    if (this.hasStarted) {
      if (this.currentTurn > 0) {
        return this.currentTurn;
      }
      else {
        throw new Error("Exceeded nuber turns!");
      }
    }
    this.hasStarted = true;
    return this.light.join(" ") + " " + this.currentThor.join(" ");
  };

  /**
   * initializes everything for running a testcase
   * @param {number} id id of the testcase
   */
  prepareTestcase = function (id, elPlayingfield) {
    this.chosenTestcase = id;
    this.successfulTestcases[id] = false; // reset so that we can test again!
    let testcase = this.testcases[id];
    this.currentTurn = testcase.numberTurns;
    this.hasStarted = false;
    this.currentThor = testcase.thor.map(a => a);// copy the array...
    this.light = testcase.light; // no copying necessary - we don't modify it!

    // prepare the playing field
    this.displayGame(elPlayingfield);
  };

  /**
   * Function that gets called as soon as a console.log (= written user input) gets called
   * @param {array} args 
   */
  consolelog = function (args) {
    // don't do anything if we have a success!
    if (this.successfulTestcases[this.chosenTestcase]) {
      return;
    }

    // log the number turns here!
    this.currentTurn--;
    if (this.currentTurn < 0) {
      throw new Error("Exceeded nuber turns!");
    }

    // always only take the 1st variable of the array
    let userInput = args[0];

    // keep protocol where thor is!
    if (userInput.indexOf("S") > -1)
      this.currentThor[1]++;
    if (userInput.indexOf("N") > -1)
      this.currentThor[1]--;
    if (userInput.indexOf("W") > -1)
      this.currentThor[0]--;
    if (userInput.indexOf("E") > -1)
      this.currentThor[0]++;

    // display thor!
    this.setGamePosition(document.getElementById("thor"), this.currentThor);


    // check if thor is out of bounds!
    let isLight = true;
    for (let i = 0; i < 2; i++) {
      if (this.currentThor[i] < 0 || this.currentThor[i] >= this.dim[i])
        throw new Error("Thor is out of bounds at " + this.currentThor);
      isLight = isLight && (this.currentThor[i] === this.light[i]);
    }

    // not out of bounds. Check: have we found the light?
    if (isLight) {
      this.successfulTestcases[this.chosenTestcase] = true;
      console.log("Thor found the light!");
      throw new Error("SUCCESS");
    }
  };
  codeTemplate = `
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/

var inputs = (await readline()).split(' ');
const lightX = parseInt(inputs[0]); // the X position of the light of power
const lightY = parseInt(inputs[1]); // the Y position of the light of power
const initialTx = parseInt(inputs[2]); // Thor's starting X position
const initialTy = parseInt(inputs[3]); // Thor's starting Y position

// game loop
while (true) {
  const remainingTurns = parseInt(await readline()); // The remaining amount of turns Thor can move. Do not remove this line.

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');


  // A single line providing the move to be made: N NE E SE S SW W or NW
  console.log('SE');
}`;
  rules = `
<p>Thor moves on a map which is <span class="num">30</span> wide by <span class="num">15</span> high. Note that the coordinates (X and Y) start at the top left! This means the most top left cell has the coordinates "X=0,Y=0" and the most bottom right one has the coordinates "X=29,Y=14".

  <p>Once the program starts you are given:
  <ul>
      <li>the variable <span class="var">lightX</span>: the X position of the light of power that Thor must reach.
      <li>the variable <span class="var">lightY</span>: the Y position of the light of power that Thor must reach.
      <li>the variable <span class="var">initialTX</span>: the starting X position of Thor.
      <li>the variable <span class="var">initialTY</span>: the starting Y position of Thor.
  </ul>
  <p>At the end of the game turn, you must output the direction in which you want Thor to go among:<br>
  <div class="thor" style="display:inline-block;width:150px">
    <svg viewBox="0 0 100 100">
      ${this.getCompass([], 50, 50, 25).join("\n")}
    </svg>
  </div>
  <div style="display:inline-block;vertical-align:top">
    <span class="out">N</span> (North)<br>
    <span class="out">NE</span> (North-East)<br>
    <span class="out">E</span> (East)<br>
    <span class="out">SE</span> (South-East)<br>
    <span class="out">S</span> (South)<br>
    <span class="out">SW</span> (South-West)<br>
    <span class="out">W</span> (West)<br>
    <span class="out">NW</span> (North-West)
  </div>
  <p>Each movement makes Thor move by 1 cell in the chosen direction.
  `;

  input=`1 line with the coordinates of first the light, then Thor separated by a space character:
  <p><span class="var">lightX</span> <span class="var">lightY</span> <span class="var">initialTX</span> <span class="var">initialTY</span></p>
  <p><b>Example:</b> Light at (10,3), Thor at (15,5): <span class="console">10 3 15 5</span>
  <p>For every game turn, 1 line with the number of turns remaining <span class="var">remainingTurns</span>. This number can be ignored, but it MUST be read every turn.`;
  
  output=`The direction Thor should move - one direction per turn:
  <span class="out">N</span> 
    <span class="out">NE</span> 
    <span class="out">E</span> 
    <span class="out">SE</span>
    <span class="out">S</span>
    <span class="out">SW</span>
    <span class="out">W</span>
    <span class="out">NW</span>`;
}

CODE.GAMES.push(new Thor());