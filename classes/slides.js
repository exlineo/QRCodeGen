export class ListeSlides {
    liste;
    url;
    btn;
    canvas;
    imageID;

    constructor() {
        this.canvas = document.querySelector('canvas');
        this.getListe();
        this.setDownload();
    }
    /**
     * Récupérer l'élément du DOM dans lequel nous écrirons les données
     */
    getListe() {
        this.liste = document.querySelector("aside ul");
        console.log(this.liste);
    }
    /**
     * Afficher une liste de slides et gérer le clic de souris
     * @param {Array} tab Tableau des données à traiter dans la liste
     */
    setSlidesUI(tab){
        for(let t of tab){
            let l = document.createElement('li');
            l.textContent = t.manip;
            l.setAttribute("data-id", t.id);
            l.setAttribute("title", t.manip+"_"+t.id);
            l.setAttribute("data-url", "http://neoakitania.ddns.net/slides/:"+t.id)
            l.addEventListener("click", (e)=>{
                this.url = e.target.getAttribute("data-url");
                console.log(this.url);
                this.imageID = e.target.getAttribute("title")+".png";
                this.btn.setAttribute('download', e.target.getAttribute("title")+".png");
                console.log(this.imageID);
                this.setQRCode();
            })
            this.liste.appendChild(l);
        }
    }
    /**
     * Générer le QRCode
     */
    setQRCode(){
        // Gérer le QRCode en fonction de l'adresse choisie.
        QRCode.toCanvas(this.canvas, this.url, { version: 20 }, function (error) {
            if (error) console.error(error)
            console.log('success!');
        })
    }
    
    setDownload(){
        let section = document.querySelector("main > section");
        this.btn = document.createElement("a");
        this.btn.setAttribute('href', '#');
        this.btn.setAttribute('download', 'qrcode.png');
        this.btn.textContent = 'Télécharger';
        this.btn.addEventListener('click', this.onClickAnchor());
        section.appendChild(this.btn);
    }
    onClickAnchor() {
        console.log("this", this);
        if (window.navigator.msSaveBlob) {
            console.log("this", this);
          window.navigator.msSaveBlob(document.querySelector('canvas'), this.imageID);
          e.preventDefault();
        } else {
          // this.btn.setAttribute('download', this.imageID);
          this.btn.setAttribute('href', this.canvas.toDataURL());
        }
      }
}