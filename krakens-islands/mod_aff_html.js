//module d'affichage de la carte sur une page html

"use strict";

function trans_html(carte, tpixel){
	let display = [];
	let y = 0, x = 0;
	let color = "";
	
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
			}
			//on met dans la variable display un bout de code html, qui correspond à un carré de couleur
			//c'est tout ces carrés de couleurs assemblés qui font une carte
	
			display.push(`<span class="${color}" style=" width: ${tpixel}px; height: ${tpixel}px";></span>`);
		
			x++;
		}
		//saut de ligne
		display.push("</span>");
		y++;
	}
	display = display.join("");

	return display;

}

module.exports = trans_html;
