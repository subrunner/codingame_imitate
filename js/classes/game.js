class Game {

  title = "Titel";
  description = "Kurze Beschreibung";
  synopsis = "Spielewelt";
  successMessage = "Spielewelts-Erfolgsmeldung";
  codeTemplate = "// JS starting code here...\n// output via console.log\nconsole.log(await readline());\nconsole.log('help')";
  rules = "Anweisungen, wie das Spiel funktioniert<p>den Input 1:1 in den Output übergeben";
  input = "Was der Programmierer als Input erwarten kann<p>Ein String. Mit <span class='console'>await readline()</span> einlesen.";
  output = "Was der Programierer als Output produzieren soll<p>Der String, der als Input geliefert wurde - <span class='console'>console.log(input)</span>";


  testcases = [{
    name: "first testcase",
    output: "first"
  }, {
    name: "second testcase",
    output: "second"
  }];

  releasetests = [{
    name: "first releasetest",
    output: "hello!"
  }, {
    name: "second releasetest",
    output: "second"
  }, {
    name: "third releasetest",
    output: "234§"
  }]

  // CSS file to load
  cssFile = "";


  currentTurn = -1;

  constructor(id) {
    this.id = id;
  }

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
    let testcase = CODE.C.testcase;
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
    if (args[0] === CODE.C.testcase.output)
      CODE.success("Ihr Auftrag war erfolgreich!");
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