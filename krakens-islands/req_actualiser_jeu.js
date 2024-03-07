//module d'actualisation de la salle d'attente

"use strict";

const fs = require("fs");
const aff = require("./mod_aff_html.js");
const mod_aff = require("./mod_aff.js");
const mod_autre = require("./mod_autre_pseudo");

function actualiser(req, res, query) {
	let page;
	let sauvegarde;
	let marqueurs = {};
	let parties;
	let i;
	let player_autre;

	page = fs.readFileSync("./m_attente_tour.html", "UTF-8");
	
	sauvegarde = JSON.parse(fs.readFileSync(`./partie/${query.nom_partie}.json`, "UTF-8"));
	
	player_autre = mod_autre(req, query.nom_partie);

	//est-ce qu'il joue ?
	if(sauvegarde[player_autre].play === false && sauvegarde[req.headers.cookie].play === true) {
		page = fs.readFileSync("./m_jeu.html", "UTF-8");
	}
	
	//partie finie ?
	if(sauvegarde[player_autre].resultat === 1) {
		page = fs.readFileSync("./m_scoreboard.html", "UTF-8");
		
	}


	fs.writeFileSync(`partie/${query.nom_partie}.json`, JSON.stringify(sauvegarde), "UTF-8");
	
	mod_aff(req, res, page, query.nom_partie);
}

//----------------------------------------------------------

module.exports = actualiser;

