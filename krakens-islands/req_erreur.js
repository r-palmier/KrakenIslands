//=========================================================================
// Affichage d'une page d'erreur
// Auteurs : P. Thiré & T. Kerbrat
// Version : 15/09/2020
//=========================================================================
"use strict";

const fs = require("fs");
const path = require("path");

const show_erreur = function (req, res, query) {
	res.writeHead(500, {'Content-Type': 'text/plain'});
	res.write('ERREUR SERVEUR');
	res.end();
};

//--------------------------------------------------------------------------

module.exports = show_erreur;
