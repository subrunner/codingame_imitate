/**
 * Everything with the general layout
 */
(function () {

  /**
   * Popup function
   */
  let elPopup = document.getElementById("popup"),
    elClose = elPopup.getElementsByClassName("close")[0];
  function closePopup(e) {
    // hide popup when clicked outside, or when close button pressed!
    // also hide if we call the function from the code...
    if (!e || e.target === elPopup || e.target === elClose) {
      elPopup.style.display = "none";
    }
  }
  elPopup.onclick = closePopup;
  elClose.onclick = closePopup;
  // make popup draggable by the panel header
  //CODE.UTILS.dragElement(elPopup.querySelector(".panel"));

  /**
   * 
   * @param {string} title title for popup
   * @param {string} message HTML-formatted message content of popup
   * @param {boolean} addOkButton adds a single ok-button that closes the popup. Default: true
   */
  function showPopup(title, message, addOkButton=true) {
    let elPopup = document.getElementById("popup"),
      elTitle = elPopup.getElementsByClassName("title")[0],
      elText = elPopup.getElementsByClassName("panel-body")[0];
    elTitle.innerHTML = title;

    // okbutton
    if (addOkButton){
      message += `<div class="btnPanel">
        <button class="btn" onclick="closePopup()">OK</button>
        </div>`;
    }

    // add text
    elText.innerHTML = message;

    // show
    elPopup.style.display = "block";
  }

  /**
   * generates the HTML elements of the games
   */
  function showGames() {
    chooseMenuitem("gameChoice");
    let elRoot = document.getElementById("gameChoice"),
      html = [],
      games = CODE.SKILLLEVELS.map(() => []);

    // order the games - first by category, then alphabetically
    Object.keys(CODE.GAMES).forEach(key => {
      // skip: the add function...
      if (key === "add") {
        return;
      }
      let g = CODE.GAMES[key];
      games[g.skillLevel].push(g);
    });

    // go through the levels and display the games
    games.forEach((level, i) => {
      level.sort((a, b) => a.title.localeCompare(b.title));
      html.push('<div class="category"><div class="panel-header">' + CODE.SKILLLEVELS[i] + '</div>');
      html.push('<div class="panel-body"><div class="games">');
      // display them
      level.forEach((game) => {
        html.push(`<div class="game" onclick="window.location.hash='#game:${game.id}'">
      <div class="title" >${game.title}</div>
      <div class="solved">${localStorage.getItem("solved_" + game.id) ? "Solved" : ""}</div>
      <div class="description">${game.description}</div>
      <div class="synopsis">${game.synopsis}</div>
      <div class="skills">` );
        // skills
        game.skills.forEach(skill => html.push('<span class="var">' + skill + '</span> '));
        html.push('</div></div>');
      });
      html.push('</div></div></div>');
    });



    elRoot.innerHTML = html.join("");
  }

  function chooseMenuitem(idSelector) {
    // hide all menu items
    let els = document.getElementsByClassName("view");
    for (let i = 0; i < els.length; i++) {
      els[i].style.display = "none";
    }

    // make the selected one visible: remove the manual style stuff
    document.getElementById(idSelector).style.display = null;
  }

  /**
   * select a game, and display it
   * @param {number} gameId 
   */
  function chooseGame(gameId) {
    console._log("Chose game " + gameId);
    chooseMenuitem("gameDisplay");
    CODE.startGame(gameId);
  }

  function show(view, id) {
    switch (view) {
      case "games":
        showGames();
        break;
      case "importExport":
        chooseMenuitem("importExport");
        break;
      case "game":
        chooseGame(id);
        break;
      default:
        // invalid view to show: display help!
        chooseMenuitem("help");
    }
  }


  /**
   * handles the import fileinput select event
   * @param {SelectEvent} evt event of a file input onselect
   */
  function handleFileSelect(evt) {
    let files = evt.target.files; // FileList object

    // use the 1st file from the list
    let f = files[0];

    let reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      console._log("render.onload", theFile);
      return function (e) {
        document.getElementById("importContent").value = e.target.result;
      };
    })(f);

    // Read in the image file as a data URL.
    // our content is LATIN-1 encoded, not UTF-8 like the HTML page...
    reader.readAsText(f, 'UTF-8');
  } // END handleFileSelect

  /**
   * imports the contnet of the import textarea
   */
  function doImport() {
    let elContent = document.getElementById("importContent"),
      content = elContent.value,
      jsonContent;

    // is there anything to import?
    if (!content) {
      showPopup("Warning", "This is an empty text area. Nothing will be imported.");
      return;
    }

    try {
      // parse the JSON text
      jsonContent = JSON.parse(content);

      // write the content to our local storage
      Object.keys(jsonContent).forEach((key) => {
        localStorage.setItem(key, jsonContent[key]);
      });

      // success!
      showPopup("Success", `Savegame was importet successfully. Have fun continuing where you left off!
      <div style="text-align:center;"><a href="#games" class="btn" onclick="closePopup()">OK</a></div>`, false);

      // make the content area empty
      elContent.value = "";
    } catch (e) {
      console._error(e);
      showPopup("Error", "The file content is not a JSON format: " + e + "<br>Nothing will be imported.");
    }
  } // END doImport

  function doExport() {
    let fileContent = JSON.stringify(localStorage, null, 2),
      // invisible download link
      a = document.createElement('a'),
      date = new Date(),
      dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "_" + date.getHours() + "" + date.getMinutes();
    a.href = "data:application/json;charset=UTF-8," + encodeURIComponent(fileContent);
    a.download = "codingame_" + dateString + ".json"

    // add it to the document
    document.body.appendChild(a);
    a.click();

    // and then remove it immediately afterwards...
  }

  window.addEventListener('hashchange', function () {
    console._log('The hash has changed!');
    showHashView();
  }, false);


  /**
   * initialize according to hash
   */
  function showHashView() {
    if (window.location.hash) {
      let split = window.location.hash.substring(1).split(":");
      if (split.length === 1) {
        // show one of the main views
        show(split[0]);
      }
      else {
        // game: game-id in 2nd part
        let game = CODE.GAMES[split[1]];
        if (game)
        // found our game: stop searching
        { show("game", split[1]); }

      }
    } else {
      console._log("no hash here...");
    }
  }
  // initialize the 1st hash
  showHashView();

  /**
   * Exports
   */
  window.showPopup = showPopup;
  window.closePopup = closePopup;
  window.handleImportFile = handleFileSelect;
  window.doImport = doImport;
  window.doExport = doExport;
})();



