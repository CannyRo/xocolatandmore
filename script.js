console.log("Javascript is ON");

const app = {
    init : function(){
        console.log("INIT");
        // Mettre en place l'affichage des cards
        //
        // Création de l'HTM, CSS de chaque produits avec seulement les 20 premiers en display block ou flex...
        // A partir du 21ème les produits ont un "display:none"
    },

    fetchDatas : function(){
        console.log("On recherche dans les datas")
    },

    createCards : function(){
        console.log("On crée toutes les cartes");
    },
    
    showCards : function(){
        console.log("On montre les premières cartes")
    },

    showMore :  function(){
        console.log("On montre tous les autres produits")
    }, 

    openModal : function(props){
        console.log("On ouvre la modal : ");
        console.log(props);
        let modalToShow = document.getElementById(props);
        
        let noScroll = document.createAttribute("class");
        noScroll.value="deleteScroll";
        document.body.setAttributeNode(noScroll);

        modalToShow.classList.remove("hidden");
    },

    closeModal : function(props){
        console.log("On ferme la modal : ");
        console.log(props);
        let modalToClose = document.getElementById(props);
        modalToClose.classList.add("hidden");
        document.body.classList.remove("deleteScroll");
    },

    openMenu : function(props){
        console.log("On ouvre le menu");
        let menuToOpen = document.getElementById(props);
        
        let noScroll = document.createAttribute("class");
        noScroll.value="deleteScroll";
        document.body.setAttributeNode(noScroll)
        
        menuToOpen.style.height = "100vh";
    },

    closeMenu : function(props){
        console.log("On ferme le menu");
        let menuToClose = document.getElementById(props);
        menuToClose.style.height = "0vh";
        document.body.classList.remove("deleteScroll");
    }
};
document.addEventListener("DOMContentLoaded", app.init)