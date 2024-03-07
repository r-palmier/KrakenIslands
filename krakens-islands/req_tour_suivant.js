//requete passant au tour suivant 

"use strict"

const fs = require("fs");
const aff = require("./mod_aff_html.js");
const mod_aff = require("./mod_aff.js");
const mod_autre = require("./mod_autre_pseudo");

function t_suivant(req, res, query) {
	let page,t;
	let sauvegarde = {};
	let marqueurs = {};
	let zone = {};
	let player_autre = mod_autre(req, query.nom_partie);

	page = fs.readFileSync("./m_attente_tour.html", "UTF-8");
	page = page.supplant(marqueurs);
	
	sauvegarde = JSON.parse(fs.readFileSync(`./partie/${query.nom_partie}.json`, "UTF-8"));

	sauvegarde[req.headers.cookie].play = false;
	sauvegarde[player_autre].play = true;

	sauvegarde[player_autre].a_tire = false;
	sauvegarde[req.headers.cookie].tour = 0;
	
	sauvegarde[req.headers.cookie].bonus.vision = false;
	sauvegarde[req.headers.cookie].bonus.saboter = false;

	if (sauvegarde[req.headers.cookie].bonus.oeil > 0) {
		sauvegarde[req.headers.cookie].bonus.oeil --;
	}

	marqueurs.carteAff = aff(sauvegarde.carte, 15);

	fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(sauvegarde), "UTF-8");
		
	mod_aff(req, res, page, query.nom_partie);
}

//----------------------------------------------------------

module.exports = t_suivant;
