//requête d'affichage de la page d'inscription

"use strict";

const fs = require("fs");

function trait(req, res, query) {

	let marqueurs;
	let page;

	page = fs.readFileSync('m_inscription.html', 'utf-8');

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
