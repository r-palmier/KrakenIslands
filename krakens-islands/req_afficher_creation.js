//requête d'affichage de la page de création de partie et génération de la carte

"use strict";

const fs = require("fs");
const generation = require("./mod_gen_carte.js");
const trans_html = require("./mod_aff_html.js");

function trait(req, res, query) {

	let marqueurs = {};
	let page;
	let carte = [];
	let haut = query.hauteur;
	let larg = query.largeur;
	let sauvegarde = {};
	let display = [];
	let y = 0, x = 0;
    let color = "";

	page = fs.readFileSync('m_creation_partie.html', 'utf-8');

	carte = generation(undefined, haut, larg);
	
	//faire un nouv marqureurs pour créer des zones de texte dynamiques

    marqueurs.haut = carte.length;
	marqueurs.larg = carte[0].length;
	marqueurs.carteAff = trans_html(carte, 5);
	marqueurs.erreur = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();

	return carte;
}

//--------------------------------------------------------------------------

module.exports = trait;
