//module d'affichage du jeu
"use strict";
 
const fs = require("fs");
const mod_aff_html2 = require("./mod_aff_html2.js");
const mod_zone_tir = require("./mod_zone_tir.js");
const mod_autre = require("./mod_autre_pseudo.js");
const mod_dissimulation = require("./mod_dissimulation.js");

function mod_aff(req, res, page, nom_partie, tir, zone, carte) {
    let marqueurs = {};
    let sauvegarde;
	let parties;
    let x, y, i;
	let player_autre = mod_autre(req, nom_partie);
	let dist;

    sauvegarde = JSON.parse( fs.readFileSync(`partie/${nom_partie}.json`, "UTF-8"));

	console.log(req.headers.cookie + " :");
	console.log(sauvegarde[req.headers.cookie]);
	
	//est-ce que le bonus yeux de faucon de l'autre joueur est activé ?
	if (sauvegarde[player_autre].bonus.oeil > 0) {
		sauvegarde[req.headers.cookie].stats.camo += 2;
	}

	//mise en place du bateau sur la carte selon les coord du joueur
	for (y = 0; y <= sauvegarde.carte.length - 1; y++) {
		for (x=0; x<= sauvegarde.carte[0].length; x++) {

			//calcul de la distance de la case actuelle par rapport à la position du navire du joueur via un théorème de pythagore
			dist = Math.hypot((sauvegarde[req.headers.cookie].coordonnees.y - y), (sauvegarde[req.headers.cookie].coordonnees.x - x));

			//affichage du bateau
			if (sauvegarde[req.headers.cookie].coordonnees.y === y && sauvegarde[req.headers.cookie].coordonnees.x === x) {

				//affichage de la bonne icone
				if(req.headers.cookie === sauvegarde.equipe1) {
					if(dist <= sauvegarde[req.headers.cookie].stats.camo) {
						sauvegarde.carte[y][x] = "b_p";
					} else {
						sauvegarde.carte[y][x] = "b";
					}
				}else { 
					if(dist <= sauvegarde[req.headers.cookie].stats.camo) {
						sauvegarde.carte[y][x] = "b_2_p";
					} else {
						sauvegarde.carte[y][x] = "b_2";
					}
				}
			//affichage de la zone bleu clair si la case est dans la zone de visibilité du navire
			} else if (dist <= sauvegarde[req.headers.cookie].stats.camo && sauvegarde.carte[y][x] === 0) {
				sauvegarde.carte[y][x] = "zb";
			}
		}
	}

	//mise en place de la zone d'après tir si elle doit y être
	if(sauvegarde[player_autre].a_tire === true && sauvegarde[player_autre].play === false) {
		sauvegarde = mod_zone_tir(req, nom_partie, sauvegarde);
	}
	
	//mod_dissimulation, pour voir si le joueur ennemi est a portée de vue, et si oui l'afficher
	sauvegarde = mod_dissimulation(req, nom_partie, sauvegarde, dist);

    //entrée de la carte dans l'html
    marqueurs.carteAff = mod_aff_html2(req, sauvegarde, 15, tir);
	marqueurs.partie_query = nom_partie;

	//changement d'états des bouttons en fonction de la situation
	if(sauvegarde[req.headers.cookie].tour === 0) {
		//phase 1
		marqueurs.d_espion = "disabled";
		marqueurs.d_sabot = "disabled";
		marqueurs.d_yeux = "disabled";
		marqueurs.d_barils = "disabled";
		marqueurs.d_tir = "disabled";
		marqueurs.d_depl = "";
		marqueurs.d_kraken = "disabled";
		marqueurs.d_tour = "disabled";

	} else if (sauvegarde[req.headers.cookie].tour === 1){
		//phase 2
		marqueurs.d_espion = "";
		marqueurs.d_sabot = "";
		marqueurs.d_yeux = "";
		marqueurs.d_barils = "";
		marqueurs.d_tir = "";
		marqueurs.d_depl = "disabled";
		marqueurs.d_kraken = "";
		marqueurs.d_tour = "";

	} else if (sauvegarde[req.headers.cookie].tour === 2){
		//phase 3
		marqueurs.d_espion = "disabled";
		marqueurs.d_sabot = "disabled";
		marqueurs.d_yeux = "disabled";
		marqueurs.d_barils = "disabled";
		marqueurs.d_tir = "disabled";
		marqueurs.d_depl = "disabled";
		marqueurs.d_kraken = "disabled";
		marqueurs.d_tour = "";

	}
	
	//changement d'état des bonus
	if(sauvegarde[req.headers.cookie].bonus.espion === 0) {
		marqueurs.d_espion = "disabled";
	} 
	if(sauvegarde[req.headers.cookie].bonus.sabotage === 0) {
		marqueurs.d_sabot = "disabled";
	} 
	if(sauvegarde[req.headers.cookie].bonus.faucon === 0) {
		marqueurs.d_yeux = "disabled";
	}
	if(sauvegarde[req.headers.cookie].bonus.barils === 0) {
		marqueurs.d_barils = "disabled";
	} 
	if(sauvegarde[req.headers.cookie].bonus.kraken === 0) {
		marqueurs.d_kraken = "disabled";
	}

	marqueurs.nb_espion = sauvegarde[req.headers.cookie].bonus.espion;
	marqueurs.nb_sabot = sauvegarde[req.headers.cookie].bonus.sabotage;
	marqueurs.nb_yeux = sauvegarde[req.headers.cookie].bonus.faucon;
	marqueurs.nb_barils = sauvegarde[req.headers.cookie].bonus.barils;
	marqueurs.nb_kraken = sauvegarde[req.headers.cookie].bonus.kraken;


	//envoi des pvs des joueurs selon les données récupérée dans le JSON
	marqueurs.pvJ1 = sauvegarde[req.headers.cookie].stats.pv;
	marqueurs.pseudoJ1 = req.headers.cookie;
	marqueurs.pvJ1_p = Math.floor(sauvegarde[req.headers.cookie].stats.pv * (100 / sauvegarde[req.headers.cookie].pvmax));

	marqueurs.pvJ2 = sauvegarde[player_autre].stats.pv;
	marqueurs.pseudoJ2 = player_autre;
	marqueurs.pvJ2_p = Math.floor(sauvegarde[player_autre].stats.pv * (100 / sauvegarde[player_autre].pvmax));

	if(sauvegarde[req.headers.cookie].play === false) {
		marqueurs.c_tour = `style="background: red"`;
		console.log(marqueurs);
	}

    //affichage de la page html
    page = page.supplant(marqueurs);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}

//------------------------------------------------------------------

module.exports = mod_aff;
