const galleryManager = {
    init : function(){
        console.log("INIT galerie");
        galleryManager.currentSlide = 1;
    },
    openGalModal : function(x){
        // console.log("Open modal / SUR LA PHOTO N° ", x);
        let galModalToShow = document.getElementById("gallery_modal");
        let galNoScroll = document.createAttribute("class");
        galNoScroll.value="deleteScroll";
        document.body.setAttributeNode(galNoScroll);
        galModalToShow.classList.remove("hidden");
        galleryManager.currentSlide = x;
        galleryManager.showImage(galleryManager.currentSlide)
    },
    closeGalModal : function(){
        console.log("Close modal");
        document.getElementById("gallery_modal").classList.add("hidden");
        document.body.classList.remove("deleteScroll");
    },
    showImage : function(x){
        galleryManager.currentSlide = x;
        console.log("SHOW IMAGE")
        let allGalleryImageContainer = document.getElementsByClassName("img_gal_container");
        for (let i = 0; i < allGalleryImageContainer.length; i++) {
            if(allGalleryImageContainer[i].classList.contains("hidden")){
            } else {
                allGalleryImageContainer[i].classList.add("hidden");
            }
        }
        allGalleryImageContainer[x-1].classList.remove("hidden");
    },
    changeImage : function(y){
        let newImageToShow = y + galleryManager.currentSlide;
        if(newImageToShow>24){
            newImageToShow = 24
        }
        if(newImageToShow<1){
            newImageToShow = 1
        }
        galleryManager.showImage(newImageToShow);
    },
    changeImageBis : function(y){
        let newImageToShow = y + galleryManager.currentSlide;
        if(newImageToShow>34){
            newImageToShow = 34
        }
        if(newImageToShow<1){
            newImageToShow = 1
        }
        galleryManager.showImage(newImageToShow);
    },
};
document.addEventListener("DOMContentLoaded", galleryManager.init)