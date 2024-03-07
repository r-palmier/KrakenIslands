//module de génération d'une carte random, via du bruit cohérent

"use strict"

const SimplexNoise = require("simplex-noise");
const fs = require("fs");

//paramètre de la carte | à changer aussi dans le generation.js si on aff dans la console
const h_eau = 0.60;
const h_terre = 0.75;
const zoom = 0.08;

function generation(seed, hauteur, largeur) {
	const t_ilecentre = Math.min(hauteur, largeur) / 6;
	
	const simplex = new SimplexNoise(seed);
	let carte = [];
	let y, x; //hauteur / largeur
	let x_p, y_p;
	let d_centre;
	let dx, dy;
	
	//mise en place du tableau en 2D
	for(y = 0;y < hauteur;y++) {	
		carte.push([]);

		for(x = 0;x < largeur;x++) {
			carte[y].push(0);
		}
	}
	y = 0;

	while (y < hauteur/2) {		//remplissage du tableau carte pour l'afficher
		x = 0;
		while(x < largeur){
			//on zoom sur la map, le x puis le y
			x_p = x * zoom;
			y_p = y * zoom;
			//génération des valeurs via le simplex-noise (bruit cohérent)
			carte[y][x] = Math.max(simplex.noise2D(x_p, y_p), 0);
			
			//Calcul via pythagore pour avoir la distance
			dx = (largeur / 2) - x;		
			dy = (hauteur / 2) - y;		
			d_centre = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
			
			//generation de l'ile centrale
			if(d_centre < t_ilecentre * 1.5) {		
				const cos = Math.cos(d_centre / (t_ilecentre * 0.5)) + 1.2;
				carte[y][x] = cos * (cos + carte[y][x]);

			}	
			
			//changement des valeurs de 0,....... à 0, 1, ou 2
			if(carte[y][x] > h_eau && carte[y][x] < h_terre) {
				carte[y][x] = 1;
			}else if (carte[y][x] > h_terre) {
				carte[y][x] = 2;
			}else{
				carte[y][x] = 0;
			}
			
			x++;
		}
		y++;
	}
	
	//symétrie
	while(y < hauteur) {
		x = 0;
		while(x < largeur){
			carte[y][x] = carte[hauteur - (y + 1)][x]; 
			x++;
		}
		y++;
	}
	
	//écriture de la carte dans un fichier .json
	fs.writeFileSync("carte.json", JSON.stringify(carte), "UTF-8");

	return carte;
}

module.exports = generation;
