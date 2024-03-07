//mod de récupération du kraken

"use strict";

const mod_autre = require("./mod_autre_pseudo.js");

function kraken(req, sauvegarde, nom_partie) {
	let ile_centre = Math.min(sauvegarde.carte.length, sauvegarde.carte[0].length) / 6;
	let distance_centre;
	let autre_pseudo = mod_autre(req, nom_partie);

	ile_centre += 0.6;

	distance_centre = Math.hypot((sauvegarde[req.headers.cookie].coordonnees.y - (sauvegarde.carte.length / 2)), (sauvegarde[req.headers.cookie].coordonnees.x - (sauvegarde.carte[0].length / 2)));
	
	if(distance_centre <= ile_centre && sauvegarde[autre_pseudo].bonus.kraken === 0) {
		sauvegarde[req.headers.cookie].bonus.kraken = 1;	
	}

	return sauvegarde;
}

//------------------------------------------------------------------------

module.exports = kraken;
