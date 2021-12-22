/**
 * HTML game: user programs html instead of js. Uses UiTestCases to check whether right or wrong
 */
/*eslint-disable-next-line no-unused-vars*/
class HTMLGame extends Game {
  type="html";
  // CSS file to load
  cssFile = "./js/games/simpleui/simpleui.css";

  /**
   * es wird kein Input eingelesen
   */
  readline = () => {
    throw new Error("In diesem Spiel wird kein Input vorgegeben!");
  }

  /**
   * Initializes the game with everything needed. Use updateGame for actually rendering the current state.
   * @param {HTMLElement} elPlayingfield the game HTML element for rendering the game output
   */
  initGameArea = (elPlayingfield) => {
    elPlayingfield.innerHTML = `
    <div id='uiTarget' class='taschenrechner'>Hier kommt der Taschenrechner</div>
    <div id='jarvis'></div>`;
    this.elRoot = document.getElementById("uiTarget");

  }



  /**
   * Updates the game area with the current state of things
   * @param {boolean} isNewTestcase true: this is a new testcase, some UI resetting might be necessary. #prepareTestcase has been called beforehand.
   */
  updateGameArea = (isNewTestcase) => {
    if (isNewTestcase) {
      // remove the jarvis response
      document.getElementById("jarvis").innerHTML = "";
      this.elRoot.innerHTML = "";
    }
  }

  /**
   * Function that gets called as soon as a console.log (= written user input) gets called. do NOT put it to display!
   * @param {array} args the arguments that the user passed
   */
  consolelog = function (/*args*/) {
    // we have no console.log outputs...
  }

  /**
   * called by the eval code after the user's code has terminated - no more user input to expect
   * 
   * We need to check the testcase validity here!
   */
  end = function () {
    let tc = CODE.C.testcase,
      elJarvis = document.getElementById("jarvis"),
      elTarget;

    try {
      // Check: does target element exist?
      if (tc.targetElementQuerySelector) {
        elTarget = this.elRoot.querySelectorAll(tc.targetElementQuerySelector);
        if (!elTarget.length) {
          throw new Error(`Kein Element mit CSS-Selektor "${tc.targetElementQuerySelector}" vorhanden. 
          <br>CSS Selektoren:
          <ul>
            <li><b>"#abc"</b>: sucht Element mit id="abc"
            <li><b>".abc"</b>: sucht Element das das Attribut class="abc" hat
            <li><b>"abc"</b>: sucht Element &lt;abc&gt;
          </ul>`);
        }
      }

      // call the sourcecode validation function

      // in case of a single match, return only that.
      if (elTarget && elTarget.length === 1)
        elTarget = elTarget[0];

      // if we have a validation function, do it now.
      if (tc.validationFunction)
        tc.validationFunction(elTarget);
    } catch (e) {
      // error case: let jarvis inform
      elJarvis.innerHTML = tc.jarvisFailure;
      throw e;
    }

    // success!
    elJarvis.innerHTML = tc.jarvisSuccess? tc.jarvisSuccess: "Ah, das ist aber schön.";
    CODE.success("Testcase " + tc.name + " erfolgreich bestanden!");
  }

} // END class HTMLGame

/*eslint-disable-next-line no-unused-vars*/
class UiTestCase {

  targetElementQuerySelector = "";

  /**
   * 
   * @param {string} name name of testcase
   * @param {string} targetElementQuerySelector CSS selector for the target element(s)
   * @param {string} jarvisFailure text Jarvis speaks in case the testcase fails
   * @param {(elTarget:HTMLElement|NodeList) => void} validationFunction Input: either a single HTML element if the targetElementQuerySelector
   * returns only 1, or the entire nodelist
   */
  constructor(name, targetElementQuerySelector, jarvisFailure = "", validationFunction = () => { }, jarvisSuccess = "") {
    this.name = name;
    this.targetElementQuerySelector = targetElementQuerySelector;
    this.jarvisFailure = jarvisFailure;
    this.validationFunction = validationFunction;
    this.jarvisSuccess = jarvisSuccess
  }
}
