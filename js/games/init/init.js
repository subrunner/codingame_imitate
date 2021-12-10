class Init extends Game {
  title = "Einführung";
  description = "Erste Begegnung mit dem Codingame Interface";
  synopsis = "Aller Anfang ist schwer.<p>Dieses 'Spiel' ist nicht so sehr ein Spiel als eine Gelegenheit sich mit den Grundlagen des Interfaces und dem Ablauf vertraut zu machen.";
  successMessage = "Hervorragend! Du hast die erste Hürde gemeistert und kannst nun zu echten Aufgaben weiter gehen!<p>Mein Vorschlag: Thor - Find the Light";
  rules = `<div id="initPopup" class="panel draggable"><div class='panel-header'></div><div class='panel-body'><div class='msg'></div><div class='btnPanel'><div class='btn prev'>Prev</div><div class='btn next'>Next</div></div></div></div><p>Input muss eingelesen werden, und dann an den Output zurück gegeben werden.
  <p>Die Aufgabe ist Sourcecode so zu schreiben dass zuerst alle Testcases bestanden werden (Fälle, wo Debug- und Fehlermeldungen angezeigt werden), und danach dann der Release-Test (hier ist nur noch ein pass/fail sichtbar, aber nicht mehr warum).
  <p>Die <b>Testcases</b> sind unter dem Sourcecode-Fenster zu finden, und können einzeln abgespielt werden. Zu empfehlen: Testcases der Reihe nach zu checken, da sie in der Schwierigkeit aufeinander aufbauen. <b>Play all Testcases</b> spielt alle Testcases der Reihe nach ab und stoppt beim ersten Fehlschlag.
  <p>Sobald alle Testcases bestanden sind, wird der Button <b>Release</b> sichtbar. Hiermit wird der Code gegen unbekannte Testcases abgeschickt. Sobald hier auch alles bestanden ist, ist diese Aufgabe gemeistert.
  <p><b>Tldr;</b> den Input 1:1 in den Output übergeben`;
  input = "<p>Ein String <span class='var'>input</span>. Mit <span class='console'>await readline()</span> einlesen.";
  output = "<p>Der String, der als Input geliefert wurde. <span class='console'>console.log(input)</span><p>Andere Outputs werden ignoriert.";
  cssFile = "./js/games/init/init.css";
  codeTemplate = `// JS starting code here...
// Zeilen, die mit // anfangen sind Kommentare und werden ignoriert.

// Inputs mit await readline() einlesen.
// Variablen werden mit 'let' deklariert.
let input = await readline();

// Debugging-Ausgaben können mit console.debug() gemacht werden. 
// Diese Ausgaben sind rot im Ergebnis-Fenster zu sehen, und werden
// nicht gewertet. Sie sind für dich da damit du sehen kannst
// was dein Programm macht.
console.debug(input);

// Outputs mit console.log() ausgeben.
// Die Outputs sind weiß im Ergebnis-Fenster zu sehen. Es soll
// genau das ausgegeben werden, was von dem Abschnitt "Outputs" beschrieben ist.
console.log('first');
console.log('second');`;


  constructor() {
    super("init");



  }

  currentPopupStage = 0;
  PopupStages = [{
    title: "Einführung",
    body: "Dieses Popup ist ein Tutorial-Popup und macht dich mit der Codingame UI vertraut. Du kannst mich verschieben, aber du wirst mich nur dann los wenn du alles durchklickst.<br> Mwahaha!",
    referenceElementSelector: "#title",
    isBelow: true,
    isHighlightRefEl: false
  }, {
    title: "Einführung",
    body: "Ähem. Du kannst mich natürlich ignorieren - ich hindere dich nicht daran diese Aufgabe ohne meine Hilfe zu lösen. <br>Wenn du eh schon ein Profi bist (oder dieses Tutorial schon zum x-ten Mal siehst), dann scroll einfach weiter um zum Kern der Sache zu kommen.",
    referenceElementSelector: "#title",
    isBelow: true,
    isHighlightRefEl: false
  }, {
    title: "Einführung",
    body: "Noch immer da? Na dann herzlich Willkommen, N00b!<br>Dein Ziel ist es, eine vorgegebene Aufgabe mit deinen JavaScript Coding Skills zu lösen. Wenn du mal nicht weiter weißt - hier ist eine Einführung in JavaScript Programmierung: <a href='https://www.w3schools.com/js/default.asp' target='_blank'>https://www.w3schools.com/js/default.asp</a>.",
    referenceElementSelector: "#title",
    isBelow: true,
    isHighlightRefEl: false
  }, {
    title: "Anleitung",
    body: "In der Anleitung ist beschrieben, was dein Programm können muss.",
    referenceElementSelector: '#instructions',
    isBelow: false,
    isHighlightRefEl: true
  }, {
    title: "Anleitung - Beschreibung",
    body: "Zuerst kommt eine kurze Zusammenfassung - meist ein Ingame-Text, den du auch ignorieren kannst wenn du nur am Programmieren interessiert bist.",
    referenceElementSelector: '#instructions .description',
    isBelow: true,
    isHighlightRefEl: true
  }, {
    title: "Anleitung - Regeln",
    body: "Danach kommt eine ausführlichere Beschreibung, die dir genau sagt was dein Programm können muss. Für Lesefaule ist meist eine kurze Zusammenfassung am Schluss.",
    referenceElementSelector: '#instructions .rules',
    isBelow: true,
    isHighlightRefEl: true
  }, {
    title: "Anleitung - Inputs",
    body: "Jetzt gehts ans Eingemachte. Der 'Inputs' Bereich gibt an, welche Eingaben und Eingabe-Formate das Programm einlesen muss.",
    referenceElementSelector: '.inputs',
    isBelow: true,
    isHighlightRefEl: true
  }, {
    title: "Anleitung - Inputs",
    body: "Mit <span class='code'>await readLine()</span> kann jeweils 1 Zeile des Inputs eingelesen werden. <br>Die Input-Zeile kann in einer Variable gespeichert werden mit <span class='code'>let variable_name = await readLine()</span>",
    referenceElementSelector: '.inputs',
    isBelow: true,
    isHighlightRefEl: true
  }, {
    title: "Anleitung - Outputs",
    body: "Der 'Outputs' Bereich gibt an, welche Ausgaben das Programm machen muss.",
    referenceElementSelector: '.outputs',
    isBelow: true,
    isHighlightRefEl: true
  }, {
    title: "Anleitung - Outputs",
    body: "Es kann jeweils 1 Zeile Output geschrieben werden. Wenn eine Zeile <span class='code'>Mein Output</span> erwartet wird, dann kann sie mit <span class='code'>console.log(\"Mein Output\")</span> geschrieben werden.",
    referenceElementSelector: '.outputs',
    isBelow: true,
    isHighlightRefEl: true
  }, {
    title: "Sourcecode",
    body: "Im 'Sourcecode' Bereich findet das eigentliche Programmieren statt.",
    referenceElementSelector: '#code',
    isBelow: false,
    isHighlightRefEl: true
  }, {
    title: "Sourcecode",
    body: "Der Editor ist immer mit einem Code-Schnipsel vorbefüllt. Das hilft dir beim Einlesen der Variablen und gibt ein Grundgerüst vor damit du nicht ganz auf Wald und Wiese anfangen musst.",
    referenceElementSelector: '#codearea',
    isBelow: true,
    isHighlightRefEl: true
  }, {
    title: "Sourcecode",
    body: "Sobald du etwas in dem Editor veränderst, wird dein Code in deinem Browser gespeichert. Du kannst also ohne Probleme das Fenster zumachen ohne deinen Coding-Stand zu verlieren.<br>Du darfst nur nicht den Cache löschen - dann ist alles weg!",
    referenceElementSelector: '#codearea',
    isBelow: true,
    isHighlightRefEl: true
  }, {
    title: "Testcases",
    body: "Um zu überprüfen, ob dein Code das macht was gefordert ist, sind verschiedene Testcases vorgegeben.",
    referenceElementSelector: '#testcase_0',
    isBelow: true,
    isHighlightRefEl: true
  }, {
    title: "Testcases",
    body: "Dein Code muss den Testcase bestehen.<p>Drücke auf 'Testcase 0' um zu sehen, was passiert.",
    referenceElementSelector: '#testcase_0',
    isBelow: true,
    isHighlightRefEl: true,
    waitForReferenceElementToBeClicked: true
  }, {
    title: "Results",
    body: "Du hast deinen ersten Testcase gestartet. Im 'Results' Bereich findest du das Ergebnis, und ob du ihn bestanden hast.",
    referenceElementSelector: '#result',
    isBelow: false,
    isHighlightRefEl: false
  }, {
    title: "Results",
    body: "Alles, was du über console.log oder console.debug ausgibst, fängt mit <span class='code'>&gt; </span> an. Debugging-Ausgaben sind rot, die erwarteten console.log()-Ausgaben weiß. Rückmeldungen vom Compiler und von den Testcases haben kein &gt;.",
    referenceElementSelector: '#result div:last-child',
    isBelow: true,
    isHighlightRefEl: false
  }, {
    title: "Mehr Testcases",
    body: "Ein Testcase alleine reicht aber nicht. Dein Code muss alle Testcases bestehen <b>ohne</b> von dir in der Zwischenzeit verändert zu werden.<br>Probiere den Testcase 1 aus.",
    referenceElementSelector: '#testcase_1',
    isBelow: true,
    isHighlightRefEl: true,
    waitForReferenceElementToBeClicked: true
  }, {
    title: "Testcase 1 Ergebnis",
    body: "Du siehst, dass dieser Testcase nicht erfolgreich verlaufen ist. <br><span class='code'>- line 16:9</span> sagt, dass der Fehler in Zeile 16 in der 9. Spalte aufgetreten ist. Du musst den Sourcecode ändern, damit dein Programm das zurückgibt was erwartet wird - nicht 'first', sondern 'second'.",
    referenceElementSelector: '#result div:last-child',
    isBelow: true,
    isHighlightRefEl: false
  }, {
    title: "Alle Testcases",
    body: "Dein Code muss alle Testcases bestehen. Damit du nicht nach jeder Änderung jeden Testcase einzeln anklicken musst, gibt es den 'Play all testcases' Knopf. Probier ihn aus!",
    referenceElementSelector: '#playallBtn',
    isBelow: true,
    isHighlightRefEl: true,
    waitForReferenceElementToBeClicked: true
  }, {
    title: "Alle Testcases",
    body: "Bei dem ersten Testcase, der Fehlschlägt, hält der 'Play All Testcases' Prozess an damit du das Ergebnis im Result-Bereich sehen kannst.",
    referenceElementSelector: '#playallBtn',
    isBelow: true,
    isHighlightRefEl: true
  }, {
    title: "Alle Testcases",
    body: "Sobald alle Testcases bestanden sind, bist du so weit um deinen Code in die freie Wildbahn zu entlassen - um ein Release zu machen.",
    referenceElementSelector: '#playallBtn',
    isBelow: true,
    isHighlightRefEl: true
  }, {
    title: "Release",
    body: "Für Tutorial-Zwecke hab ich dir mal den 'Release'-Button freigeschaltet. Normalerweise taucht er erst dann auf, wenn die Testcases bestanden sind, aber weil es du bist... <br>Drück ihn!",
    referenceElementSelector: '#releaseBtn',
    isBelow: true,
    isHighlightRefEl: true,
    executeCodeBeforePopup: () => document.getElementById("releaseBtn").style.display = "",
    waitForReferenceElementToBeClicked: true
  }, {
    title: "Release",
    body: "Es werden jetzt noch eine ganze Stange an Release-Tests durchgeführt. Bei denen siehst du nicht mehr die console.log oder console.debug Ausgaben. Du siehst nur, ob der Test bestanden ist oder nicht.",
    referenceElementSelector: '#popup .panel',
    isBelow: true,
    isHighlightRefEl: false
  }, {
    title: "Release",
    body: "Grund dafür ist, dass das das normale Entwickler-Leben ist. Sobald der Programmierer sein Programm aus der Hand gibt (releast), hört er nur ob es läuft oder nicht.",
    referenceElementSelector: '#popup .panel',
    isBelow: true,
    isHighlightRefEl: false
  }, {
    title: "Release",
    body: "Deine Aufgabe besteht natürlich darin nicht nur die Testcases zu bestehen, sondern auch die Release-Tests. Erst wenn du eine Erfolgsrate von 100% hast, bist du fertig mit der Aufgabe.",
    referenceElementSelector: '#popup .panel',
    isBelow: true,
    isHighlightRefEl: false
  }, {
    title: "Ende",
    body: "Ich verabschiede mich jetzt, denn nun bist du an der Reihe.<br> Wenn du mich wieder sehen willst, und das Tutorial ganz von vorne neu durchmachen willst, kannst du das mit der F5-Taste tun (oder einem Seiten-Reload).<br>Viel Spaß beim Programmieren!",
    referenceElementSelector: '#popup .panel',
    isBelow: true,
    isHighlightRefEl: false
  }];

  /**
   * 
   * @param {boolean} isNext true: displays the popup after the current popup stage, false: displays previous
   */
  _displayPopup = function (isNext) {
    let stage,
      elPrev = this.elPopup.querySelector(".prev"),
      elNext = this.elPopup.querySelector(".next"),
      elReference;

    // go to next page
    this.currentPopupStage = isNext ? this.currentPopupStage + 1 : this.currentPopupStage - 1;

    // if we have reached the end, hide the popup
    if (this.currentPopupStage === this.PopupStages.length) {
      this.elPopup.style.display = "none";
      this._highlightElement();
      return;
    }

    stage = this.PopupStages[this.currentPopupStage];

    // enable / disable prev-next buttons
    if (!this.currentPopupStage) {
      elPrev.classList.add("disabled");
    } else {
      elPrev.classList.remove("disabled");
    }

    if (this.currentPopupStage === this.PopupStages.length - 1) {
      elNext.innerHTML = "Finish"
    } else {
      elNext.innerHTML = "Next";
    }

    // execute the necessary code before the popup gets moved
    if (stage.executeCodeBeforePopup) {
      stage.executeCodeBeforePopup();
    }


    // set popup content
    this.elPopup.querySelector(".panel-header").innerHTML = (this.currentPopupStage + 1) + "/" + this.PopupStages.length
      + " " + stage.title;
    this.elPopup.querySelector(".msg").innerHTML = stage.body;

    // place popup near reference element
    elReference = document.querySelector(stage.referenceElementSelector);
    this.elPopup.style.top = (elReference.offsetTop + (stage.isBelow ? elReference.offsetHeight : 20)) + "px";
    this.elPopup.style.left = (elReference.offsetLeft + 20) + "px";

    // highlight reference element
    if (stage.isHighlightRefEl) {
      this._highlightElement(elReference);
    } else {
      this._highlightElement();
    }

    // when reference element should be clicked, prevent the 'next' button
    // until the element has been clicked
    if (stage.waitForReferenceElementToBeClicked) {
      let referenceClick = () => {
        // enable the 'next' button
        elNext.classList.remove("disabled");
        // remove the click-handler from the button!
        elReference.removeEventListener('click', referenceClick);
        // show the next popup page after .5s timeout to wait for potential testcases to finish
        setTimeout(() =>
          this._displayPopup(true), 500);
      }
      elNext.classList.add("disabled")
      elReference.addEventListener('click', referenceClick);
    }

    // show the reference element - remembre not to hide it beneath navigation!
    window.scrollTo(0, elReference.offsetTop - 60);
  }

  /**
   * highlights a DOM element
   * @param {HTMLElement} el element to highlight. If null, then removes existing highlights.
   */
  _highlightElement = (el = null) => {
    // un-highlight highlighted elements
    if (this.elHighlighted) {
      this.elHighlighted.classList.remove("highlight");
    }

    // highlight
    if (el) {
      el.classList.add("highlight");
      this.elHighlighted = el;
    }
  }

  initGameArea = (elPlayingfield) => {
    // create popup to navigate through init
    if (!this.elPopup) {
      // create our guidance popup
      this.elPopup = document.getElementById("initPopup");
      CODE.UTILS.dragElement(this.elPopup);

      //document.getElementsByTagName("body")[0].append(this.elPopup);
    }
    this.elPopup.style.display = "block";


    // clickhandler for prev/next buttons
    this.elPopup.querySelector(" .prev").onclick = () => this._displayPopup();
    this.elPopup.querySelector(" .next").onclick = () => this._displayPopup(true);

    // start it off by showing the first page ( the next page after -1)
    this.currentPopupStage = -1;
    this._displayPopup(true);
  };
  updateGameArea = () => { };
}

CODE.GAMES.add(new Init());