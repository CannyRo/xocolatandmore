const productManager = {
    // Functions //
    init : function(){
        console.log("INIT productManager")
        // Initialisation des variables //
        productManager.allProduct = [];
        productManager.allNewProduct = [];
        productManager.ketoProduct = [];
        productManager.giftProduct = [];
        productManager.dessertProduct = [];
        productManager.cakeProduct = [];
        productManager.saltProduct = [];
        productManager.xocoProduct = [];

        productManager.sequenceFetch();
    },

    sequenceFetch : function(){

        async function fetchAllProducts() {
            const response = await fetch("../assets/data.json");
            if (!response.ok) {
                const message = `Un error occure : ${response.status}`;
                throw new Error(message);
            }
            productManager.data = await response.json();
        }
        fetchAllProducts()
        .then(() => {
            productManager.allProduct = productManager.data.products;
            productManager.getNewProducts(productManager.allProduct);
            productManager.dispatchProduct(productManager.allProduct);
            productManager.allFamily();
        })
        .catch(error => {
            error.message; // 'An error has occurred: 404'
        });
    },

    getNewProducts : function(products){
        products.map( product => {
            if(product.new == true){
                productManager.allNewProduct.push(product);
            }
        })
    },

    dispatchProduct : function(array){
        array.map( product => {
            let categoryArray = product.visibility;
            categoryArray.map( category => {
                switch(category){
                    case "Todo Keto" :
                        productManager.ketoProduct.push(product);
                        break;
                    case "Anchetas" :
                        productManager.giftProduct.push(product);
                        break;
                    case "Postres" :
                        productManager.dessertProduct.push(product);
                        break;
                    case "Tortas" :
                        productManager.cakeProduct.push(product);
                        break;
                    case "Salados" :
                        productManager.saltProduct.push(product);
                        break;
                    case "Xoco Market" :
                        productManager.xocoProduct.push(product);
                    default :
                        console.log("Aucune categorie correspondante à : ", category);
                        break;
                }
            })
        })
    },

    createCards : function(array){
        let productContainer = document.getElementById("product_container");
        let cardProductContainer = productContainer.firstElementChild;
        let account = 0
        array.map( product =>{
            let card = document.createElement("div");
            account<20 ? card.classList = "card" : card.classList = "card hidden";
            card.id = `${product.id}`;
            cardProductContainer.appendChild(card);

            let imgCard = document.createElement("div");
            imgCard.classList = "card_img_container";
            card.appendChild(imgCard);

            let imgBackground = document.createElement("div");
            imgBackground.classList = "card_background_image";
            imgBackground.style = `background-image: url('../img/${product.image}');`;
            imgCard.appendChild(imgBackground);

            let cardText = document.createElement("div");
            cardText.classList = "card_text";
            card.appendChild(cardText);

            cardText.insertAdjacentHTML("afterbegin", `<h4>${product.name}</h4>`);
            cardText.insertAdjacentHTML("beforeend", `<p>$${product.price[0]},000</p>`);

            let categoryContainer = document.createElement("div");
            categoryContainer.style = `display: flex; flex-direction: column; justify-content: end; align-items: end; width : 100%; height : auto; text-align: end;`;
            cardText.appendChild(categoryContainer);

            let categoryToWrite = product.visibility;

            categoryToWrite.map( category => {
            categoryContainer.insertAdjacentHTML("beforeend", `<p class="badge">#${category}</p>`);
            
            });
            if(product.new == true){
                categoryContainer.insertAdjacentHTML("afterbegin", `<p class="badge">#Nuevo</p>`);
            }
            account++;


            //     <div class="card">
            //         <div class="card_img_container">
            //             <div class="card_background_image"
            //                 style="background-image: url('${product.image}');">
            //             </div>
            //         </div>
            //         <div class="card_text">
            //             <h4>${product.name}</h4> 
            //             <p>${product.price}</p>
            //         </div>
            //     </div>
            
        })
    },

    filterFamily : function(filterKey){
        for (const [key, value] of Object.entries(document.getElementById("product_filter").children)) {
            document.getElementById(`${value.id}`).removeAttribute("active");
        }
        let filterFamily_container = document.getElementById("product_container");
        let filterFamilyCard = filterFamily_container.firstElementChild;
        filterFamilyCard.innerHTML = "";
        switch(filterKey){
            case "Nuevo" :
                productManager.createCards(productManager.allNewProduct);
                document.getElementById("allNewProduct").setAttribute("active", "");
                if(productManager.allNewProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                document.getElementById("title_category").innerText = "Nuevos productos";
                break;
            case "Todo Keto" :
                productManager.createCards(productManager.ketoProduct);
                document.getElementById("ketoProduct").setAttribute("active", "");
                if(productManager.ketoProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                document.getElementById("title_category").innerText = "Todo Keto";
                break;
            case "Anchetas" :
                productManager.createCards(productManager.giftProduct);
                document.getElementById("giftProduct").setAttribute("active", "");
                if(productManager.giftProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                document.getElementById("title_category").innerText = "Anchetas";
                break;
            case "Postres" :
                productManager.createCards(productManager.dessertProduct);
                document.getElementById("dessertProduct").setAttribute("active", "");
                if(productManager.dessertProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                document.getElementById("title_category").innerText = "Postres";
                break;
            case "Tortas" :
                productManager.createCards(productManager.cakeProduct);
                document.getElementById("cakeProduct").setAttribute("active", "");
                if(productManager.cakeProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                document.getElementById("title_category").innerText = "Tortas";
                break;
            case "Salados" :
                productManager.createCards(productManager.saltProduct);
                document.getElementById("saltProduct").setAttribute("active", "");
                if(productManager.saltProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                document.getElementById("title_category").innerText = "Salados";
                break;
            case "Xoco Market" :
                productManager.createCards(productManager.xocoProduct);
                document.getElementById("xocoProduct").setAttribute("active", "");
                if(productManager.xocoProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                document.getElementById("title_category").innerText = "Xoco Market";
                break;
            default :
                console.log("Filter variable Error");
                break;
        }
        
    },

    allFamily : function(){
        document.getElementById("title_category").innerText = "Todos los productos";
        for (const [key, value] of Object.entries(document.getElementById("product_filter").children)) {
            document.getElementById(`${value.id}`).removeAttribute("active");
        }
        let allFamilyContainer = document.getElementById("product_container");
        let allFamilyCard = allFamilyContainer.firstElementChild;
        allFamilyCard.innerHTML = "";
        if(document.getElementById("ver_mas").className == "btn hidden"){
            document.getElementById("ver_mas").classList.remove("hidden");
        }
        productManager.createCards(productManager.allProduct);
        document.getElementById("allProduct").setAttribute("active", "");
    },
    

    showMore :  function(){
        let restOfArray = [];
        let showMoreContainer = document.getElementById("product_container");
        let showMoreCard = showMoreContainer.firstElementChild;
        for (const [key, value] of Object.entries(document.getElementById("product_filter").children)) {
            if(value.getAttribute("active") !== null){
                console.log("true");
                let theRightTableId = value.id;
                console.log("bidule ===> ", theRightTableId);
                switch(theRightTableId){
                    case "allProduct" :
                        restOfArray = productManager.allProduct.slice(20);
                        break;
                    case "allNewProduct" :
                        restOfArray = productManager.allNewProduct.slice(20);
                        break;
                    case "ketoProduct" :
                        restOfArray = productManager.ketoProduct.slice(20);
                        break;
                    case "giftProduct" :
                        restOfArray = productManager.giftProduct.slice(20);
                        break;
                    case "dessertProduct" :
                        restOfArray = productManager.dessertProduct.slice(20);
                        break;
                    case "cakeProduct" :
                        restOfArray = productManager.cakeProduct.slice(20);
                        break;
                    case "saltProduct" :
                        restOfArray = productManager.saltProduct.slice(20);
                        break;
                    case "xocoProduct" :
                        restOfArray = productManager.xocoProduct.slice(20);
                        break;
                    default :
                        console.log("Filter variable Error");
                        break;
                }
            }
        };
        restOfArray.map( product =>{
            let otherCard = document.createElement("div");
            otherCard.classList = "card";
            otherCard.id = `${product.id}`
            showMoreCard.appendChild(otherCard);

            let otherImgCard = document.createElement("div");
            otherImgCard.classList = "card_img_container";
            otherCard.appendChild(otherImgCard);

            let otherImgBackground = document.createElement("div");
            otherImgBackground.classList = "card_background_image";
            otherImgBackground.style = `background-image: url('../img/${product.image}');`;
            otherImgCard.appendChild(otherImgBackground);

            let otherCardText = document.createElement("div");
            otherCardText.classList = "card_text";
            otherCard.appendChild(otherCardText);

            otherCardText.insertAdjacentHTML("afterbegin", `<h4>${product.name}</h4>`);
            otherCardText.insertAdjacentHTML("beforeend", `<p>$${product.price[0]},000</p>`);

            let otherCategoryContainer = document.createElement("div");
            otherCategoryContainer.style = `display: flex; flex-direction: column; justify-content: end; align-items: end; width : 100%; height : auto; text-align: end;`;
            otherCardText.appendChild(otherCategoryContainer);

            let otherCategoryToWrite = product.visibility;

            otherCategoryToWrite.map( category => {
            otherCategoryContainer.insertAdjacentHTML("beforeend", `<p class="badge">#${category}</p>`);
            });
            if(product.new == true){
                otherCategoryContainer.insertAdjacentHTML("afterbegin", `<p class="badge">#Nuevo</p>`);
            }
        });
        document.getElementById("ver_mas").classList.add("hidden");
    }, 

};
document.addEventListener("DOMContentLoaded", productManager.init)