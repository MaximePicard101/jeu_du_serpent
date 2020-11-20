
document.addEventListener("DOMContentLoaded", function(event) {


    //Le jeu

    class Jeu{    //Pour les fonctions d'objets, lettre majuscules

        constructor(_idSvg, _idPointage){  //initialise les objets, objets utilisent juste pendant cette methode

            console.log("creationDuJeu");

            this.s = Snap(_idSvg);  //Afin de ne pas perdre notre variable on la collectionne ici

            this.sortiPointage = document.querySelector(_idPointage);

            this.grandeurCarre = 20;  //de 20px de large
            this.grandeurGrille = 15; //15 colonnes

        }

        nouvellePartie(){

            this.finPartie();

            this.affichagePointage(1);

            this.pomme = new Pomme(this);     //avec this, on ratache l'objet a la fonction jeu, lit la pomme avec le jeu
            this.serpent = new Serpent(this);
        }

        finPartie(){
        if(this.pomme !== undefined){  //Si il y a ujne pomme quiexiste, supprime la
            this.pomme.supprimePomme();
            this.pomme = undefined;
        }

        if(this.serpent !== undefined){
            this.serpent.supprimeSerpent();
            this.serpent = undefined;
        }

        }

        affichagePointage(_lePointage){
            this.sortiPointage.innerHTML = _lePointage;   //on va placer notre pointage dans le html
        }
    }




    //Le serpent

    class Serpent{

        constructor(_leJeu){

            console.log("creationDuSerpent");

            this.leJeu = _leJeu;  //Permet de ne pas supprimer le parametre comme d'habitude;

            this.currentX = -1;
            this.currentY = 0;

            this.nextMoveX = 1;
            this.nextMoveY = 0;

            this.serpentLongueur = 1;
            this.tblCarreSerpent = [];

            this.touche = false;  //je ne touche pas aux limites

            this.vitesse = 250;
            this.timing = setInterval(this.controleSerpent.bind(this), this.vitesse);

            document.addEventListener("keydown", this.verifTouche.bind(this)) //PROBLME REGLE-avec Bind, on met la fonction associe au contexte de this(le serpent)
        }

        verifTouche(_evt){

            var evt = _evt;  //selectionne la touche

            console.log(evt.keyCode);

            this.deplacement(evt.keyCode);  //this equivaut a document et non a serpent, PROBLEME

        }

        deplacement(dirCode){

            switch(dirCode){
                case 37:
                    this.nextMoveX = -1;
                    this.nextMoveY = 0;
                    break;
                case 38:
                    this.nextMoveX = 0;
                    this.nextMoveY = -1;
                    break;
                case 39:
                    this.nextMoveX = 1;
                    this.nextMoveY = 0;
                    break;
                case 40:
                    this.nextMoveX = 0;
                    this.nextMoveY = 1;
                    break;
            }

            //console.log(this.nextMoveX, this.nextMoveY);
        }

        controleSerpent(){
            var nextX = this.currentX + this.nextMoveX;  // Associe position actuel avec son deplacement selon les fleches
            var nextY = this.currentY + this.nextMoveY;

            this.tblCarreSerpent.forEach(function(element){
                if(nextX === element[1] && nextY === element[2]){ //si je touche moi-meme, meme position qu'un corps ancien du serpent
                    this.leJeu.finPartie();
                    this.touche=true;
                }
        }.bind(this));

            if(nextY < 0 || nextX < 0 || nextY > this.leJeu.grandeurGrille-1 || nextX > this.leJeu.grandeurGrille-1){

                console.log("Touche limite!");
                this.leJeu.finPartie();
                this.touche = true;

            }

            if(!this.touche){ //si je ne touche pas au limites, on creer un nouvceau serpent

                if(this.currentX === this.leJeu.pomme.pomme[1] && this.currentY === this.leJeu.pomme.pomme[2]){
                    this.serpentLongueur ++;

                    this.leJeu.affichagePointage(this.serpentLongueur);

                    this.leJeu.pomme.supprimePomme();
                    this.leJeu.pomme.ajoutePomme();
                }

            this.dessineCarre(nextX, nextY); //dessine carre a la position courante;
            this.currentX = nextX;
            this.currentY = nextY;
            }
            }

        dessineCarre(x, y){

            var unCarre = [this.leJeu.s.rect(x * this.leJeu.grandeurCarre, y * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre), x, y]; //creer un carré de 20x20 a la position courante

            this.tblCarreSerpent.push(unCarre);

            if(this.tblCarreSerpent.length > this.serpentLongueur){
                this.tblCarreSerpent[0][0].remove();
                this.tblCarreSerpent.shift();
            }

        }

        supprimeSerpent(){
            clearInterval(this.timing);

            while(this.tblCarreSerpent.length >0){
                this.tblCarreSerpent[0][0].remove();
                this.tblCarreSerpent.shift();
            }
        }

    }




    //La pomme

    class Pomme{

        constructor(_leJeu){
            console.log("creationDeLaPomme");

            this.leJeu = _leJeu;  //Permet de ne pas supprimer le parametre comme d'habitude;

            this.pomme = [];

            this.ajoutePomme();
        }

        ajoutePomme(){

            var posX = Math.floor(Math.random() * this.leJeu.grandeurGrille); //place la pomme aleatoirement dans la grille, avec un nombre plein grace a floor
            var posY = Math.floor(Math.random() * this.leJeu.grandeurGrille); //place la pomme aleatoirement dans la grille, avec un nombre plein grace a floor

            this.pomme = [this.leJeu.s.rect(posX*this.leJeu.grandeurCarre, posY*this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre ).attr({fill:'red'}), posX, posY]; //creer un rectangle de 20 par 20 dans une des colonnes aleatopires, et un tableau
        }

        supprimePomme(){
            this.pomme[0].remove(); //supprime l'element 0 du tableau
        }
    }


    var unePartie = new Jeu("#jeu", "#pointage"); //creer une nouvelle partie, en recuperant les elements dans le index.html

    var btnJouer = document.querySelector("#btnJouer");  //recupere le bouton dans le html
    btnJouer.addEventListener('click', nouvellePartie);

    function nouvellePartie(){
        unePartie.nouvellePartie();
    }

});