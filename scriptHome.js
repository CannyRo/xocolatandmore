console.log("Javascript is ON");

const app = {
    // Functions //
    init : function(){
        console.log("INIT")
        app.sequenceFetch();
    },

    sequenceFetch : function(){
        async function fetchAllProducts() {
            const response = await fetch("./assets/data.json");
            if (!response.ok) {
                const message = `Un error occure : ${response.status}`;
                throw new Error(message);
            }
            app.data = await response.json();
        }
        fetchAllProducts()
        .then(() => {
            app.getNewProducts(app.data.products);
            app.createHomeCards(app.newAllProducts);
        })
        .catch(error => {
            error.message; // 'An error has occurred: 404'
        });
    },

    getNewProducts : function(products){
        app.newAllProducts = [];
        products.map( product => {
            if(product.new == true){
                app.newAllProducts.push(product);
            }
        })
    },

    createHomeCards : function(array){
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
                cardText.insertAdjacentHTML("beforeend", `<p>$${product.price[0]},000</p>`);

            }
        })
    },

    showMore :  function(array){
        let restOfArray = array.slice(20)

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
            cardText.insertAdjacentHTML("beforeend", `<p>$${product.price[0]},000</p>`);

        })

        document.getElementById("ver_mas").style = "display: none;";
    }, 

};
document.addEventListener("DOMContentLoaded", app.init)
