class Game {
  id = "gameID";
  title = "Titel";
  description = "Kurze Beschreibung";
  synopsis = "Spielewelt";
  successMessage = "Spielewelts-Erfolgsmeldung";
  codeTemplate = `// JS starting code here...
// output via console.log
let input = await readline();
console.log('second');
console.log('first');`;
  rules = "Anweisungen, wie das Spiel funktioniert<p>den Input 1:1 in den Output übergeben";
  input = "Was der Programmierer als Input erwarten kann<p>Ein String. Mit <span class='console'>await readline()</span> einlesen.";
  output = "Was der Programierer als Output produzieren soll<p>Der String, der als Input geliefert wurde - <span class='console'>console.log(input)</span>";
  skills = ["Read Input", "Write Output"];

  readlineSleep = 200;

  /**
   * the CODE.SKILLLEVEL level
   */
  skillLevel = 0;

  testcases = [{
    name: "Input 'first'",
    output: "first"
  }, {
    name: "Input 'second'",
    output: "second"
  }, {
    name: "Input '123'",
    output: "123"
  }, {
    name: "Random Input",
    output: Math.random() + ""
  }];

  releasetests = [{
    name: "first releasetest",
    output: "first"
  }, {
    name: "second releasetest",
    output:  Math.random() + ""
  }, {
    name: "third releasetest",
    output: "234§"
  }]

  // CSS file to load
  cssFile = "";


  /**
   * returns the desired input
   */
  readline = () => {
    return CODE.C.testcase.output;
  }

  /**
   * makes all preparations to run the chosen testcase
   */
  prepareTestcase = () => {
    // fetch the testcase
    //let testcase = CODE.C.testcase;
    this.outputs = [];
  }

  /**
   * Initializes the game with everything needed. Use updateGame for actually rendering the current state.
   * @param {HTMLElement} elPlayingfield the game HTML element for rendering the game output
   */
  initGameArea = (elPlayingfield) => {
    elPlayingfield.innerHTML = `<div>This is the game area!</div>
    <div id='field'></div>`;
  }

  /**
   * Updates the game area with the current state of things
   * @param {boolean} isNewTestcase true: this is a new testcase, some UI resetting might be necessary. #prepareTestcase has been called beforehand.
   */
  updateGameArea = (isNewTestcase) => {
    if (isNewTestcase) {
      this.outputs.push("You chose testcase " + CODE.C.chosenTestcase + " - " + CODE.C.testcase.name);
    }
    document.getElementById("field").innerHTML = this.outputs.join("<br>");
  }

  /**
   * Function that gets called as soon as a console.log (= written user input) gets called. do NOT put it to display!
   * @param {array} args the arguments that the user passed
   */
  consolelog = function (args) {
    this.outputs.push(args[0]);
    if (args[0] !== CODE.C.testcase.output)
      throw new Error("Expected output: '" + CODE.C.testcase.output + "', found '" + args[0] + "'.");
    CODE.success("Erfolgreich den Input '" + args[0] + "' an den Output weitergegeben!");
  }

  /**
   * called by the eval code after the user's code has terminated - no more user input to expect
   */
  end = function () {
    // since we only landed here if the user didn't type 'help', throw an error
    throw new Error("Expected output: '" + CODE.C.testcase.output + "' - not found");
  }
}

/**
* Creates SVG compass
* @param {array} svg array to fill with the individual svg lines
* @param {number} centerX center x-coordinate
* @param {number} centerY compass center y-coordinate
* @param {number} radius compass circle radius
* @returns {array} the svg array
*/
Game.prototype.getCompass = function (svg, centerX, centerY, radius) {
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
 * Throws an error if found !== expected
 * @param {*} found 
 * @param {*} expected 
 * @param {string} msg optional message to print
 */
Game.assertMatches = (found, expected, msg="") => {
  if (found !== expected){
    if (msg)
      msg += "<br>";
    throw new Error(msg + "<b>Found:</b><span class='console'>" + found + "</span> <p><b>Expected:</b><span class='console'>" + expected + '</span>');
  }
}

/**
 * Checks the input against the target, throws error if not matches. Increases this.currentLog!
 * @param {string} input user consolelog input, may have \n newlines
 * @param {array} target array with the target to meet for every line
 */
Game.prototype.checkInputAgainstTarget = function (input, target) {
  //console._log("checkInputAgainstTarget", input, target, this.currentLog);
  // special case: user may link the inputs via \n
  let inp = input.split('\n')

  inp.forEach(line => {
    // check: are we out of bounds (= do we have a new line when we don't want to have any?)
    if (this.currentLog >= target.length)
      Game.assertMatches('_more console lines_', 'nothing');

    // make sure the input line matches the expected line
    Game.assertMatches(line, target[this.currentLog]);

    this.currentLog++;


  })
}

/**
 * Implementation of the end() function for those games where an input must be checked line for line against a target array.
 * Depends on this.currentLog!
 * @param {array} target array with the target to meet for every line
 * @param {string} successMessage optional. Success message when everything was right
 */
Game.prototype.endCheckInputAgainstTarget = function(target, successMessage)  {
  //console._log("line: ", this.currentLog, "target: ", target );
  // we landed here because we processed all inputs.
  let sol = target;

  // check: did we get not enough input?
  if (!this.currentLog || this.currentLog < sol.length)
    this.assertMatches("nothing", sol[Math.max(this.currentLog, 0)]);

  // we have enough input. Finish!
  CODE.success(successMessage);
}