//requête affichant la page de tir

"use strict";

const fs = require("fs");
const mod_aff = require("./mod_aff.js");

function tir(req, res, query) {
	let page;
	let tir = true;
	
	page = fs.readFileSync("m_tir.html", "uTF-8");

	mod_aff(req, res, page, query.nom_partie, tir );
	
}

module.exports = tir;
