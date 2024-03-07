//module de gestion de la dissimulation

"use strict";

const fs = require("fs");
const mod_autre = require("./mod_autre_pseudo.js");

function vu(req, nom_partie, sauvegarde, dist) {
	let page; 
	let player_autre = mod_autre(req, nom_partie);
	let distance_bateau;
	let y, x;

	distance_bateau = Math.hypot((sauvegarde[req.headers.cookie].coordonnees.y - sauvegarde[player_autre].coordonnees.y), (sauvegarde[req.headers.cookie].coordonnees.x - sauvegarde[player_autre].coordonnees.x));

	y = sauvegarde[player_autre].coordonnees.y;
	x = sauvegarde[player_autre].coordonnees.x;
	
	if (sauvegarde[req.headers.cookie].bonus.oeil > 0) {
    	sauvegarde[player_autre].stats.camo += 2;
	}


	if(distance_bateau <= sauvegarde[player_autre].stats.camo || sauvegarde[req.headers.cookie].bonus.vision === true) { 
		if(req.headers.cookie === sauvegarde.equipe1) {
			if (distance_bateau <= sauvegarde[req.headers.cookie].stats.camo) {
				sauvegarde.carte[y][x] = "b_2_p";
			} else {
				sauvegarde.carte[y][x] = "b_2";
			}
		} else {
			if (distance_bateau <= sauvegarde[req.headers.cookie].stats.camo) {
				sauvegarde.carte[y][x] = "b_p";
			} else {
				sauvegarde.carte[y][x] = "b";
			}
		}
	}

	return sauvegarde;
}	

module.exports = vu;
