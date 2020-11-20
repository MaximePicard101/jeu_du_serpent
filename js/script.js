
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

            this.affichagePointage(1);

            this.pomme = new Pomme();     //avec this, on ratache l'objet a la fonction jeu
            this.serpent = new Serpent();
        }

        finPartie(){

        }

        affichagePointage(_lePointage){

            this.sortiPointage.innerHTML = _lePointage;   //on va placer notre pointage dans le html


        }
    }

    //Le serpent

    class Serpent{

        constructor(){

            console.log("creationDuSerpent");
        }
    }

    //La pomme

    class Pomme{

        constructor(){

            console.log("creationDeLaPomme");
        }
    }


    var unePartie = new Jeu("#jeu", "#pointage"); //creer une nouvelle partie, en recuperant les elements dans le index.html

    var btnJouer = document.querySelector("#btnJouer");  //recupere le bouton dans le html
    btnJouer.addEventListener('click', nouvellePartie);

    function nouvellePartie(){
        unePartie.nouvellePartie();
    }

});