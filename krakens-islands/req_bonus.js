"use strict";

const url = require("url");
const fs = require("fs");
const mod_aff = require("./mod_aff.js");
const mod_win = require("./mod_win.js");
const mod_autre = require("./mod_autre_pseudo.js");

function bonus (req, res, query)  {
	
    let partie;
	let x, y;
    let carte;
    let page;
	let bonus;
	let espion, sabotage, faucon, barils,kraken;
	let vision, saboter, oeil, bombes; 
	let player_autre;
	let rien = 0;

	page   = fs.readFileSync("m_jeu.html", "UTF-8");
	bonus  = query.bonus;
	player_autre = mod_autre(req, query.nom_partie);
	partie = JSON.parse (fs.readFileSync(`./partie/${query.nom_partie}.json`, "UTF-8"));

	espion = partie[req.headers.cookie].bonus.espion;
	sabotage = partie[req.headers.cookie].bonus.sabotage;
	faucon = partie[req.headers.cookie].bonus.faucon;
	barils = partie[req.headers.cookie].bonus.barils;
	kraken = partie[req.headers.cookie].bonus.kraken;

    vision = partie[req.headers.cookie].bonus.vision;
    saboter = partie[req.headers.cookie].bonus.saboter;
    oeil   = partie[req.headers.cookie].bonus.oeil;
    bombes = partie[req.headers.cookie].bonus.bombes;



	switch(bonus) {
		case 'espion':
			if (espion > 0) {
				espion --;
				partie[req.headers.cookie].bonus.vision = true;
				partie[req.headers.cookie].bonus.espion = espion;
				partie[req.headers.cookie].tour += 1;
    			fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(partie) ,"UTF-8");
				x = partie[player_autre].coordonnees.x;
				y = partie[player_autre].coordonnees.y;

				partie.carte[y][x] = "b";

			}
		break;

        case 'sabotage':
            if (sabotage > 0) {
                sabotage --;
				partie[player_autre].bonus.saboter = true;
				partie[req.headers.cookie].bonus.sabotage = sabotage;
				partie[req.headers.cookie].tour += 1;
    			fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(partie) ,"UTF-8");
            }
        break;

        case 'faucon':
            if (faucon > 0) {
                faucon --; console.log("faucon");
				partie[req.headers.cookie].bonus.oeil = 2;
				partie[req.headers.cookie].bonus.faucon = faucon;
				partie[req.headers.cookie].tour += 1;
				fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(partie) ,"UTF-8");
            }
        break;

        case 'barils':
            if (barils > 0) {
                barils --;console.log("barils");
				partie[req.headers.cookie].bonus.barils = barils;
				partie[req.headers.cookie].bonus.bombes.push (partie[req.headers.cookie].coordonnees);

				partie[req.headers.cookie].tour += 1;
    			fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(partie) ,"UTF-8");
            }
        break;

        case 'kraken':
            if (kraken > 0) {
                kraken --;
				partie[player_autre].stats.pv -= Math.round ( 70 * (partie[player_autre].stats.pv / 100));
				partie[req.headers.cookie].bonus.kraken = kraken;
				partie[req.headers.cookie].tour += 1;
    			fs.writeFileSync(`./partie/${query.nom_partie}.json`, JSON.stringify(partie) ,"UTF-8");
				console.log("kraken");
            }
        break;
		console.log ("req_bonus:" + espion, sabotage, faucon, barils, kraken);
	}
    
	page = mod_win(req, query.nom_partie, page);
    mod_aff(req, res, page, query.nom_partie, undefined, rien, carte);
}


module.exports = bonus;





