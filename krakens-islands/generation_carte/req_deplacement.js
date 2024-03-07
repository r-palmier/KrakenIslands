"use strict";

const url = require("url");
const fs = require("fs");


let requete;
let pathname;
let deplacement;
let partie;
let carte;
let x,y;
let dx,dy;;


function index(req, res, query) {


	deplacement = query.direction;
	partie = JSON.parse (fs.readFileSync("test.json", "UTF-8")); 
	// "./partie/${nom_parties}.json" //

	

	dx = partie.Nasicas.coordonnees.x;
	dy = partie.Nasicas.coordonnees.y;
	
	
	switch(deplacement) {
		
		case 'haut':
			if (partie.Nasicas.coordonnees.y > 0) {
				dy--;
				if (partie.carte[dy][dx] === 0) { 
					partie.Nasicas.coordonnees.y -= 1;
				}
			}
			break;
		
		case 'droite':
			if ( partie.Nasicas.coordonnees.x < partie.carte[0].length ) {
				dx++;
                if (partie.carte[dy][dx] === 0) { 
                    partie.Nasicas.coordonnees.x += 1;
				}
			}
			break;
		
		case 'gauche':
			if ( partie.Nasicas.coordonnees.x > 0 ) {
				dx--;
                if (partie.carte[dy][dx] === 0) { 
                    partie.Nasicas.coordonnees.x -= 1;
				}
			}
			break;
		
		case 'bas':
			if ( partie.Nasicas.coordonnees.y < partie.carte.length ) {
				dy++;
                if (partie.carte[dy][dx] === 0) { 
                    partie.Nasicas.coordonnees.y += 1;
				}
			}
			break;
	}

	fs.writeFileSync(`test.json`, JSON.stringify(partie) ,"UTF-8");
}


module.exports = index;
