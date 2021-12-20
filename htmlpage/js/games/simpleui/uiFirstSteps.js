class UiFirstSteps extends Game {
  id = "uiFirstSteps";
  title = "Taschenrechner für JARVIS";
  description = "Erste Schritte in HTML DOM-Tree Manipulation am Beispiel eines simplen Taschenrechners der nur addieren kann";
  synopsis = `JARVIS - Just a Rather Very Intelligent System - hat sich einen Virus eingefangen.
    Er konnte den Virus zwar dank seiner Anti-Viren-Programme besiegen, aber nicht ohne Folgen.
    JARVIS's Fähigkeit zu additieren wurde dadurch so beschädigt, dass JARVIS sich nicht mehr auf seine eigenen
    Ergebnisse verlassen kann.
    <p>Und additieren zu können ist wichtig, vor allem für eine KI.
    <p>Normalerweise würde JARVIS nun seinen Schöpfer Tony Stark um Hilfe bitten, aber Tony wird schon seit
      5 Wochen in Afghanistan vermisst. Und niemand sonst hat Zugang zu JARVIS's Sourcecode um ihn zu reparieren.
    <p>Als Very Intelligent System hat JARVIS sich nun eigenständig auf die Suche gemacht.
      Er kann nämlich immer noch im Web surfen und auch Webseiten bedienen, und auch Leuten Emails schreiben.
      So hast du ihn kennen gelernt und von seinem Problem erfahren.
    <p>Hilf JARVIS, indem du ihm eine Webseite programmierst, die die Addition für ihn übernimmt!
  `;
  successMessage = "Spielewelts-Erfolgsmeldung";
  codeTemplate = `/**
* JS Code hier
*
* Es wird nicht erwartet, dass Inputs mit await readline() eingelesen
* werden, sondern dass HTML-Elemente generiert werden.
*
* Verwende das elRoot-Element um dort den DOM-Tree aufzubauen.
*
* Die Testcases sagen dir, ob du alles korrekt erstellt hast.
*/

// Wurzel-Element, innerhalb von dem der Code geschrieben werden soll
const elRoot = document.getElementById("uiTarget");

// Überschrift erstellen
const elHeader = document.createElement("h1");
elHeader.innerHTML = "Meine Überschrift!"; // TODO: richtiger Text
elRoot.append(elHeader);

// Hier musst du jetzt die Elemente erstellen!`;
  rules = `
    <p>
  `;
  input = "Was der Programmierer als Input erwarten kann<p>Ein String. Mit <span class='console'>await readline()</span> einlesen.";
  output = "Was der Programierer als Output produzieren soll<p>Der String, der als Input geliefert wurde - <span class='console'>console.log(input)</span>";
  skills = ["HTML DOM", "Buttons"];


  /**
   * the CODE.SKILLLEVEL level
   */
  skillLevel = 1;

  testcases = [
    new UiTestCase(
      "Überschrift",
      "h1",
      "Ist das wirklich eine Seite für mich? Ich habe eine Überschrift 'Taschenrechner für JARVIS' erwartet!",
      (elTarget) => {
        Game.assertMatches(elTarget.innerHTML, "Taschenrechner für JARVIS", "Falscher Text");
      }
    ), {
    name: "Input 'second'",
    output: "second"
  }, {
    name: "Input '123'",
    output: "123"
  }, {
    name: "Random Input",
    output: Math.random() + ""
  }];

  releasetests = []

  // CSS file to load
  cssFile = "";


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
    <div id='uiTarget'>Hier kommt der Taschenrechner</div>
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

    // Check: does target element exist?
    if (tc.targetElementQuerySelector) {
      elTarget = this.elRoot.querySelector(tc.targetElementQuerySelector);
      if (!elTarget) {
        elJarvis.innerHTML = tc.jarvisFailure;
        throw new Error("Kein Element " + tc.targetElementQuerySelector + " vorhanden.");
      }
    }

    // call the sourcecode validation function
    try{
      tc.validationFunction(elTarget);
    }catch(e){
      // error case: let jarvis inform
      elJarvis.innerHTML = tc.jarvisFailure;
      throw e;
    }

    CODE.success("Testcase " + tc.name + " erfolgreich bestanden!");
  }

} // END class UiFirstSteps

class UiTestCase {

  targetElementQuerySelector = "";

  constructor(name, targetElementQuerySelector, jarvisFailure = "", validationFunction = () =>{}) {
    this.name = name;
    this.targetElementQuerySelector = targetElementQuerySelector;
    this.jarvisFailure = jarvisFailure;
    this.validationFunction = validationFunction;
  }
}
CODE.GAMES.add(new UiFirstSteps());