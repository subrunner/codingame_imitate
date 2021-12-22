class TaschenrechnerJarvis extends HTMLGame {
  id = "taschenrechnerJarvis";
  title = "Taschenrechner für JARVIS";
  description = "Baue JARVIS eine Webseite mit einem simplen Taschenrechners der nur addieren kann";
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
  successMessage = "<b>JARVIS:</b> <br>Vielen herzlichen Dank für deine Hilfe! Jetzt kann ich zumindest die Ergebnisse überprüfen, bei denen ich mir nicht sicher bin. Wenn es wieder mal was geben sollte, werde ich mich an dich wenden!";
  codeTemplate = `<!DOCTYPE html>
<html>
<head>
</head>
<body>
  
  <!-- Überschrift -->
  <h1>Meine Überschrift</h1>
  
  <!-- Erster Summand -->
  Erstens:
  <input id="in1" type="text">
  
  <!-- zweiter Summand -->
  Zweitens:
  <input>
  
  <!-- Submit-Button -->
  <!--<button id="submit">los gehts</button>-->
  
  <!-- Ergebnis -->
  <div>__Hier kommt die Ausgabe rein__</div>
      
  <!-- 
      JavaScript Code - am Ende einfügen damit die HTML-Element
      bereits existieren
  -->
  <script type="text/javascript">
    // make the button clickable
    var elButton = document.getElementById("submit");
    elButton.onclick = function (){
      console.debug("Submitbutton clicked");

      // use try-catch to intercept any programming errors you might
      // cause, so that you know where you went wrong
      try{
        // fetch the input values
        let elIn1 = document.getElementById("in1"),
          in1 = elIn1.value,
          in2 = 3;

        // write it to the Ergebnis section
        document.getElementById( "ergebnis" ).innerHTML = in1 + in2;
      } catch( error ){
        // make the error visible
        console.error( "Submit error: " + error );
      }
    }
  </script>
</body>
</html>
`;
  rules = `
    <p>Aufgabe ist es, mit Hilfe von Javascript ein kleines HTML-Formular zu erstellen, bei dem der User 2 Zahlen
      eingeben kann, die danach addiert werden. Im Bereich <b>Input</b> ist beschrieben, was in welcher Reihenfolge
      zu erledigen ist, <b>Output</b> gibt dir ein Beispiel wie der fertige Taschenrechner aussehen könnte.
    <p>Begriffe:
    <ul>
      <li><b>(HTML-)Tag, (HTML-)Element:</b> Grundbausteine, aus denen eine HTML-Seite besteht. Beispiele: &lt;div&gt;, &lt;p&gt;,...
        <br>Elemente bestehen meist aus einem öffnenden Tag wie , Inhalt, und einem schließenden Tag.
        Ein div-Tag könnte als so aussehen: <span class="num">&lt;div&gt;Hier ist mein Text im div &lt;/div&gt;</span>
        <br>Tags können auch geschachtelt werden: <span class="num"><br>
        &lt;div&gt;<br>
          &nbsp;&nbsp;&lt;p&gt;Hier ist mein erster Absatz im div &lt;/p&gt;<br>
          &nbsp;&nbsp;&lt;p&gt;Hier ist mein zweiter Absatz im div &lt;/p&gt;<br>
        &lt;/div&gt;
        </span>
      <li><b>(HTML-)Attribut:</b> Weitere Informationen, die zu einem HTML-Element gespeichert werden. 
        <br>Es gibt Attribute, die jedes Element haben kann wie <span class="num">id</span> 
        (um es schnell wieder zu finden) oder <span class="num">class</span>
        (um das Element mit CSS zu stylen). 
        <br>Manche Elemente haben auch für sie spezielle Attribute. Das Link-Tag 'a' speichert in href die URL, auf
          die der Link zeigt. Das Eingabefeld 'input' wird mit type="text" zum Textfeld, und mit value="abc" mit
          einem Wert vorbefüllt.
        <br>Beispiel:<span class="num"><br>
        &lt;div id="tagesschauLink" class="row"&gt;<br>
          &nbsp;&nbsp;&lt;p&gt;Hier gehts zur &lt;a href="https://www.tagesschau.de"&gt;Tagesschau&lt;/a&gt; &lt;/p&gt;<br>
          &nbsp;&nbsp;&lt;div&gt;Robo-Check - bitte "12345" eingben:&lt;input type="text" value="Robo-Check"&gt;&lt;/div&gt;<br>
        &lt;/div&gt;
        </span>
      <li><b>DOM-Tree:</b> der Hierarchie-Baum, der entsteht wenn alle HTML-Elemente in einer Seite fertig geschachtelt
        sind. Dank Javascript kann eine Seite auch HTML-Elemente haben, die nicht im DOM-Tree drin sind - die
        werden auch nicht angezeigt.
      <li><b>CSS:</b> Cascading Style Sheet - Anweisungen, die das Aussehen von HTML-Elementen steuern. Soll der Text
        fett sein, welchen Abstand hat der Inhalt zum Rand des Elements (padding), welchen Abstand hat das Element 
        zu anderen Elementen, und viel mehr.
      <li><b>Events / Handlers</b>: Events sind Ereignisse, die auf der Webseite stattfinden - meist
        Aktionen, die ein User ausführt. Mit Javascript kann man sagen, dass
        man von einem bestimmten Event benachrichtigt werden will. Die Funktion, die dann bei diesem Event ausgelöst wird, 
        nennt man Handler.
        <br>Bestes Beispiel: Click-Event. Der Click auf einen Button löst ein Click-Event aus. Mit
        <span class="num">elButton.onclick = function(){console.debug("Button clicked!");}</span> fängt man
        das Click-Event ab. Die Funktion mit dem console.debug nennt man dann den Click-Handler.
    </ul>

    <p>Du kannst eine HTML-Seite direkt als Text-Datei schreiben, unter MyPage.html speichern, und bei dir im Browser
      anschauen. Genau so wie ein Word-Dokument. 
      <br>Das ist aber eine sehr langweilige Angelegenheit, weil du maximal auf andere Abschnitte in der Seite
      oder auf andere Seiten verlinken kannst.
    <p>Damit das ganze dynamisch wird und auf User-Aktionen reagieren kann, kann man die HTML-Seite mit Javascript 
      manipulieren. Auf diese Weise ist auch
      codingame gemacht worden, und so wirst du auch dieses Spiel meistern müssen.
    <p>
    <ul>
      <li><b>Element suchen</b>: <span class="num">let elAsdf = document.getElementById("asdf");</span> 
        Sucht das Element mit der ID 'asdf', und speichert es in Variable 'elAsdf' zur weiteren Verarbeitung.
      <li><b>Neues Element erstellen</b>: <span class="num">let elNew = document.createElement("div");</span>
        erstellt ein neues div-Element - aber fügt es noch nicht
        in den DOM-Tree ein! Das passiert mit
      <li><b>Element in den DOM-Tree einfügen</b>: <span class="num">elAsdf.append(elNew);</span> fügt das elNew Element in das elAsdf-Element ein, ganz am Schluss
      <li><b>Attribute setzen:</b> <span class="num">elNew.id="neuesDiv";</span> oder 
        <span class="num">elLink.href="www.tagesschau.de";</span>, etc.
      <li><b>Inhalt von Element setzen:</b> <span class="num">elNew.innerHTML="Mein Textinhalt";</span> wird zu 
        <span class="num">&lt;div&gt;Mein Textinhalt&lt;/div&gt;</span>. 
        <br>So können übrigens auch ganze HTML-Blöcke
        eingefügt werden ohne bei jedem Element lästig das document.create Prozedere durchlaufen zu müssen.
        <br><span class="num">elNew.innerHHTML='&lt;div class="row"&gt;Mein Textinhalt&lt;/div&gt;&lt;a href="https://www.tagesschau.de"&gt;Tagesschau&lt;/a&gt;';</span>
        <br> wird zu
        <span class="num"><br>
        &lt;div id="neuesDiv"&gt;<br>
          &nbsp;&nbsp;&lt;div class="row"&gt;Mein Textinhalt&lt;/div&gt;<br>
          &nbsp;&nbsp;&lt;a href="https://www.tagesschau.de"&gt;Tagesschau&lt;/a&gt;<br>
        &lt;/div&gt;
        </span>
      <li><b>Anschauen, wie das Element im DOM-Tree aussieht</b>: Rechtsklick auf das HTML-Element - "Element Unersuchen"
        oder "Inspect" oder "Inspect Element"
        öffnet die Developer-Tools mit einer genauen Darstellung wie das Ganze aussieht. Dort wird auch angezeigt,
        welche Styles auf dieses Element angewendet werden dank der CSS-Klassen die dem Element zugeordnet sind
      <li><b>Attribute auslesen:</b> <span class="num">let eingabewert = elInput.value;</span> liest den
        gegenwärtigen Wert des Eingabefeldes elInput aus.
      
    </ul>
  `;
  input = `Zu erstellende HTML-Elemente:
  <ol>
    <li>Überschrift</li>
    <li>Zwei Input-Felder, in denen der User Text eingeben kann
    <li>Einen Submit-Button
    <li>Einen Ergebnis-Bereich, der die ID 'ergebnis' hat
    <li>Eine Funktion, die die Input-Werte ausliest (Annahme: es handelt sich um ganze Zahlen)
      und dann in das Ergebnis schreibt
    <li>Submit-Button soll bei Click die Summier-Funktion aufrufen
    <li>Etwas CSS Styling damit es besser aussieht
  </ol>
  <p>Die einzelnen Testcases leiten dich durch diese Liste und helfen dir dabei, was gerade gefordert ist.`;
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
  skillLevel = 2;

  testcases = [
    new UiTestCase(
      "Überschrift",
      "h1",
      "Ist das wirklich eine Seite für mich? Ich habe eine Überschrift 'Taschenrechner für JARVIS' erwartet!",
      (elTarget) => {
        Game.assertMatches(elTarget.innerHTML.trim(), "Taschenrechner für JARVIS", "Falscher Text");
      },
      "Ah, eine Überschrift. Herzlichen Glückwunsch zu deinen ersten HTML-Programmierungsschritten!"
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

      },
      "Textfelder sind das Brot und Butter von Webformularen. Zur Not kannst du alle User-Eingaben mit ihnen bestreiten."
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
      },
      "Dank der id ist das Ergebnis gut zu finden!"
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
      },
      "Ach ja, hätte ich fast vergessen - ich muss natürlich dem Taschenrechner sagen können dass ich so weit bin!"
    ),
    new UiTestCase(
      "2 + 3 = 6",
      "button",
      "Meine Addier-Funktion sagt, dass 2 + 3 = 6 ist - was sagt deine?",
      (elButton) => {
        let clickFunction = elButton.onclick,
          elResult = this.elRoot.querySelector("#ergebnis"),
          result,
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
            throw new Error(`Du hast vergessen, die Input-Werte 2 und 3 in eine Zahl umzuwandeln vor 
              dem Addieren! Das kann man mit 
              <br>let num = parseInt("3");
              <br> machen.`);
          case "":
            throw new Error("Das Ergebnis sollte im Tag mit id='ergebnis' ausgegeben werden.");

          default:
            // was auch immer sonst als Output kommt: es muss 5 sein
            Game.assertMatches(result, "5", "Sicher, dass deine Addier-Funktion nicht vom selben Virus wie JARVIS befallen ist?")
        }
      },
      "Oh, meine Addier-Funktion sagt dass 2 + 3 = 6 ist. Ich hoffe ich kann deiner Berechnung vertrauen..."
    ),
    new UiTestCase(
      "-30 + 128 = ?",
      "button",
      "Ich möchte bitte auch zuverlässig mit negativen Zahlen rechnen können.",
      (elButton) => {
        this._checkCalculation(
          elButton,
          "-30",
          "128",
          "98",
          "Sicher, dass deine Addier-Funktion nicht vom selben Virus wie JARVIS befallen ist?"
        );
      },
      "Mit negativen Zahlen rechnen zu können ist immer gut!"
    ),
    new UiTestCase(
      "DAU I: Nachkommastellen ignorieren",
      "button",
      `Meine Floating Point Arithmetrik ist nicht von dem Bug befallen - ich weiß dass 3.5 + 2.6 = 6.1 ist. 
       Ich würde nie so einen Unfug in einen Taschenrechner für ganze Zahlen eingeben. Aber du musst für den
       Dümmsten Anzunehmenden User gewappnet sein und ihm eine Lektion erteilen indem du eiskalt 5 ausgibst!`,
      (elButton) => {
        this._checkCalculation(
          elButton,
          "3,5",
          "2.6",
          "5",
          "Nachkommastellen sollen ignoriert werden. Damit wird 3,5 zu 3 und 2.5 zu 2, also 3+2=5"
        );
      },
      `DAU steht für den Dümmsten Anzunehmenden User. Ich bin so etwas natürlich nicht, aber wenn du eine 
      Webseite erstellst solltest du Pläne für alle nur erdenklichen Fälle haben.
      <p>Ach ja, Fun Fact: die parseInt()-Funktion liest den Text Zeichen für Zeichen ein. 
      Bei dem ersten Nicht-Zahl-Zeichen macht sie halt und deklariert den ersten Teil als die Zahl.
      Du hättest also genau so gut "3 Tassen" und "2 Socken" addieren können, und es wäre das selbe rausgekommen.`
    ),
    new UiTestCase(
      "DAU II: Text",
      "button",
      `Ich will dir nur helfen, und dich auf den Dümmsten aller dümmsten User vorbereiten. Und solche User
      verdienen es nicht anders als NaN zu bekommen!`,
      (elButton) => {
        this._checkCalculation(
          elButton,
          "asdf",
          "5",
          "NaN",
          "Text kann nicht in einen Integer umgewandelt werden. Sobald einer der Inputs Text enthält, sollte 'NaN' (Not a Number) als Ergebnis kommen!"
        );

      },
      `Nachdem es sich bei deinen Eingabefeldern um Textfelder handelt, kann hier auch alles mögliche andere
      als Zahlen eingegeben werden. Mit reinem Text kommt die parseInt()-Funktion natürlich nicht zurecht und 
      liefert den Wert 'NaN' zurück. Egal wie man mit 'NaN' rechnet, es kommt immer 'NaN' zurück.
      <p>Geübte Webentwickler schreiben hier natürlich nicht 'NaN' in das Ergebnis rein, sondern machen
      den User darauf aufmerksam, welches der Eingabefelder einen ungültigen Wert hat. Aber da ich ja genau
      weiß was ich reinschreiben darf, darf der DAU gerne auf dem Schlauch stehen und selber suchen wo er einen
      Fehler gemacht hat.`
    ),
    new UiTestCase(
      "Beschriftung Inputs",
      "input",
      "Wo muss ich was eingeben? Und wo sehe ich das Ergebnis?",
      (inputs) => {

        // first input: text of parent element should contain "Erster Summand"
        if (inputs[0].parentElement.textContent.indexOf("Erster Summand") === -1) {
          throw new Error("Das erste Textfeld sollte mit 'Erster Summand' beschriftet werden.");
        }

        // second input: text of parent element should contain "zweiter Summand"
        if (inputs[1].parentElement.textContent.indexOf("Zweiter Summand") === -1) {
          throw new Error("Das zweite Textfeld sollte mit 'Zweiter Summand' beschriftet werden.");
        }

        // Ergebnis: text of parent element contains "Ergebnis"
        if (document.getElementById("ergebnis").parentElement.textContent.indexOf("Ergebnis") === -1) {
          throw new Error("Das Ergebnis sollte mit 'Ergebnis' beschriftet werden.");
        }
      },
      `Eine Beschriftung der Eingabefelder ist immer gut. Du weißt zwar vielleicht jetzt noch welches Feld wie
      verarbeitet wird, aber in 3 Wochen garantiert nicht mehr. Ganz zu schweigen davon dass deine Webseiten-Besucher
      deine Gedanken nicht lesen können und komplett raten müssten.`
    ),
    new UiTestCase(
      "Zeilen",
      "input",
      `Es schaut doch viel schöner und ordentlicher aus, wenn du es in verschiedene Zeilen gliederst. 
        Pro Zeile ein Eingabefeld und seine Beschriftung, damit man weiß was zusammengehört.`,
      (inputs) => {

        let check = [{
          element: inputs[0].parentElement,
          name: "Das erste Textfeld"
        }, {
          element: inputs[1].parentElement,
          name: "Das zweite Textfeld"
        }, {
          element: document.getElementById("ergebnis").parentElement,
          name: "Das Ergebnis"
        }];
        // parent element should be a div that is not root

        // not root?
        check.forEach(check => {
          if (check.element === this.elRoot) {
            throw new Error(check.name + " hat keine eigene Zeile. Zeilen machst du indem du ein &lt;div&gt um deinen Zeileninhalt schließt.");
          }
        })


        // not div?
        check.forEach(check => {
          if (check.element.tagName !== "DIV") {
            throw new Error(check.name + " wird von einem &lt;" + check.element.tagName + "&gt; Tag statt einem &lt;div&gt umschlossen. "
              + "<br>&lt;div&gt Tags erstellen einen Block der standardmäßig über die ganze Breite geht, und stellen so sicher dass der Inhalt allein steht.");
          }
        })

      },
      `Schöne geordnete Zeilen sind doch eine wahre Freude für das Auge!`
    ),
    new UiTestCase(
      "Button-Styling mit 'btn'",
      "button",
      "Der Standard-Button in einem HTML-Formular sieht pott-hässlich aus. Bitte mach ihn mir schöner!",
      (elButton) => {

        Game.assertMatches(elButton.className, "btn",
          'Es gibt auf dieser Seite eine CSS-Classe "btn" die Buttons schöner macht. Du bindest sie entweder mit elButton.className="btn" oder &lt;button class="btn"></button> ein.'
        );
      },
      `Styling mit CSS-Klassen hat viele Vorteile: du kannst Elementen eine ganze Reihe an Style-Anweisungen geben,
      du kannst sie schnell hinzufügen und wieder wegnehmen, und du kannst so ein einheitliches Aussehen in der gesamten
      Webseite gewährleisten.`
    ),
    new UiTestCase(
      "Mehr CSS - 'label' und 'row'",
      "input",
      "Das Formular noch etwas gerade rücken, und dann hätten wir es!",
      (inputs) => {
        let check = [{
          element: inputs[0].parentElement,
          name: "Das erste Textfeld",
          label: "Erster Summand"
        }, {
          element: inputs[1].parentElement,
          name: "Das zweite Textfeld",
          label: "Zweiter Summand"
        }, {
          element: document.getElementById("ergebnis").parentElement,
          name: "Das Ergebnis",
          label: "Ergebnis"
        }];

        // input parents have 'row' class
        // not row class?
        check.forEach(check => {
          if (check.element.className !== "row") {
            throw new Error(check.name + " ist nicht in einer Zeile mit der 'row' Klasse.");
          }
        })
        
        

        // no label for input?
        check.forEach(check => {
          let elLabel = check.element.querySelector(".label");

          if (!elLabel) {
            // is at least the label text inside the row?
            if (check.element.textContent.indexOf(check.label) === -1){
              throw new Error(check.name + " hat zwar eine Beschriftung, aber sie befindet sich nicht in der selben Zeile!");
            }

            // text is inside, but no 'label'
            throw new Error(check.name + " hat zwar eine Beschriftung, aber die Beschriftung ist nicht in einem eigenen Tag mit der 'label' Klasse.");
       
          } else {
            // check text content...
            if (elLabel.textContent.indexOf(check.label) === -1){
              throw new Error(check.name + " hat zwar ein Tag mit der Klasse 'label', aber der Beschriftungstext '" + check.label + "' befindet sich nicht dort drin...");
            }
          }
        })

        



      },
      `Die 'label'-Klasse arbeitet mit einem CSS-Trick, der den Doppelpunkt automatisch immer an den Inhalt des Tags
      mit dieser Klasse anhängt. Schau mal ob du ihn findest!`
    )
  ];

  releasetests = []

  // CSS file to load
  cssFile = "./js/games/simpleui/simpleui.css";

  _checkCalculation = (elButton, add1, add2, sum, failMessage) => {
    let clickFunction = elButton.onclick,
      elResult = this.elRoot.querySelector("#ergebnis"),
      result,
      elInputs = this.elRoot.querySelectorAll("input");

    // wir wissen von den vergangenen Testcases dass wir genau 2 Inputs haben!
    elInputs[0].value = add1;
    elInputs[1].value = add2;

    // Click auf Submit
    clickFunction();

    result = elResult.innerHTML.trim(); // whitespace rauskürzen...

    // steht danach auch das richtige drin?
    switch (result) {
      case "":
        throw new Error("Das Ergebnis sollte im Tag mit id='ergebnis' ausgegeben werden.");

      default:
        // was auch immer sonst als Output kommt: es muss 5 sein
        Game.assertMatches(result, sum, failMessage)
    }
  }

  
} // END class TaschenrechnerJarvis


CODE.GAMES.add(new TaschenrechnerJarvis());