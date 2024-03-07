//Test de génération d'îles

"use strict"

const colors = require ("colors/safe");
const SimplexNoise = require ("simplex-noise");

const affichage = require ("./mod_aff_console.js");
const generation = require ("./mod_gen_carte.js");


//paramètres de la carte | à changer aussi dans le module de génération
const hauteur = 30;
const largeur = 20;

let seed;
let carte = [];

//module de génération de la carte
seed = String(Math.floor(Math.random() * 1e8));
seed = "50609125";
carte = generation(seed, hauteur, largeur);

//affichage dans la console
console.log(seed);
affichage(hauteur, largeur, carte);

