//module d'affichage de la carte sur une page html

"use strict";

const mod_autre = require("./mod_autre_pseudo.js");

function trans_html(req, sauvegarde, tpixel, tir){
	let display = [];
	let y = 0, x = 0;
	let color = "";
	let bat = sauvegarde[sauvegarde.equipe1].bateau;
	let bat_2 = sauvegarde[sauvegarde.equipe2].bateau;
	

	//avec cette boucle on remplit le contenu de la variable display, que l'on enverra dans la page html
	
	while(y < sauvegarde.carte.length) {
		x = 0;
		display.push(`<span style="display:flex">`);
		while(x < sauvegarde.carte[y].length) {
			switch(sauvegarde.carte[y][x]){
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
					color = "bateau";
					break;
				case "b_2": 
					color = "bateau_2";
					break;
				case "b_p":
					color = "bateau_p";
					break;
				case "b_2_p": 
					color = "bateau_2_p";
					break;
				case "z":
					color = "zone";
					break;
				case "zb":
					color = "z-detect";
					break;
			}
			//on met dans la variable display un bout de code html, qui correspond à un carré de couleur
			//c'est tout ces carrés de couleurs assemblés qui font une carte
			if(tir !== undefined) {
				if(color === "blue" || color === "zone" || color === "z-detect" /*|| color === "bateau_p" || color === "bateau_2" || color === "bateau_2_p" || color === "bateau"*/ ) {
					//case à cocher 
					display.push(`<input id="toggle_${y}_${x}" type="checkbox" name="tir" value="${y}_${x}" class="z-tir"/><label for="toggle_${y}_${x}" class="${color}-tir"></label>`);
				} else if (color === "bateau_p") {
					//case à cocher 
                    display.push(`<input id="toggle_${y}_${x}" type="checkbox" name="tir" value="${y}_${x}" class="z-tir"/><label for="toggle_${y}_${x}" class="blue-tir"></label>`);

					//bateau selon sa classe
					//display.push(`<input id="toggle_${y}_${x}" type="checkbox" name="tir" value="${y}_${x}" class="z-tir"/><label for="toggle_${y}_${x}" class="bateau" style="background: url(./icones/ico_${bat}_p.png) center/cover"></label>`);
					//display.push(`<span class="bateau" style="background: url(./icones/ico_${bat}_p.png) center/cover"></span>`);
				
				} else if (color === "bateau_2") {
					//case à cocher 
                    display.push(`<input id="toggle_${y}_${x}" type="checkbox" name="tir" value="${y}_${x}" class="z-tir"/><label for="toggle_${y}_${x}" class="blue-tir"></label>`);

					//bateau selon sa classe
					//display.push(`<input id="toggle_${y}_${x}" type="checkbox" name="tir" value="${y}_${x}" class="z-tir"/><label for="toggle_${y}_${x}" class="bateau" style="background:     url(./icones/ico_${bat_2}_2.png) center/cover"></label>`);
					//display.push(`<span class="bateau" style="background: url(./icones/ico_${bat_2}_2.png) center/cover"></span>`);

				} else if (color === "bateau_2_p") {
					//case à cocher 
                    display.push(`<input id="toggle_${y}_${x}" type="checkbox" name="tir" value="${y}_${x}" class="z-tir"/><label for="toggle_${y}_${x}" class="blue-tir"></label>`);

					//bateau selon sa classe
					//display.push(`<input id="toggle_${y}_${x}" type="checkbox" name="tir" value="${y}_${x}" class="z-tir"/><label for="toggle_${y}_${x}" class="bateau" style="background:     url(./icones/ico_${bat_2}_2_p.png) center/cover"></label>`);
					//display.push(`<span class="bateau" style="background: url(./icones/ico_${bat_2}_2_p.png) center/cover"></span>`);
				
				} else if (color === "bateau") {
					//case à cocher 
                    display.push(`<input id="toggle_${y}_${x}" type="checkbox" name="tir" value="${y}_${x}" class="z-tir"/><label for="toggle_${y}_${x}" class="blue-tir"></label>`);

               		//bateau selon sa classe
                    //display.push(`<input id="toggle_${y}_${x}" type="checkbox" name="tir" value="${y}_${x}" class="z-tir"/><label for="toggle_${y}_${x}" class="bateau" style="background: url(./icones/ico_${bat}.png) center/cover"></label>`);
                    //display.push(`<span class="bateau" style="background: url(./icones/ico_${bat_2}_2_p.png) center/cover"></span>`);

				} else {
					//span normal
					display.push(`<span class="${color}" style=" width: ${tpixel}px; height: ${tpixel}px";></span>`);

				}
			} else if (color === "bateau") {
				//bateau selon sa classe
				display.push(`<span class="bateau" style="background: url(./icones/ico_${bat}.png) center/cover"></span>`);

			} else if (color === "bateau_p") {
				//bateau selon sa classe
				display.push(`<span class="bateau" style="background: url(./icones/ico_${bat}_p.png) center/cover"></span>`);
			
			} else if (color === "bateau_2") {
				//bateau selon sa classe
				display.push(`<span class="bateau" style="background: url(./icones/ico_${bat_2}_2.png) center/cover"></span>`);

			} else if (color === "bateau_2_p") {
				//bateau selon sa classe
				display.push(`<span class="bateau" style="background: url(./icones/ico_${bat_2}_2_p.png) center/cover"></span>`);

			} else {
				//span normal
				display.push(`<span class="${color}" style=" width: ${tpixel}px; height: ${tpixel}px"></span>`);

			}
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
