//requête permettant de rejoindre une partie

"use strict";

const fs = require("fs");
const mod_init_json = require("./mod_init_json.js");

function trait(req, res, query) {
	let marqueurs = {};
	let page;
	let contenu;
	let partie;
	let i = 0;
	let valide;
	let x2;
	let sauvegarde = {};
	let nom_partie;
	let bateaux;
	
	page = fs.readFileSync('m_choix_bateau.html', 'utf-8');

	contenu = fs.readFileSync("index_parties.json", "UTF-8");
	partie = JSON.parse(contenu);

	for(i = 0;i < partie.length;i++) {
		if(partie[i].partie === query.nom_partie) {
			partie[i].Player_2 = req.headers.cookie;
			partie[i].status_p = "en cours";
			nom_partie = partie[i].partie;
		}
	}
	
	sauvegarde = JSON.parse(fs.readFileSync(`partie/${nom_partie}.json`, "UTF-8"));
	
	sauvegarde = mod_init_json(req, sauvegarde);

	sauvegarde[req.headers.cookie].coordonnees = {};

	//création du spwan aléatoire sur le coté de la carte du J2
	
	valide = false;
	while (valide !== true) {
		valide = true;
		x2 = Math.floor(Math.random() * (sauvegarde.carte[0].length + 1));

		if(sauvegarde.carte[0][x2] !== 0) {
			valide = false;
		}
	}
	
	//création des coordonées et attributs du J2
	sauvegarde[req.headers.cookie].coordonnees.x = x2;
	sauvegarde[req.headers.cookie].coordonnees.y = sauvegarde.carte.length - 1;

	sauvegarde[req.headers.cookie].goal = 0;
	
	sauvegarde.equipe2 = req.headers.cookie;
	
	sauvegarde[req.headers.cookie].play = false;
	
	fs.writeFileSync(`partie/${nom_partie}.json`, JSON.stringify(sauvegarde), "UTF-8");
	fs.writeFileSync("index_parties.json", JSON.stringify(partie), "UTF-8");

	bateaux = JSON.parse(fs.readFileSync("stats_bateaux.json","UTF-8"));
	
	//génération des stats des navires
	marqueurs.schooner = `PV : ${bateaux.schooner.pv} <br>Attaque : ${bateaux.schooner.atq}<br>Visibilité : ${bateaux.schooner.camo}`;
    
	marqueurs.brick = `PV : ${bateaux.brick.pv} <br>Attaque : ${bateaux.brick.atq}<br>Visibilité : ${bateaux.brick.camo}`;

	marqueurs.fregate = `PV : ${bateaux.fregate.pv} <br>Attaque : ${bateaux.fregate.atq}<br>Visibilité : ${bateaux.fregate.camo}`;

	marqueurs.galion = `PV : ${bateaux.galion.pv} <br>Attaque : ${    bateaux.galion.atq}<br>Visibilité : ${bateaux.galion.camo}`;


	marqueurs.partie_query = query.nom_partie;
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
}

//--------------------------------------------------------------------------

module.exports = trait;
