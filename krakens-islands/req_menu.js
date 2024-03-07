//requête d'affichage de la page menu

"use strict";

const fs = require("fs");

function trait(req, res, query) {

	let marqueurs = {};
	let page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('m_menu.html', 'utf-8')
	
	marqueurs.pseudo = req.headers.cookie;
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
}

//--------------------------------------------------------------------------

module.exports = trait;
