//=========================================================================
// Site WEB demo PI
// Auteurs : P. Thiré & T. Kerbrat
// Version : 09/11/2018
//=========================================================================

"use strict";

const http = require("http");
const url = require("url");
let mon_serveur;
let port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

const req_accueil = require("./req_accueil.js");
const req_credits = require("./req_credits.js");
const req_afficher_connexion = require("./req_afficher_connexion.js");
const req_afficher_inscription = require("./req_afficher_inscription.js");
const req_identifier = require("./req_identifier.js");
const req_inscrire = require("./req_inscrire.js");
const req_menu = require("./req_menu.js");
const req_afficher_creation = require("./req_afficher_creation.js");
const req_afficher_rejoindre = require("./req_afficher_rejoindre.js");
const req_creer = require("./req_creer.js");
const req_actualiser_attente = require("./req_actualiser_attente.js");
const req_rejoindre = require("./req_rejoindre.js");
const req_quitter_partie = require("./req_quitter_partie.js");
const req_choix_bateau = require("./req_choix_bateau.js");
const req_actualiser_attente2 = require("./req_actualiser_attente2.js");
const req_tour_suivant = require("./req_tour_suivant.js");
const req_actualiser_jeu = require("./req_actualiser_jeu.js");
const req_afficher_tir = require("./req_afficher_tir.js");
const req_tir = require("./req_tir.js");
const req_deplacement = require ("./req_deplacement.js");
const req_bonus = require ("./req_bonus.js");
const mod_win = require ("./mod_win.js");         

const req_statique = require("./req_statique.js");
const req_erreur = require("./req_erreur.js");
	
let carte = [];
let pseudo;

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

const traite_requete = function (req, res) {

	let requete;
	let pathname;
	let query;
	let prefab = {};

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_retour_accueil':
				req_accueil(req, res);
				break;
			case '/req_afficher_credits':
				req_credits(req, res);
				break;
			case '/req_afficher_connexion':
				req_afficher_connexion(req, res, query);
				break;
			case '/req_afficher_inscription':
				req_afficher_inscription(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case'/req_menu':
				req_menu(req, res, query);
				break;
			case '/req_afficher_creation':
				carte = req_afficher_creation(req, res, query);
				break;
			case `/req_quitter_partie`:
				req_quitter_partie (req, res, query)
				break;
			case '/req_afficher_rejoindre':
				req_afficher_rejoindre(req, res);
				break;
			case '/req_creer':
				req_creer(req, res, query, carte);
				break;
			case '/req_actualiser_attente':
				req_actualiser_attente(req, res, query);
				break;
			case '/req_rejoindre':
				req_rejoindre(req, res, query);
				break;
			case '/req_choix_bateau':
				req_choix_bateau(req, res, query);
				break;
			case '/req_actualiser_attente2':
				req_actualiser_attente2(req, res, query);
				break;
			case '/req_tour_suivant2':
				req_tour_suivant2(req, res, query);
				break;
			case '/req_tour_suivant':
				req_tour_suivant(req, res, query);
				break;
			case '/req_actualiser_jeu':
				req_actualiser_jeu(req, res, query);
				break;
			case '/req_afficher_tir':
				req_afficher_tir(req, res, query);
				break;
			case '/req_tir':
				req_tir(req, res, query);
				break;
			case '/req_deplacement':
				req_deplacement (req, res, query);
				break;
			case '/req_bonus':
				req_bonus (req, res, query);
				break;
			default:
				req_statique(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

mon_serveur = http.createServer(traite_requete);
port = 5000;
//port = process.argv[2];
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
