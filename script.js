console.log("Javascript is ON");

const app = {
    // Functions //
    init : function(){
        console.log("INIT")
        app.sequenceFetch();
    },

    sequenceFetch : function(){
        console.log("Fetch --- ON");

        async function fetchAllProducts() {
            const response = await fetch("./assets/data.json");
            if (!response.ok) {
                const message = `Un error occure : ${response.status}`;
                throw new Error(message);
            }
            app.data = await response.json();
            return console.log(app.data.products);
        }
        fetchAllProducts()
        .then(() => {
            console.log("On lance la séquence de création de carte");
            app.getNewProducts(app.data.products);
            app.createHomeCards(app.newAllProducts);
        })
        .catch(error => {
            error.message; // 'An error has occurred: 404'
        });
    },

    getNewProducts : function(products){
        console.log("On classe les nouveaux produits");
        app.newAllProducts = [];
        products.map( product => {
            if(product.new == true){
                app.newAllProducts.push(product);
            }
        })
    },

    createHomeCards : function(array){
        console.log("On crée 20 premières cartes des nouveaux produits");
        let newProductSection = document.getElementById("new_product");
        let newProductContainer = newProductSection.firstElementChild;
        let account = 0
        array.map( product =>{
            if( product.new == true && account<20){
                account++;
                
                let card = document.createElement("div");
                card.classList = "card";
                card.id = `${product.id}`
                newProductContainer.appendChild(card);

                let imgCard = document.createElement("div");
                imgCard.classList = "card_img_container";
                card.appendChild(imgCard);

                let imgBackground = document.createElement("div");
                imgBackground.classList = "card_background_image";
                imgBackground.style = `background-image: url('./img/${product.image}');`;
                imgCard.appendChild(imgBackground);

                let cardText = document.createElement("div");
                cardText.classList = "card_text";
                card.appendChild(cardText);

                cardText.insertAdjacentHTML("afterbegin", `<h4>${product.name}</h4>`);
                cardText.insertAdjacentHTML("beforeend", "$20,000");

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
            }
        })
    },

    createCards : function(){
        console.log("On crée toutes les cartes avec les datas");
        console.log(app.products);
    },
    
    showCards : function(){
        console.log("On montre les premières cartes")
    },

    showMore :  function(array){
        console.log("On montre tous les autres produits")
        let restOfArray = array.slice(20)
        console.log("complete Array :");
        console.log(array);
        console.log("restOfArray :");
        console.log(restOfArray);

        let newProductSection = document.getElementById("new_product");
        let newProductContainer = newProductSection.firstElementChild;

        restOfArray.map( product =>{
    
            let card = document.createElement("div");
            card.classList = "card";
            card.id = `${product.id}`
            newProductContainer.appendChild(card);

            let imgCard = document.createElement("div");
            imgCard.classList = "card_img_container";
            card.appendChild(imgCard);

            let imgBackground = document.createElement("div");
            imgBackground.classList = "card_background_image";
            imgBackground.style = `background-image: url('./img/${product.image}');`;
            imgCard.appendChild(imgBackground);

            let cardText = document.createElement("div");
            cardText.classList = "card_text";
            card.appendChild(cardText);

            cardText.insertAdjacentHTML("afterbegin", `<h4>${product.name}</h4>`);
            cardText.insertAdjacentHTML("beforeend", "$20,000");

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

        document.getElementById("ver_mas").style = "display: none;";
    }, 

};
document.addEventListener("DOMContentLoaded", app.init)
