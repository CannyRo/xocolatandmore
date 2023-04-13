const navbarManager = {
    init : function(){
        console.log("INIT : navbarManager")
    },
    openModal : function(props){
        if(props == "searchModal"){
            let otherModal_1 = document.getElementById("loginModal");
            if(!otherModal_1.classList.contains("hidden")){
                otherModal_1.classList.add("hidden");
            }
            let otherModal_2 = document.getElementById("courseModal");
            if(!otherModal_2.classList.contains("hidden")){
                otherModal_2.classList.add("hidden");
            }
        }
        if(props == "loginModal"){
            let otherModal_1 = document.getElementById("searchModal");
            if(!otherModal_1.classList.contains("hidden")){
                otherModal_1.classList.add("hidden");
            }
            let otherModal_2 = document.getElementById("courseModal");
            if(!otherModal_2.classList.contains("hidden")){
                otherModal_2.classList.add("hidden");
            }
        }
        if(props == "courseModal"){
            let otherModal_1 = document.getElementById("searchModal");
            if(!otherModal_1.classList.contains("hidden")){
                otherModal_1.classList.add("hidden");
            }
            let otherModal_2 = document.getElementById("loginModal");
            if(!otherModal_2.classList.contains("hidden")){
                otherModal_2.classList.add("hidden");
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
        let courseModal = document.getElementById("courseModal");
        if(!loginModal.classList.contains("hidden")){
            loginModal.classList.add("hidden");
        }
        if(!searchModal.classList.contains("hidden")){
            searchModal.classList.add("hidden");
        }
        if(!courseModal.classList.contains("hidden")){
            coursehModal.classList.add("hidden");
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