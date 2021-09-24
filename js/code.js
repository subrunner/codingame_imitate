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
  CODE.GAMES = CODE.GAMES || {
    add: game => {
      CODE.GAMES[game.id] = game;
    }
  };

  CODE.SKILLLEVELS = ["Starting","Easy","Medium","Hard"];

  // configuration - chosen game, current testcase, etc.
  CODE.CONFIG = CODE.CONFIG || {
    chosenTestcase: -1,
    testcase: {},
    isBlindTests: false,
    successfulTestcases: [],
    successfulReleasetests: []
  }
  CODE.C = CODE.CONFIG;

  // success: disrupts the eval execution and tells the user of the success
  function success (message)  {
    // remember our success
    if (CODE.C.isBlindTests) {
      CODE.C.successfulReleasetests[CODE.C.chosenTestcase] = true;
    } else
      CODE.C.successfulTestcases[CODE.C.chosenTestcase] = true;

    // for non-blind-tests: display!
    if (!CODE.C.isBlindTests) {
      // display the game a last time
      CODE.G.updateGameArea();

      // display the message in our 'console'
      writeToResult("<div class='success'>" + message + "</div>");

      // in output
      writeToResult("<div class='success'>SUCCESS</div>");
      // in testcase
      document.getElementById("testcase_" + CODE.C.chosenTestcase).className = "btn testcase success";



    }

    showSuccessfulTestcases();

    // interrupt the execution
    throw new Error("SUCCESS");
  };


  /**
   * Overwrite console
   */
  console._log = console.log;
  console._error = console.error;
  //console._debug = console.debug;

  console.log = function (...args) {
    // in case of blind tests, just give it directly to the game
    if (!CODE.C.isBlindTests) {
      // traditional logging
      console._log(...args);

      // write to our output div
      writeToResult("<div class='log'>" + args.join(" ") + "</div>");
    }

    // give it to our game logic
    CODE.GAME.consolelog(args);

    // display
    if (!CODE.C.isBlindTests)
      CODE.G.updateGameArea();
  }

  console.error = function (...args) {
    // in case of blind tests, do nothing
    if (CODE.C.isBlindTests) {
      return;
    }

    // traditional logging
    console._error(...args);

    // write to our output div
    writeToResult("<div class='log error'>" + args.join(" ") + "</div>");
  }


  /**
   * Executes a single testcase. non-blind!
   * @param {number} testcaseId 
   */
  async function executeTestcase(testcaseId) {
    try {
      // make sure we don't do release tests!
      CODE.C.isBlindTests = false;

      let code = myCodeMirror.getValue();
      console._log("execute testcase ", testcaseId);
      CODE.C.chosenTestcase = testcaseId;
      CODE.C.testcase = CODE.G.testcases[testcaseId];

      // actually execute the code
      await executeCode(code);
    } catch (e) {
      showError(e);
    }
  }

  /**
   * Executes the code. May throw errors!
   * @param {string} code code that the user entered
   * @param {HTMLElement} elTestcase must be set unless it is a blind test!
   */
  async function executeCode(code, elTestcase) {
    
    // now prepare our game!
    CODE.GAME.prepareTestcase();

    if (!CODE.C.isBlindTests) {
      CODE.GAME.updateGameArea(true);

      // reset the code output
      document.getElementById("result").innerHTML = "";

      // signal we started processing
      elTestcase = document.getElementById("testcase_" + CODE.C.chosenTestcase);
      elTestcase.classList.add("loading");
    }

    
    // do our evaluation!
    await eval("(async () => { " + code + "\nCODE.G.end()})()");
    
    if (!CODE.C.isBlindTests) {
      // stop loading
      elTestcase.classList.remove("loading");
    }
  }

  /**
   * executes all testcases in CODE.C.testcases. Make sure that the proper successfulTestcases
   * and successfulReleasetests have been prepared!
   */
  async function playAllTestcases() {
    let code = myCodeMirror.getValue(),
      testcases = CODE.C.testcases,
      elPlayAll = document.getElementById(CODE.C.isBlindTests? "releaseBtn":"playallBtn");

    // show that we are doing something
    elPlayAll.classList.add("loading");

    // execute all testcases
    for (let i = 0; i < testcases.length; i++) {
      let elTestcase = document.getElementById("testcase_" + i);
      CODE.C.chosenTestcase = i;
      CODE.C.testcase = testcases[i];

      if (!CODE.C.isBlindTests) {
        // scroll testcase into view
        elTestcase.scrollIntoView();
      }

      // execute code
      try {
        await executeCode(code);
      } catch (e) {
        // in non-blind tests: stop the procession if we have an error case!
        if (!CODE.C.isBlindTests && e.message !== "SUCCESS") {
          showError(e);
          // actually stop...
          break;
        }
      }
    }

    // signal that we are done
    elPlayAll.classList.remove("loading");

    // show stuff for release tests in case of errors
    showSuccessfulTestcases(true);

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
      return;
    }

    // if there is an error, we have not solved this thing!
    if (CODE.C.isBlindTests) {
      CODE.C.successfulReleasetests[CODE.C.chosenTestcase] = false;
    } else
      CODE.C.successfulTestcases[CODE.C.chosenTestcase] = false;

    // remember that we failed the test: game is not solved,
    // no release tests possible
    localStorage.setItem("solved_" + CODE.G.id, '');
    document.getElementById('releaseBtn').style.display = "none";

    // in case of blind tests, do nothing more
    if (CODE.C.isBlindTests) {
      console._error("Doing blind tests. Not logging anything.");
      return;
    }

    // no success: log it!
    console._error(e);

    // give the game a chance to display
    CODE.G.updateGameArea();

    // show in testcase
    document.getElementById("testcase_" + CODE.C.chosenTestcase).className = "btn testcase error";

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
 * updates the number of total successful testcases, and if we are in a release-test and have passed all release
 * tests, then shows the overall success
 */
  function showSuccessfulTestcases(showBlindtestResult = false) {
    let successes = 0,
      numberCases = CODE.G.testcases.length,
      totalCases = numberCases + CODE.G.releasetests.length;

    CODE.C.successfulTestcases.forEach(s => s ? successes++ : "");

    // non-blind tests: display result
    if (!CODE.C.isBlindTests) {

      // successful testcases
      document.getElementById('successNumber').innerHTML = "Passed <span>" + successes + " / " + numberCases + "</span> test cases.";

      // in case we have solved all ui cases, tell the user
      if (successes === numberCases){
        showPopup("Test Success","You have solved all testcases. Now it is time to test your code by releasing it.<p>Press the 'Release' button to see how it fares in the wild!");
      }
      // in case we have solved all ui cases, display the release tests option. Otherwise, hide it.
      document.getElementById('releaseBtn').style.display = (successes === numberCases) ? null : "none";

    } else if (showBlindtestResult) {

      // overall success: add the releasetest successes
      CODE.C.successfulReleasetests.forEach((s, id) => s ? successes++ : "");

      // SUCCESS!
      if (totalCases === successes) {
        showPopup("SUCCESS", '<p>Alle ' + CODE.C.testcases.length + ' Releasetests wurden erfolgreich durchgeführt.<div class="success">' + CODE.G.successMessage + "</div>");
        // save the overall success!
        localStorage.setItem("solved_" + CODE.G.id, true);
      } else {

        // FAILED at least 1 case
        let successPercentage = (successes - numberCases) * 100 / CODE.C.testcases.length,
          cases = CODE.C.testcases.map((c, i) => "<div class='" + (CODE.C.successfulReleasetests[i] ? "success" : "error") + "'>" + c.name + "</div>");
        successPercentage = Math.round(successPercentage);
        showPopup(successPercentage + "% Success-rate", "Only " + successPercentage + "% of the cases were solved:" + cases.join(""));

      }
    }

  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function readline() {

    if (!CODE.C.isBlindTests)
      // wait a bit before actually performing the reading during UI tests!
      await sleep(200);
    return CODE.GAME.readline();
  }


  function startGame(id) {
    CODE.GAME = CODE.GAMES[id];
    CODE.G = CODE.GAME;

    /**
     * Config
     */
    CODE.C.isBlindTests = false;
    CODE.C.currentGame = id;
    CODE.C.chosenTestcase = -1;
    CODE.C.successfulTestcases = CODE.G.testcases.map(tc => false);

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
      cases.push('<div class="btn testcase" id="testcase_' + i + '" onclick="CODE.executeTestcase(' + i + ')">');
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

    if (!myCodeMirror) {
      let elCodearea = document.getElementById("codearea");

      // add a focus-lost handler so that the code gets saved and the testcases are warned
      elCodearea.onblur = saveCode;

      // create the editor
      myCodeMirror = CodeMirror(elCodearea, {
        value: codeTemplate,
        mode: "javascript",
        lineNumbers: true
      });
      myCodeMirror.on('blur', saveCode);
    }
    myCodeMirror.setValue(codeTemplate);

    // 'console'
    document.getElementById("result").innerHTML = "";

    // show playing field
    let elGame = document.getElementById("game");
    elGame.innerHTML = "";
    elGame.className = CODE.G.id;
    CODE.G.initGameArea(elGame);
  } // END startGame

  /**
   * saves the code in the sourcecode area, warns testcases if necessary
   */
  function saveCode() {
    console._log("Save code!");

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
        CODE.C.successfulTestcases[i] = false;
      }
      localStorage.setItem("codearea_" + CODE.G.id, code);

      // remove any success messages...
      localStorage.setItem("solved_" + CODE.G.id, '');

      // hide releasebutton
      document.getElementById("releaseBtn").style.display = "none";
    }
  } // END saveCode

  function releaseTests() {
    // prepare everything for the release tests
    CODE.C.isBlindTests = true;
    CODE.C.testcases = CODE.G.releasetests;
    CODE.C.successfulReleasetests = CODE.C.testcases.map(() => false);

    playAllTestcases();
  }

  function allTestcases() {
    // prepare everything for the ui tests
    CODE.C.isBlindTests = false;
    CODE.C.testcases = CODE.G.testcases;
    CODE.C.successfulTestcases = CODE.C.testcases.map(() => false);

    playAllTestcases();
  }


  /**
   * exports
   */
  window.readline = readline;
  CODE.startGame = startGame;
  CODE.executeTestcase = executeTestcase;
  CODE.allTestcases = allTestcases;
  CODE.releaseTests = releaseTests;
  CODE.success = success;
})();
