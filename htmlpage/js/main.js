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
		if (e.target === elPopup || e.target === elClose)
		{elPopup.style.display = "none";}
	}
	elPopup.onclick = closePopup;
	elClose.onclick = closePopup;
	// make popup draggable by the panel header
	//CODE.UTILS.dragElement(elPopup.querySelector(".panel"));

	function showPopup(title, message) {
		let elPopup = document.getElementById("popup"),
			elTitle = elPopup.getElementsByClassName("title")[0],
			elText = elPopup.getElementsByClassName("panel-body")[0];
		elTitle.innerHTML = title;
		elText.innerHTML = message;

		// show
		elPopup.style.display = "block";
	}

	/**
   * generates the HTML elements of the games
   */
	function showGames() {
		window.location.hash = "#games";
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
				html.push(`<div class="game" onclick="show('game','${game.id}')">
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
		window.location.hash = "#game:" + gameId;
		chooseMenuitem("gameDisplay");
		CODE.startGame(gameId);
	}

	function show(view, id) {
		switch (view) {
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
	if (window.location.hash) {
		let split = window.location.hash.substring(1).split(":");
		if (split.length === 1)
		{show(split[0]);}
		else {
			// game: game-id in 2nd part
			let game = CODE.GAMES[split[1]];
			if (game)
			// found our game: stop searching
			{show("game", split[1]);}

		}
	} else {
		console._log("no hash here...");
	}

	/**
   * Exports
   */
	window.show = show;
	window.showPopup = showPopup;
})();



