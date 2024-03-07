//requête permettant de quitter une partie dans une salle d'attente, et de supprimer son fichier

"use strict";

const fs = require("fs");

function trait(req, res, query) {

    let marqueurs = {}; 
    let page;
	let nom_partie;
	let liste_partie;
	let i;

    // AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('m_menu.html', 'utf-8')
    
    marqueurs.pseudo = req.headers.cookie;
    page = page.supplant(marqueurs);
	nom_partie = query.nom_partie;
    fs.unlinkSync (`./partie/${nom_partie}.json`);

	liste_partie = fs.readFileSync('index_parties.json', 'utf-8');
	liste_partie = JSON.parse(liste_partie);
	
	for(i = 0;i < liste_partie.length;i++) {
		if(liste_partie[i].partie === nom_partie) {	
			liste_partie.splice(i,1);

			fs.writeFileSync ("index_parties.json", JSON.stringify(liste_partie), "UTF-8");
		}
	}

	

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = trait;

