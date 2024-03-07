//module permettant de connaitre le pseudo de l'autre joueur que le joueur actuel

"use strict";

const fs = require("fs");

function autre(req, nom_partie) {
	let parties;
	let player_autre;
	let i;
	
	parties = JSON.parse(fs.readFileSync("./index_parties.json", "UTF-8"));
	
	//récupération du nom de l'autre joueur
    for(i = 0;i < parties.length; i++) {
        if(parties[i].partie === nom_partie) {
            if(parties[i].Player_1 === req.headers.cookie) {
                player_autre = parties[i].Player_2;
            } else {
                player_autre = parties[i].Player_1;
            }
        }
    }

	return player_autre;

}

//----------------------------------------------------------------

module.exports = autre;
