//requète d'affichage de la page d'accueil

"use strict";

const fs = require("fs");

function trait(req, res) {
	let marqueurs;
	let page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('m_accueil.html', 'utf-8');

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
}

//--------------------------------------------------------------------------

module.exports = trait;
