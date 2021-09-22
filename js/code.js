/**
 * Anything and everything to do with getting a game displayed
 */
(function () {
  var myCodeMirror;

  // init our main variable
  const CODE = window.CODE || {};
  window.CODE = CODE;

  /**
   * JS Stacktrace separator
   */
  const SEPARATOR = "> eval:";

  // Games - contains config and initializes them
  CODE.GAMES = CODE.GAMES || [];


  /**
   * Overwrite console
   */
  console._log = console.log;
  console._error = console.error;
  //console._debug = console.debug;

  console.log = function (...args) {
    // traditional logging
    console._log(...args);

    // write to our output div
    writeToResult("<div class='log'>" + args.join(" ") + "</div>");

    // give it to our game logic
    CODE.GAME.consolelog(args);
  }

  console.error = function (...args) {
    // traditional logging
    console._error(...args);

    // write to our output div
    writeToResult("<div class='log error'>" + args.join(" ") + "</div>");
  }


  function executeCode(testcaseId) {
    try {
      let code = myCodeMirror.getValue(),
        stored = localStorage.getItem("codearea_" + CODE.G.id);
      /**
       * check: has the sourcecode changed?
       */
      if (code !== stored) {
        // changed: warn all testcases!
        let nodes = document.getElementsByClassName("testcase");
        for (let i = 0; i < nodes.length; i++) {
          let classlist = nodes[i].classList;
          if (classlist.contains("success") || classlist.contains("error"))
            classlist.add("warn");

          // warn game, too!
          CODE.G.successfulTestcases[i] = false;
        }
      }

      // now prepare our game!
      let elGame = document.getElementById("game");
      elGame.innerHTML = "";
      CODE.GAME.prepareTestcase(testcaseId, elGame);
      localStorage.setItem("codearea_" + CODE.GAME.id, code);
      document.getElementById("result").innerHTML = "";
      eval("(async () => { try{" + code + "\n} catch(e){showError(e)}})()");
    } catch (e) {
      showError(e);
    }
  }

  /**
 * Successfully absolved a single testcase
 */
  function showSuccess() {
    // in output
    writeToResult("<div class='success'>SUCCESS</div>");
    // in testcase
    document.getElementById("testcase_" + CODE.G.chosenTestcase).className = "btn testcase success";

    showSuccessfulTestcases();

  }

  function writeToResult(html) {
    let elResult = document.getElementById("result");
    elResult.innerHTML += html;
    elResult.scrollTop = elResult.scrollHeight - elResult.clientHeight
  }

  function showError(e) {
    let stack = e.stack.split("\n"),
      //elTarget = document.getElementById("result"),
      processedStack = [e.name + ": " + e.message];

    // special case: SUCCESS marks that user succeeded and code execution is aborted
    if (e.message.indexOf("SUCCESS") > -1) {
      showSuccess();
      return;
    }

    // no success: log it!
    console._error(e);

    // show in testcase
    document.getElementById("testcase_" + CODE.G.chosenTestcase).className = "btn testcase error";

    showSuccessfulTestcases();

    stack.forEach(s => {
      /**
       * myScript@file:///C:/Downloads/angular-project/codingame/js/main.js line 5 > eval:2:3
        @file:///C:/Downloads/angular-project/codingame/js/main.js line 5 > eval:4:7
        executeCode@file:///C:/Downloads/angular-project/codingame/js/main.js:5:5
          onclick@file:///C:/Downloads/angular-project/codingame/main.html:1:1
       */
      // only take the lines that contain an > eval:
      let evalIndex = s.indexOf(SEPARATOR),
        functionName, linenumber;
      if (evalIndex === -1) {
        // no eval: not our problem!
        return;
      }

      // get function name
      functionName = s.split("@")[0];

      // don't show the async* function...
      if ("async*" === functionName) {
        return;
      }

      linenumber = s.substring(evalIndex + SEPARATOR.length);
      processedStack.push("<div class='stack'>" + functionName + " - line " + linenumber + "</div>");
    });

    writeToResult("<div class='log error'>" + processedStack.join("") + "</div>");


  }

  /**
 * updates the number of total successful testcases
 */
  function showSuccessfulTestcases() {
    let successes = 0,
      numberCases = CODE.G.testcases.length;

    CODE.G.successfulTestcases.forEach(s => s ? successes++ : "");

    // successful testcases
    document.getElementById('successNumber').innerHTML = "Passed <span>" + successes + " / " + numberCases + "</span> test cases.";

    // overall success
    document.getElementById('successMessage').innerHTML = numberCases === successes ? CODE.G.successMessage : "";

  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function readline() {
  
    // wait a bit before actually performing the reading!
    await sleep(200);
    return CODE.GAME.readline();
  }
  

  function startGame(id) {
    CODE.GAME = CODE.GAMES[id];
    CODE.G = CODE.GAME;

    /**
     * CSS
     */
    if (CODE.G.cssFile) {
      document.getElementById("gameCSS").href = CODE.G.cssFile;
    }

    /**
     * title, description
     */
    document.getElementById("title").innerHTML = CODE.GAME.title;
    document.getElementById("instructions").innerHTML = `
    <div class="description">${CODE.G.description}</div>
    <div class="rules">${CODE.G.rules}</div>
    <div class="inputs"><div class="panel-header">Inputs</div><div class="panel-body">${CODE.G.input}</div></div>
    <div class="outputs"><div class="panel-header">Outputs</div><div class="panel-body">${CODE.G.output}</div></div>`;

    /**
     * testcases
     */
    let cases = [];
    CODE.G.testcases.forEach((tc, i) => {
      cases.push('<div class="btn testcase" id="testcase_' + i + '" onclick="executeCode(' + i + ')">');
      cases.push('Testcase ' + i + ': ' + tc.name + '</div>');
    })
    document.getElementById("testcases").innerHTML = cases.join('');
    showSuccessfulTestcases();

    /**
     * Load the code
     */
    var codeTemplate;
    if (typeof (Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      codeTemplate = localStorage.getItem("codearea_" + CODE.GAME.id);
    } else {
      // Sorry! No Web Storage support..
    }
    if (!codeTemplate) {
      codeTemplate = CODE.GAME.codeTemplate;
    }

    if (!myCodeMirror){
      myCodeMirror = CodeMirror(document.getElementById("codearea"), {
        value: codeTemplate,
        mode: "javascript",
        lineNumbers: true
      });
    }
    myCodeMirror.setValue(codeTemplate);

    // show playing field
    let elGame = document.getElementById("game");
    elGame.innerHTML = "";
    elGame.className = CODE.G.id;
    if (CODE.G.displayGame)
      CODE.G.displayGame(elGame);
  }



  /**
   * exports
   */
  window.readline = readline;
  window.startGame = startGame;
  window.executeCode = executeCode;
})();
