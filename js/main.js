/**
 * Everything with the general layout
 */
(function () {

  /**
   * generates the HTML elements of the games
   */
  function showGames(){
    window.location.hash="#games";
    chooseMenuitem("gameChoice");
    let elRoot = document.getElementById("gameChoice"),
      html = [];
    CODE.GAMES .forEach((game,id) => {
      html.push(`<div class="game">
      <div class="title" onclick="show('game',${id})">${game.title}</div>
      <div class="description">${game.description}</div>
      <div class="synopsis">${game.synopsis}</div>
      </div>` );
    });
    elRoot.innerHTML = html.join("");
  }

  function chooseMenuitem(idSelector){
    // hide all menu items
    let els = document.getElementsByClassName("view");
    for (let i = 0; i < els.length; i++){
      els[i].style.display="none";
    }

    // make the selected one visible: remove the manual style stuff
    document.getElementById(idSelector).style.display=null;
  }

  /**
   * select a game, and display it
   * @param {number} gameId 
   */
  function chooseGame(gameId) {
    console._log("Chose game " + gameId);
    window.location.hash="#game:" + CODE.GAMES[gameId].id;
    chooseMenuitem("gameDisplay");
    startGame(gameId);
  }

  function show(view, id){
    switch(view){
      case "games":
        showGames();
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
   * initialize according to hash
   */
  if (window.location.hash){
    let split = window.location.hash.substring(1).split(":");
    if (split.length === 1)
      show(split[0]);
    else {
      // game: game-id in 2nd part
      CODE.GAMES.forEach((g,index) => {
        if (g.id === split[1]){
          // found our game: stop searching
          show("game",index);
          return false;
        }
        return true;
      })
    }
  } else {
    console._log("no hash here...");
  }

  /**
   * Exports
   */
  window.show = show;
})();



