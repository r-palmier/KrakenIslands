// module condition de victoire
"use strict"

const fs = require ("fs");
const mod_aff = require ("./mod_aff_html");
const mod_autre = require ("./mod_autre_pseudo");

function win (req, nom_partie, page) {
	let sauvegarde;
	let parties;
	let resultat;
	let player_autre = mod_autre(req, nom_partie);

	sauvegarde = JSON.parse (fs.readFileSync (`partie/${nom_partie}.json`,"UTF-8"));

	// condition de victoire
	if (sauvegarde[req.headers.cookie].coordonnees.y === sauvegarde[req.headers.cookie].goal) {
		sauvegarde[req.headers.cookie].resultat = 1;
		console.log ("arrivée");
		page = fs.readFileSync("./m_scoreboard.html", "UTF-8");
    }else if (sauvegarde[player_autre].stats.pv <= 0) {
        sauvegarde[req.headers.cookie].resultat = 1;
		console.log("he's dead");
		page = fs.readFileSync("./m_scoreboard.html", "UTF-8");
	}
	
	fs.writeFileSync (`partie/${nom_partie}.json`,JSON.stringify(sauvegarde),"UTF-8"); 

	return page;
}

//----------------------------------------------------------

module.exports = win;
