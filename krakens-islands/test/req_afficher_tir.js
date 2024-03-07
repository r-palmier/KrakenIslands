//module d'affichage de la carte sur une page html

"use strict";

const fs = require("fs");

function trans_html(req, res, query){
	let display = [];
	let y = 0, x = 0;
	let color = "";
	let page;
	let marqueurs = {};

	page = fs.readFileSync("./m_jeu.html", "UTF-8");
	
	//avec cette boucle on remplit le contenu de la variable display, que l'on enverra dans la page html
	
	while(y < carte.length) {
		x = 0;
		display.push(`<span style="display:flex">`);

		while(x < carte[y].length) {
			switch(carte[y][x]){
				case 0:
					color = "blue";
					break;
				case 1:
					color = "yellow";
					break;
				case 2:
					color = "green";
					break;
				case "b":
					color = "brown";
			}
			//on met dans la variable display un bout de code html, qui correspond à un carré de couleur
			//c'est tout ces carrés de couleurs assemblés qui font une carte

			if(color === "blue") {
				display.push(`<input id="case_${y}_${x}" type="checkbox" name="tir" class="z-tir"> <label for="case_${y}_${x}" class="l-tir" style="height: 20px; width: 20px></label>`);
			} else {	
				display.push(`<span class="${color.substring(0, 2)}" style=" width: ${tpixel}px; height: ${tpixel}px";></span>`);
			}
			x++;
		}
		//saut de ligne
		display.push("</span>");
		y++;
	}
	display = display.join("");

	marqueurs.carteAff = display;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
}

module.exports = trans_html;
