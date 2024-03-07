//module indiquant la zone dans laquelle se trouve un joueur venant de tirer

"use strict"

const fs = require("fs");
const mod_autre = require("./mod_autre_pseudo");

function zone(req, nom_partie, sauvegarde) {
	let page;
	let player_autre = mod_autre(req, nom_partie);
	let y, x;
	
	console.log(sauvegarde);

	//mise en place de la zone grise
	for (y = 0; y <= sauvegarde.carte.length - 1; y++) {
        for (x = 0;x <= sauvegarde.carte[0].length; x++) {
			console.log(y, x);
            if ((x >= sauvegarde[player_autre].zone.x && x <= sauvegarde[player_autre].zone.x_p) && (y >= sauvegarde[player_autre].zone.y && y <= sauvegarde[player_autre].zone.y_p)) {
				sauvegarde.carte[y][x] = "z";				
            }
        }
    } 
console.log(sauvegarde);	
	return sauvegarde;
}

//------------------------------------------------------------

module.exports = zone;
