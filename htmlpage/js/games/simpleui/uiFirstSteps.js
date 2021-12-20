class TaschenrechnerJarvis extends Game {
  id = "taschenrechnerJarvis";
  title = "Taschenrechner für JARVIS";
  description = "Erste Schritte in HTML DOM-Tree Manipulation am Beispiel eines simplen Taschenrechners der nur addieren kann";
  synopsis = `JARVIS - Just a Rather Very Intelligent System - hat sich einen Virus eingefangen.
    Er konnte den Virus zwar dank seiner Anti-Viren-Programme besiegen, aber nicht ohne Folgen.
    JARVIS's Fähigkeit zu addieren wurde dadurch so beschädigt, dass JARVIS sich nicht mehr auf seine eigenen
    Ergebnisse verlassen kann.
    <p>Und addieren zu können ist wichtig, vor allem für eine KI.
    <p>Normalerweise würde JARVIS nun seinen Schöpfer Tony Stark um Hilfe bitten, aber Tony wird schon seit
      5 Wochen in Afghanistan vermisst. Und niemand sonst hat Zugang zu JARVIS's Sourcecode um ihn zu reparieren.
    <p>Als Very Intelligent System hat JARVIS sich nun eigenständig auf die Suche gemacht.
      Er kann nämlich immer noch im Web surfen und Webseiten bedienen, und auch Leuten Emails schreiben.
      So hast du ihn kennen gelernt und von seinem Problem erfahren.
    <p>Hilf JARVIS, indem du ihm eine Webseite programmierst, die die Addition für ihn übernimmt!
  `;
  successMessage = "JARVIS bedankt sich ganz herzlich bei dir und frägt ob er sich bei Bedarf wieder an dich wenden dürfte.";
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

// Hier musst du jetzt die Elemente erstellen!

// erstes Input-Feld
// const elInput1 = document.createElement("input");
// elInput1.id="ersterSummand";
// elInput1.type="text";

// zweites Input-Feld
// const elRow2 = document.createElement("div");
// elRow2.className = "row";
// elRow2.innerHTML = '<div class="label">Zweiter Summand</div>'
//    + '<input type="text">'
//    + '</div>';

// Submit-Button
// const button = document.createElement("button");
// button.onclick = function(){ calc() };

// Ergebnis
// const elErgebnis = document.createElement("div");

/**
 * This function reads the two text inputs, calculates the sum, and
 * writes the result to the page.
 */
window.calc = function(){
  try{
    let ersterSummand = document.getElementById("ersterSummand");
    let wertErsterSummand = ersterSummand.value;

    alert("Erster Summand ist " + wertErsterSummand);
    
    // TODO 
    // - zweiten Summand einlesen
    // - Ergebnis schreiben
    // Hinweise: wertErsterSummand = parseInt(asdf) versucht den Inhalt
    // der Variable asdf in eine ganze Zahl umzuwandeln
  } catch(e) {
    // error happened: tell the user
    // use alert only for debugging, never for actual production
    // code - because it is annoying and has some side effects
    // that you do not want in live code...
    alert(
      "Es ist ein Fehler aufgetreten: " + e 
    );
  }
}

`;
  rules = `
    <p>
  `;
  input = `Zu erstellende HTML-Elemente:
  <ol>
    <li>Überschrift</li>
    <li>Zwei Input-Felder, in denen der User Text eingeben kann
    <li>Einen Ergebnis-Bereich, der die ID 'ergebnis' hat
    <li>Einen Submit-Button, der bei Click die Input-Werte summiert und in den Ergebnis-Bereich schreibt
    <li>Etwas CSS Styling damit es besser aussieht
  </ol>`;
  output = `
  Ein kleines Eingabeformular, das die Summe zweier Werte berechnet. Es sollte am Ende in etwa so aussehen:
  <div class="taschenrechner" id="demo">
    <h1>Taschenrechner für JARVIS</h1>
    <div class="row">
      <div class="label">
        Erster Summand
      </div>
      <input type="text" >
    </div>
    <div class="row">
      <div class="label">
        zweiter Summand
      </div>
      <input type="text">
    </div>
    <button class="btn" onclick="let elRoot=document.getElementById('demo'), in1=parseInt(elRoot.querySelector('input').value),in2=parseInt(elRoot.querySelectorAll('input')[1].value); elRoot.querySelector('#demo_result').innerHTML=in1+in2;">
      Submit
    </button>
    <div class="row">
      <div class="label">
        Ergebnis
      </div>
      <div id="demo_result">-</div>
    </div>
  </div>
  `;
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
        Game.assertMatches(elTarget.innerHTML.trim(), "Taschenrechner für JARVIS", "Falscher Text");
      }
    ),
    new UiTestCase(
      "Zwei Inputs",
      "input",
      "Ich dachte, dass ich zwei Eingabefelder erhalte, in denen ich meine zwei Zahlen eingeben könnte...",
      (inputs) => {
        // 2 inputs
        Game.assertMatches(inputs.length, 2, "Es werden genau 2 &lt;input&gt; Elemente erwartet.");

        // pro Input: richtigen Typ, dass sie eine ID haben
        for (let i = 0; i < inputs.length; i++) {
          let elInput = inputs[i];
          Game.assertMatches(elInput.type, "text", "Der Input muss vom type='text' sein.");
          if (!elInput.id) {
            throw new Error("Deine Inputs brauchen eine id, damit du sie später für die Berechnung wieder findest!");
          }
        }

      }
    ),
    new UiTestCase(
      "Ergebnisort",
      "#ergebnis",
      "Und wo sehe ich, was mein Ergebnis ist?",
      (elTarget) => {
        // das Feld kann div oder p sein, aber nichts sonst
        if ("DIV" !== elTarget.tagName && "P" !== elTarget.tagName) {
          throw new Error("Ein Ergebnis sollte nur in einem vom User nicht editierbaren Tag stehen wie &lt;div&gt; oder &lt;p&gt;");
        }
      }
    ),
    new UiTestCase(
      "Submit-Button",
      "button",
      "Und wo ist der Submit-Button mit dem ich sagen kann, dass ich jetzt gern addieren möchte?",
      (elButton) => {
        let clickFunction = elButton.onclick;

        // Submit text
        Game.assertMatches(elButton.innerHTML.trim(), "Submit", "Der Button muss den Text 'Submit' haben.");

        // check: hat der Button einen Clickhandler?
        Game.assertMatches(typeof clickFunction, 'function', "Der Button braucht eine Funktion für das onclick-Event!");
      }
    ),
    new UiTestCase(
      "2 + 3 = 6",
      "button",
      "Meine Additier-Funktion sagt, dass 2 + 3 = 6 ist - was sagt deine?",
      (elButton) => {
        let clickFunction = elButton.onclick,
          elResult = this.elRoot.querySelector("#ergebnis"),
          result ,
          elInputs = this.elRoot.querySelectorAll("input");

        // wir wissen von den vergangenen Testcases dass wir genau 2 Inputs haben!
        elInputs[0].value = 2;
        elInputs[1].value = 3;

        // Click auf Submit
        clickFunction();

        result = elResult.innerHTML.trim(); // whitespace rauskürzen...

        // steht danach auch das richtige drin?
        switch (result) {
          case "23":
            throw new Error("Du hast vergessen, die Input-Werte 2 und 3 in eine Zahl umzuwandeln vor dem Addieren!");
          case "":
            throw new Error("Das Ergebnis sollte im Tag mit id='result' ausgegeben werden.");

          default:
            // was auch immer sonst als Output kommt: es muss 5 sein
            Game.assertMatches(result, "5", "Sicher, dass deine Addier-Funktion nicht vom selben Virus wie JARVIS befallen ist?")
        }
      }
    ),
    new UiTestCase(
      "Schönheit"
    )
  ];

  releasetests = []

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
          throw new Error(`Kein Element mit CSS-Selektor "${tc.targetElementQuerySelector }" vorhanden. 
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
    elJarvis.innerHTML = "Ah, das ist aber schön.";
    CODE.success("Testcase " + tc.name + " erfolgreich bestanden!");
  }

} // END class TaschenrechnerJarvis

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
  constructor(name, targetElementQuerySelector, jarvisFailure = "", validationFunction = () => { }) {
    this.name = name;
    this.targetElementQuerySelector = targetElementQuerySelector;
    this.jarvisFailure = jarvisFailure;
    this.validationFunction = validationFunction;
  }
}
CODE.GAMES.add(new TaschenrechnerJarvis());