
"use strict"

const fs = require("fs");

function choix(req, res, query) {
	let i;
	let page;
	let contenu;
	let parties = [];
	let sauvegarde = {};
	let nom_partie;
	let pseudo;
	let marqueurs = {};
	let bateau = {};

	page = fs.readFileSync("m_salle_attente2.html", "UTF-8");
	
	nom_partie = query.nom_partie;
	
	contenu = fs.readFileSync(`partie/${nom_partie}.json`, "UTF-8");
	sauvegarde = JSON.parse(contenu);
		
	sauvegarde[req.headers.cookie].bateau = query.choixbateau;

	bateau = JSON.parse(fs.readFileSync("stats_bateaux.json","UTF-8"));

	sauvegarde[req.headers.cookie].stats = bateau[sauvegarde[req.headers.cookie].bateau];
	sauvegarde[req.headers.cookie].pvmax = bateau[sauvegarde[req.headers.cookie].bateau].pv;

	fs.writeFileSync(`partie/${nom_partie}.json`, JSON.stringify(sauvegarde) ,"UTF-8");
	
	marqueurs.partie_query = nom_partie;
	page = page.supplant(marqueurs);
	
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(page);
	res.end();
}

//----------------------------------------------------------

module.exports = choix;
