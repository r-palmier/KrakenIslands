//requete d'affichage de la page de crédits

"use strict";

const fs = require("fs");

const trait = function (req, res) {

	let marqueurs;
	let page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('m_credits.html', 'utf-8');


	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
}

//--------------------------------------------------------------------------

module.exports = trait;
