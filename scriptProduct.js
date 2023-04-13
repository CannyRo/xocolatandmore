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
        console.log("Fetch --- ON");

        async function fetchAllProducts() {
            const response = await fetch("../assets/data.json");
            if (!response.ok) {
                const message = `Un error occure : ${response.status}`;
                throw new Error(message);
            }
            productManager.data = await response.json();
            return console.log(productManager.data.products);
        }
        fetchAllProducts()
        .then(() => {
            console.log("On lance la séquence de création de carte");
            productManager.allProduct = productManager.data.products;
            console.log("productManager.allProduct");
            console.log(productManager.allProduct);
            productManager.getNewProducts(productManager.allProduct);
            console.log("productManager.allNewProduct");
            console.log(productManager.allNewProduct);
            productManager.dispatchProduct(productManager.allProduct);
            console.log("productManager.ketoProduct");
            console.log(productManager.ketoProduct);
            console.log("productManager.giftProduct");
            console.log(productManager.giftProduct);
            console.log("productManager.dessertProduct");
            console.log(productManager.dessertProduct);
            console.log("productManager.cakeProduct");
            console.log(productManager.cakeProduct);
            console.log("productManager.saltProduct");
            console.log(productManager.saltProduct);
            console.log("productManager.xocoProduct");
            console.log(productManager.xocoProduct);
            // productManager.getProductsFamily("Todo Keto", productManager.allProduct);
            // productManager.getProductsFamily("Anchetas", productManager.allProduct);
            // productManager.getProductsFamily("Postres", productManager.allProduct);
            // productManager.getProductsFamily("Tortas", productManager.allProduct);
            // productManager.getProductsFamily("Salados", productManager.allProduct);
            // productManager.getProductsFamily("Xoco Market", productManager.allProduct);
            productManager.createCards(productManager.allProduct);
        })
        .catch(error => {
            error.message; // 'An error has occurred: 404'
        });
    },

    getNewProducts : function(products){
        console.log("On classe les nouveaux produits");
        products.map( product => {
            if(product.new == true){
                productManager.allNewProduct.push(product);
            }
        })
    },
    getProductsFamily : function(family, array){
        console.log("On classe les produits de la famille : ", family);
        let temporaryArray = [];
        console.log("temporaryArray");
        console.log(temporaryArray.length);
        array.map( product => {
            let categoryArray = product.visibility;
            console.log(`${product.name} => ${product.visibility}`)
            categoryArray.map( category => {
                if(category == family){
                    console.log("category : ", category);
                    console.log("family : ", family);
                    console.log("It's OK... ON PUSH");
                    temporaryArray.push(product);
                }
            })
        })
        switch(family){
            case "Todo Keto" : 
                productManager.ketoProduct = temporaryArray;
                console.log("TODO KETO TABLE");
                console.log(productManager.ketoProduct);
                break;
            case "Anchetas" : 
                productManager.giftProduct = temporaryArray;
                console.log("ANCHETAS TABLE");
                console.log(productManager.giftProduct);
                break;
            case "Postres" :
                productManager.dessertProduct = temporaryArray;
                console.log("POSTRES TABLE");
                console.log(productManager.dessertProduct);
                break;
            case "Tortas" :
                productManager.cakeProduct = temporaryArray;
                console.log("TORTAS TABLE");
                console.log(productManager.cakeProduct);
                break;
            case "Salados" :
                productManager.saltProduct = temporaryArray;
                console.log("SALADOS TABLE");
                console.log(productManager.saltProduct);
                break;
            case "Xoco Market" : 
                productManager.xocoProduct = temporaryArray;
                console.log("XOCO MARKET TABLE");
                console.log(productManager.xocoProduct);
            default : 
                console.log("Get family Error");
        }
    },

    dispatchProduct : function(array){
        array.map( product => {
            let categoryArray = product.visibility;
            console.log(`${product.name} => ${product.visibility}`)
            categoryArray.map( category => {
                // if(category == family){
                //     console.log("category : ", category);
                //     console.log("family : ", family);
                //     console.log("It's OK... ON PUSH");
                //     temporaryArray.push(product);
                // }
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
        console.log("On crée 20 premières cartes des produits");
        let productContainer = document.getElementById("product_container");
        let cardProductContainer = productContainer.firstElementChild;
        let account = 0
        array.map( product =>{
            let card = document.createElement("div");
            account<20 ? card.classList = "card" : card.classList = "card hidden"
            // card.classList = "card";
            card.id = `${product.id}`
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
            cardText.insertAdjacentHTML("beforeend", "$20,000");

            let categoryContainer = document.createElement("div");
            categoryContainer.style = `display: flex; flex-direction: column; justify-content: end; align-items: end; width : 100%; height : auto; text-align: end;`;
            cardText.appendChild(categoryContainer);

            let categoryToWrite = product.visibility;
            // console.log(product.visibility);

            categoryToWrite.map( category => {
            // console.log("Ajout de la catégorie : ", category);
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
                break;
            case "Todo Keto" :
                productManager.createCards(productManager.ketoProduct);
                document.getElementById("ketoProduct").setAttribute("active", "");
                if(productManager.ketoProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                break;
            case "Anchetas" :
                productManager.createCards(productManager.giftProduct);
                document.getElementById("giftProduct").setAttribute("active", "");
                if(productManager.giftProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                break;
            case "Postres" :
                productManager.createCards(productManager.dessertProduct);
                document.getElementById("dessertProduct").setAttribute("active", "");
                if(productManager.dessertProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                break;
            case "Tortas" :
                productManager.createCards(productManager.cakeProduct);
                document.getElementById("cakeProduct").setAttribute("active", "");
                if(productManager.cakeProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                break;
            case "Salados" :
                productManager.createCards(productManager.saltProduct);
                document.getElementById("saltProduct").setAttribute("active", "");
                if(productManager.saltProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                break;
            case "Xoco Market" :
                productManager.createCards(productManager.xocoProduct);
                document.getElementById("xocoProduct").setAttribute("active", "");
                if(productManager.xocoProduct.length<21){
                    document.getElementById("ver_mas").classList.add("hidden");
                } else {
                    document.getElementById("ver_mas").classList.remove("hidden");
                }
                break;
            default :
                console.log("Filter variable Error");
                break;
        }
        
    },

    allFamily : function(){
        let allFamilyContainer = document.getElementById("product_container");
        let allFamilyCard = allFamilyContainer.firstElementChild;
        allFamilyCard.innerHTML = "";
        if(document.getElementById("ver_mas").className == "btn hidden"){
            document.getElementById("ver_mas").classList.remove("hidden");
        }
        productManager.createCards(productManager.allProduct);
    },
    
    showCards : function(){
        console.log("On montre les premières cartes")
    },

    showMore :  function(){
        console.log(document.getElementById("product_filter").children);
        let restOfArray = [];
        let showMoreContainer = document.getElementById("product_container");
        let showMoreCard = showMoreContainer.firstElementChild;
        for (const [key, value] of Object.entries(document.getElementById("product_filter").children)) {
            console.log(`${key}: ${value.getAttribute("active")}`);
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
        console.log("restOfArray => ", restOfArray);
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
            otherCardText.insertAdjacentHTML("beforeend", "$20,000");

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


        // console.log("On montre tous les autres produits")
        // let restOfArray = array.slice(20)
        // console.log("complete Array :");
        // console.log(array);
        // console.log("restOfArray :");
        // console.log(restOfArray);

        // let newProductSection = document.getElementById("new_product");
        // let newProductContainer = newProductSection.firstElementChild;

        // restOfArray.map( product =>{
    
        //     let card = document.createElement("div");
        //     card.classList = "card";
        //     card.id = `${product.id}`
        //     newProductContainer.appendChild(card);

        //     let imgCard = document.createElement("div");
        //     imgCard.classList = "card_img_container";
        //     card.appendChild(imgCard);

        //     let imgBackground = document.createElement("div");
        //     imgBackground.classList = "card_background_image";
        //     imgBackground.style = `background-image: url('./img/${product.image}');`;
        //     imgCard.appendChild(imgBackground);

        //     let cardText = document.createElement("div");
        //     cardText.classList = "card_text";
        //     card.appendChild(cardText);

        //     cardText.insertAdjacentHTML("afterbegin", `<h4>${product.name}</h4>`);
        //     cardText.insertAdjacentHTML("beforeend", "$20,000");

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
            
        // })

        // document.getElementById("ver_mas").style = "display: none;";
    }, 

};
document.addEventListener("DOMContentLoaded", productManager.init)