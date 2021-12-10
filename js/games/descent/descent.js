class Descent extends Game {
  title = "The Descent";
  description = "Destroy the mountains <span style='font-size:2rem'>▲</span> before your starship <img src='./js/games/descent/ufo.png' style='height:40px'> collides with one of them.";
  synopsis = `
  <p>“<b>Captain's log, stardate 1567.9</b>. We are entering the Deneb system two days after receiving a distress call issuing from the unexplored planet XIV of this system. Our mission is to bring aid to whomever is in need of our help on this planet.”
   
  <p>“<b>Captain's log, supplemental</b>. While reaching the planet, our rescue ship was drawn to a point on the surface by an invisible force that we have yet to understand. Despite all efforts, the ship continues its downward course and we are at great risk of colliding with the mountains that tower below us.”
   
  <p>“<b>Captain's log, supplemental</b>. In a final attempt, Scotty was able to re-engineer the phase cannons so that they can now destroy the mountains from their foundations. This gives us hope of landing safely on the planet. We are now looking for a crew member able to program the firing rate of the phase cannons to get us out safely from what clearly appears to be a trap designed to destroy us.”
  `;
  successMessage = "<p>You are now capable of landing your ship whenever there is enough height left to shoot all mountains. <p>Congratulations!</p><p style='font-size:0.8rem'>Hope and pray that it will always be enough to shoot only 1 mountain per turn...</p>";
  skillLevel = 1;
  skills = ["Loops"];
  cssFile = "./js/games/descent/descent.css";

  constructor() {
    super("descent");
  }

  testcases = [
    {
      name: "Descending Mountains",
      mountains: [9, 8, 7, 6, 5, 4, 3, 2],
      weaponStrength: 10,
      shipHeight: 10
    }, {
      name: "Ascending Mountains",
      mountains: [1, 3, 4, 5, 6, 7, 8, 9],
      weaponStrength: 10,
      shipHeight: 10
    }, {
      name: "Random Mountains",
      mountains: [8, 3, 9, 4, 6, 12, 8, 9],
      weaponStrength: 13,
      shipHeight: 13
    }, {
      name: "Doubletap",
      mountains: [8, 0, 7, 0, 5, 4, 3, 2],
      weaponStrength: 5,
      shipHeight: 10
    }, {
      name: "Random Doubletap",
      mountains: [8, 8, 9, 4, 6, 13, 3, 9],
      weaponStrength: 7,
      shipHeight: 14
    }
  ]

  releasetests = [
    {
      name: "Descending Mountains",
      mountains: [8, 7, 6, 5, 4, 3, 2, 1],
      weaponStrength: 10,
      shipHeight: 9
    }, {
      name: "Ascending Mountains",
      mountains: [1, 3, 5, 7, 8, 10, 12, 14],
      weaponStrength: 14,
      shipHeight: 15
    }, {
      name: "Random Mountains",
      mountains: [8, 3, 9, 4, 6, 12, 8, 9],
      weaponStrength: 13,
      shipHeight: 13
    }, {
      name: "Doubletap",
      mountains: [5, 2, 8, 0, 7, 0, 4, 3],
      weaponStrength: 2,
      shipHeight: 17
    }
  ]

  /**
   * index for readline
   */
  mountainIndex = 0;
  currentMountains = [];
  currentShipheight = -1;
  crashed = false;
  // keep track which direction our ship is moving
  isShipMoveEast = true;

  /**
   * Display info
   */
  ufoDisplay = {
    mountain: -1,
    isShipMoveEast: true,
    crashMountain: -1,
    animateTestcase: -1
  }

  prepareTestcase = () => {
    let tc = CODE.C.testcase;
    this.currentMountains = tc.mountains.map(m => m); // copy the mountains array!
    this.destroyedMountains = 0;
    this.currentShipheight = tc.shipHeight;
    this.crashed = false;
    this.isShipMoveEast = true;
    this.ufoDisplay = {
      shootMountain: -1,
      isShipMoveEast: true,
      crashMountain: -1,
      animateTestcase: CODE.C.chosenTestcase
    }
  }

  readline = () => {
    // return the eight mountains - over and over again
    let ret = this.currentMountains[this.mountainIndex++] + "";
    if (this.mountainIndex === 8)
      this.mountainIndex = 0;
    return ret;
  }

  consolelog = (args) => {
    let mountain = parseInt(args[0]),
      tc = CODE.C.testcase,
      destroyedMountains = 0;

    // catch bad input
    if ((!mountain && mountain !== 0) || mountain < 0 || mountain > 7) {
      throw new Error("Invalid mountain number '" + args[0] + "'");
    }

    this.ufoDisplay.isShipMoveEast = this.isShipMoveEast;
    this.ufoDisplay.shootMountain = mountain;

    // go through the mountains and see if we crash, shoot or pass
    for (let i = 0; i < 8; i++) {
      let index = this.isShipMoveEast ? i : 7 - i,
        mountainHeight = this.currentMountains[index];

      // determine crash
      if (mountainHeight >= this.currentShipheight) {
        this.ufoDisplay.crashMountain = index;
        throw new Error("Ship crashed against mountain " + index);
      }

      // shoot mountain?
      if (mountain === index) {
        mountainHeight = Math.max(mountainHeight - tc.weaponStrength, 0);
        this.currentMountains[index] = mountainHeight;
      }

      // count how many we have destroyed
      if (mountainHeight === 0)
        destroyedMountains++;
    }



    // descend the ship by 1 and change direction
    this.currentShipheight--;
    this.isShipMoveEast = !this.isShipMoveEast;


    // success: all mountains are levelled
    if (destroyedMountains === 8) {
      CODE.success("All mountains have been defeated. You can land safely.");
    }
  }

  initGameArea = (elPlayingfield) => {
    let svgHtml = ['<svg viewBox="0 0 800 400">'],
      textHtml = [];

    // mountains
    for (let i = 0; i < 8; i++) {
      let offset = (i * 100 + 50),
        transform = "translate(" + offset + ")";
      svgHtml.push('<polygon points="-50,400 0,55 50,400" transform="' + transform + '" id="mountain_' + i + '" class="mountain"/>');
      textHtml.push('<text x="' + offset + '" y="400" dx="-5" dy="-5" class="mountainLabel">' + i + '</text>')
    }
    // ground
    svgHtml.push('<rect x="0" y="370" width="800" height="30" class="ground"/>')

    // text
    svgHtml.push(textHtml.join(''));

    svgHtml.push('</svg>');

    // shot
    svgHtml.push('<div id="shot"></div>')

    // ship
    svgHtml.push('<div id="ufo"></div>');

    // crash
    svgHtml.push('<div id="crash"></div>');
    elPlayingfield.innerHTML = svgHtml.join("");
  }

  updateGameArea = (isNewTestcase) => {
    let elUfo = document.getElementById("ufo"),
      elShot = document.getElementById("shot"),
      elCrash = document.getElementById("crash"),
      tc = CODE.C.testcase,
      disp = this.ufoDisplay,
      // how many percent the left coordinate of the ufo is offset from a center at 0
      ufoOffset = -8.33,
      shootOffset = -2.9,
      crashOffset = -5.2,

      /**
       * 1 height unit in svg units
       * 
       * The playing field is 400 high, -30 ground -50 ship = 320
       * percent: heightUnit *100 / 800 = heightUnit / 8
       */
      heightUnit = 320 / tc.shipHeight,
      elShootMountain,
      shoot = disp.shootMountain,
      // we start shooting as soon as we touch the mountain
      shootDelay = (shoot) / 8,
      crash = disp.crashMountain,
      // give the crash half a mountain bonus
      crashDelay = (crash + 0.5) / 8;

    shootDelay = disp.isShipMoveEast ? shootDelay : (1 - shootDelay);
    crashDelay = disp.isShipMoveEast ? crashDelay : (1 - crashDelay);

    // initialize the mountains if necessary
    if (isNewTestcase) {
      tc.mountains.forEach((m, i) => {

        let elMountain = document.getElementById("mountain_" + i),
          // how much do we need to move the mountains downwards? field height - the mountainheight
          heightOffset = 320 - m * heightUnit;
        elMountain.style.transition = "none"; // stop transition for initial initing
        // set the new position
        elMountain.style.transform = "translate(" + (i * 100 + 50) + "px," + heightOffset + "px)";
        // turn on the trainsation again...
        elMountain.style.transition = ""; // basically: remove our style override
      });

      // fly the ufo to where it needs to start
      elUfo.className = "";
      elUfo.style.top = "";
      elUfo.style.left = "";

      // reset the shot
      elShot.className = "";
      elCrash.style.display = "";
      return;
    }

    elUfo.className = "ufoAnimation";

    // fly the ufo to where it needs to go
    let left = disp.isShipMoveEast ? 100 : 0,
      top = svgToPercent((tc.shipHeight - this.currentShipheight) * heightUnit, false),
      crashTransition = "";

    // in case of crash: stop at the crash!
    if (crash > -1) {
      // add half the mountain so that we are in the center of it when we crash!
      left = crash * 12.5 + 6.25;
      crashTransition = "left " + crashDelay + "s, top " + crashDelay + "s";
    }
    // add the ufo offset so that we are centered
    elUfo.style.left = (left + ufoOffset) + "%";
    elUfo.style.top = top + "%";
    elUfo.style.transition = crashTransition;
    elUfo.style.transitionTimingFunction = crash > -1 ? "linear" : "";

    // crash
    if (crash > -1) {
      elCrash.style.left = (left + crashOffset) + "%";
      elCrash.style.top = (top + 8) + "%";
      setTimeout(() => {
        // abort if we are done with our testcase...
        if (CODE.C.chosenTestcase !== disp.animateTestcase)
          return;
        elCrash.style.display = "block";
      }, crashDelay * 1000);
    }


    // shoot the mountain - but only if we haven't crashed beforehand...
    if (crash === -1 || crashDelay > shootDelay) {
      // shot
      console._log("left: ", shoot, shootOffset, (shoot * 12.5 + 6.25 + shootOffset));
      elShot.style.left = (shoot * 12.5 + 6.25 + shootOffset) + "%";
      elShot.style.top = elUfo.style.top; // start at ufo-height

      // wait until we have reached the mountain before shooting
      setTimeout(() => {
        // abort if we are done with our testcase...
        if (CODE.C.chosenTestcase !== disp.animateTestcase)
          return;
        elShot.className = "shootAnimation";
        elShot.style.top = svgToPercent((tc.shipHeight + 1 - this.currentMountains[shoot]) * heightUnit, false) + "%";

        // wait until we have finished shooting
        setTimeout(() => {
          // abort if we are done with our testcase...
          if (CODE.C.chosenTestcase !== disp.animateTestcase)
            return;
          // make shot invisible
          elShot.className = "";

          // mountain itself
          elShootMountain = document.getElementById("mountain_" + shoot);
          let x = (shoot * 100 + 50),
            y = (320 - this.currentMountains[shoot] * heightUnit);
          elShootMountain.style.transform = "translate(" + x + "px," + y + "px)";
        }, 500); // animation duration
      }, shootDelay * 1000);






    }
    console._log("Shoot " + shoot + ", height: " + this.currentMountains[shoot], "ufo height", this.currentShipheight);

  }

  rules = `
  <p>At the start of each game turn, you are given the height of the 8 mountains from left to right.
  By the end of the game turn, you must fire on the highest mountain by outputting its index (from 0 to 7).
  
  <p>Firing on a mountain will only destroy part of it, reducing its height. Your ship descends after each pass.  
  <p>Within an infinite loop, read the heights of the mountains from the standard input and print to the standard output the index of the mountain to shoot.`;
  input = `For every game turn: <p><span class="num">8</span> lines: one integer <span class="var">mountainH</span> per line. Each represents the height of one mountain given in the order of their index (from 0 to 7).
  <p>Constraints: 0 &leq; <span class="var">mountainH</span> &leq; 9`
  output = `For every game turn: <p>A single line with one integer for the index of which mountain to shoot.`
  codeTemplate = `/**
* The while loop represents the game.
* Each iteration represents a turn of the game
* where you are given inputs (the heights of the mountains)
* and where you have to print an output (the index of the mountain to fire on)
* The inputs you are given are automatically updated according to your last actions.
**/


// game loop
while (true) {
  for (let i = 0; i < 8; i++) {
    // represents the height of one mountain.
    const mountainH = parseInt(await readline()); 
  }

  // Write an action using console.log()
  // To debug: console.debug('Debug messages...');

  console.log('4'); // The index of the mountain to fire on.

}`
}

/**
 * converts the svg pixel number to percent (total svg dimensions: 800x400)
 * @param {number} svg svg pixel number
 * @param {boolean} isHorizontal horizontal or vertical percentage
 */
function svgToPercent(svg, isHorizontal) {
  return svg / (isHorizontal ? 8 : 4);
}
CODE.GAMES.add(new Descent());