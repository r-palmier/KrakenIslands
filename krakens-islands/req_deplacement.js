"use strict";

const url = require("url");
const fs = require("fs");
const mod_aff = require("./mod_aff.js");
const mod_win = require("./mod_win.js");
const mod_autre = require("./mod_autre_pseudo.js");
const mod_kraken = require("./mod_kraken.js");
const autre_joueur = require("./mod_autre_pseudo.js");

function deplacement(req, res, query) {
	let deplacement;
	let sauvegarde;
	let carte;
	let dx,dy,bx,by;
	let page;
	let autre_joueur = mod_autre(req, query.nom_partie);
	let i,x,y;
	let bombe;

	page = fs.readFileSync("m_jeu.html", "UTF-8");

	deplacement = query.direction;
	sauvegarde = JSON.parse (fs.readFileSync(`./partie/${query.nom_partie}.json`, "UTF-8")); 

	dx = sauvegarde[req.headers.cookie].coordonnees.x;
	dy = sauvegarde[req.headers.cookie].coordonnees.y;

		
	if (sauvegarde[req.headers.cookie].bonus.saboter === false) {
		console.log(sauvegarde[req.headers.cookie]);

		switch(deplacement) {
			case 'haut':
				if (sauvegarde[req.headers.cookie].coordonnees.y > 0) {
					dy--;
					if (sauvegarde.carte[dy][dx] === 0) { 
						sauvegarde[req.headers.cookie].coordonnees.y -= 1;
					}
				}
				break;
			
			case 'droite':
				if ( sauvegarde[req.headers.cookie].coordonnees.x < sauvegarde.carte[0].length ) {
					dx++;
					if (sauvegarde.carte[dy][dx] === 0) { 
						sauvegarde[req.headers.cookie].coordonnees.x += 1;
					}
				}
				break;
			
			case 'gauche':
				if ( sauvegarde[req.headers.cookie].coordonnees.x > 0 ) {
					dx--;
					if (sauvegarde.carte[dy][dx] === 0) { 
						sauvegarde[req.headers.cookie].coordonnees.x -= 1;
					}
				}
				break;
			
			case 'bas':
				if ( sauvegarde[req.headers.cookie].coordonnees.y < sauvegarde.carte.length -1 ) {
					dy++;
					if (sauvegarde.carte[dy][dx] === 0) { 
						sauvegarde[req.headers.cookie].coordonnees.y += 1;
					}
				break;
				}
		} 
		sauvegarde[req.headers.cookie].tour += 1;
					
		for (i = sauvegarde[req.headers.cookie].bonus.bombes.length -1; i >= 0; i--) {
			bx = sauvegarde[req.headers.cookie].bonus.bombes[i].x;
			by = sauvegarde[req.headers.cookie].bonus.bombes[i].y;

			if (dx === bx && dy === by) {
				console.log ("attention bombe");
				sauvegarde[req.headers.cookie].stats.pv =- Math.round(30 * (sauvegarde[req.headers.cookie].stats.pv/100));
			}
		}
	}
	

	sauvegarde = mod_kraken(req, sauvegarde, query.nom_partie);
	console.log(sauvegarde[req.headers.cookie].bonus);

	fs.writeFileSync(`./partie/${query.nom_partie}.json`,JSON.stringify(sauvegarde) ,"UTF-8");
	page = mod_win(req, query.nom_partie, page);
	mod_aff(req, res, page, query.nom_partie);
}


module.exports = deplacement;
