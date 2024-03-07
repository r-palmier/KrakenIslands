//requète de l'affichage de la page de connexion

"use strict";

const fs = require("fs");

function trait(req, res, query) {

	let marqueurs;
	let page;

	// AFFICHAGE DE LA modele_connexion

	page = fs.readFileSync('m_connexion.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
}

//--------------------------------------------------------------------------

module.exports = trait;
