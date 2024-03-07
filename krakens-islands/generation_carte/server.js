//programme gérant un serveur local pour afficher une map sur un site

"use strict";

const http = require("http");
const url = require("url");
const fs = require("fs");

const req_statique = require("./req_statique");
const generation = require("./mod_gen_carte");
const mod_aff_html = require("./mod_aff_html");
const req_deplacement = require("./req_deplacement.js");

let mon_serveur;
let port;

function index(req, res) {
	let requete;
	let pathname;
	let query;
	
	console.log("url reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	//gestion des requètes
	switch(pathname) {
		case '/':
		case '/req_aff':
			req_aff(req, res);
			break;
		case '/req_deplacement':
			req_deplacement(req, res, query);
			req_aff(req, res);
			break;
		default:
			req_statique(req, res, pathname);
			break;
	}
}

function req_aff(req, res) {
	let page;
	let marqueurs = {};
	let partie;
	let coordonnees;
	let x, y;

	page = fs.readFileSync("m_test_gen.html", "UTF-8");
	
	 partie = JSON.parse( fs.readFileSync("test.json", "UTF-8"));
	//partie = { carte: generation(undefined, 50, 30) };

	
	for (y = 0; y <= partie.carte.length; y++) {
		for (x=0; x<= partie.carte[0].length; x++) {
			if (partie.Nasicas.coordonnees.y === y && partie.Nasicas.coordonnees.x === x) {
				partie.carte[y][x] = "b";
			}
		}
	}
	
	//rentrée de la carte dans l'html
	marqueurs.carteAff = mod_aff_html(partie.carte, 15);
	marqueurs.nbpx = 15;
	page = page.supplant(marqueurs);

	//affichage de la page html
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
}



//gestion du serveur local
mon_serveur = http.createServer(index);
port = 5000;
console.log("listen port " + port);
mon_serveur.listen(port);
