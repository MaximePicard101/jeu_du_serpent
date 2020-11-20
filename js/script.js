
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
        }

        verifTouche(evt){

        }

        deplacement(dirCode){

        }

        controleSerpent(){

        }

        dessineCarre(x, y){

        }

        supprimeSerpent(){

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