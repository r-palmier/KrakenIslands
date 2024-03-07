//requête créant la partie et les fichiers qui vont avec

"use strict";

const fs = require("fs");
const mod_init_json = require("./mod_init_json.js");
const trans_html = require("./mod_aff_html.js");

function trait(req, res, query, carte) {

	let marqueurs = {};
	let page;
	
	let nom_parties = query.nom_partie;
	let index_p = [];
	let unique = true;
	let sauvegarde = {};
	let valide;
	let x1;

	index_p = JSON.parse(fs.readFileSync("index_parties.json", "UTF-8"));

	//on vérifie si le nom de la partie n'est pas vide
	if(query.nom_partie === "") {
		page = fs.readFileSync("m_creation_partie.html", "UTF-8")
		
		marqueurs.haut = carte.length;
		marqueurs.larg = carte[0].length;

		marqueurs.carteAff = trans_html(carte, 5);
		marqueurs.erreur = "Veuillez remplir ce champ avant de continuer";
		page = page.supplant(marqueurs);

	} else {
		for(let i = 0;i < index_p.length;i++) {
			if(index_p[i].partie === nom_parties) {
				page = fs.readFileSync("m_creation_partie.html", "UTF-8");
				
				marqueurs.haut = carte.length;
				marqueurs.larg = carte[0].length;
				marqueurs.carteAff = trans_html(carte, 5);
				marqueurs.erreur = "Une partie est déjà en cours avec ce nom, merci d'en choisir un autre";
				page = page.supplant(marqueurs);
				unique = false;
				break;
			} else {
				unique = true;
			}
		}

		if(unique === true) {
			page = fs.readFileSync('m_salle_attente.html', "UTF-8");

			index_p.push({
				"partie": nom_parties,
				"Player_1": req.headers.cookie,
				"Player_2": null,
				"status_p": "en attente"});

			sauvegarde.carte = carte;
			
			sauvegarde = mod_init_json(req, sauvegarde);

			sauvegarde[req.headers.cookie].coordonnees = {};

            //création du spwan aléatoire sur le coté de la carte du J1
			while (valide !== true) {
				valide = true;
				x1 = Math.floor(Math.random() * (sauvegarde.carte[0].length + 1));

				if(sauvegarde.carte[0][x1] !== 0) {
					valide = false;
				}
			}
			
			//création des coordonées et attributs du j1
			sauvegarde[req.headers.cookie].coordonnees.x = x1;
			sauvegarde[req.headers.cookie].coordonnees.y = 0;
			
			sauvegarde.equipe1 = req.headers.cookie;

			sauvegarde[req.headers.cookie].goal = sauvegarde.carte.length;

			sauvegarde[req.headers.cookie].play = true;

			//écriture de la carte dans un fichier .json
			fs.writeFileSync (`./partie/${nom_parties}.json`, JSON.stringify(sauvegarde), "UTF-8");
			fs.writeFileSync("index_parties.json", JSON.stringify(index_p), "UTF-8");

			marqueurs.partie = nom_parties;
			marqueurs.partie_query = nom_parties;
			page = page.supplant(marqueurs);
		}
	}
	
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();

}

//--------------------------------------------------------------------------

module.exports = trait;
