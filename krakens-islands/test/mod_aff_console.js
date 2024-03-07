//module d'affichage de la carte dans la console

"use strict"

const colors = require("colors/safe");

function couleurs (hauteur, largeur, carte) {
	let y = 0, x = 0;
	
	while (y < hauteur) {	//boucle qui affiche une couleur pour chaque selon son chiffre 0, 1, ou 2
        x = 0;

        while (x < largeur){
			if (carte[y][x] === 1) {
				//Plage
				process.stdout.write(colors.bgYellow("  "));

			}else if (carte[y][x] === 2) {
				//Terre
				process.stdout.write(colors.bgGreen("  "));

			}else {
				//Mer
				process.stdout.write(colors.bgBlue("  "));

			}

			x++;
		}
		y++;
		console.log();
	}

};

module.exports = couleurs;

