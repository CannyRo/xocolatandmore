const navbarManager = {
    init : function(){
        console.log("INIT : navbarManager")
    },
    openModal : function(props){
        if(props == "searchModal"){
            let otherModal = document.getElementById("loginModal");
            if(!otherModal.classList.contains("hidden")){
                otherModal.classList.add("hidden");
            }
        }
        if(props == "loginModal"){
            let otherModal = document.getElementById("searchModal");
            if(!otherModal.classList.contains("hidden")){
                otherModal.classList.add("hidden");
            }
        }
        navbarManager.closeMenu('burgerMenuContainer');
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
        let loginModal = document.getElementById("loginModal");
        let searchModal = document.getElementById("searchModal");
        if(!loginModal.classList.contains("hidden")){
            loginModal.classList.add("hidden");
        }
        if(!searchModal.classList.contains("hidden")){
            searchModal.classList.add("hidden");
        }
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
document.addEventListener("DOMContentLoaded", navbarManager.init)