//requête menant à la page au_revoir

"use strict";

const fs = require("fs");

function trait(req, res) {
	let page;

	page = fs.readFileSync('m_au_revoir', 'utf-8');
	
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
}

//--------------------------------------------------------------------------

module.exports = trait;
