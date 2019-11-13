import { ListeSlides } from './slides.js';

class FetchDatas{
    constructor(url){
        this.liste = [];
        this.setUrl(url);

        this.listUI = new ListeSlides();
    }
    /**
     * Modifier l'url et recharger les données
     * @param {string} u La nouvelle adresse à considérer
     */
    setUrl(u){
        this.url = u;
        this.getSlides();
    }
    /**
     * Récupérer la liste des slides dans strapi
     */
    getSlides(){
        fetch(this.url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                this.liste = data;
                this.listUI.setSlidesUI(data);
                console.log(this.liste);
            })
            .catch((e) => {
                console.log("Erreur", e);
            });
    }
    /**
     * Afficher les données dans la liste
     */
    setSlidesUI(){

    }
}

let fd = new FetchDatas('http://neoakitania.ddns.net/slides');