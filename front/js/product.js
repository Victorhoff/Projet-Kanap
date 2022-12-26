// Récupération des l'ID produit

const id = new URLSearchParams(window.location.search).get("id")

// Récupération des paramètres produits

function afficher() {
    fetch("http://localhost:3000/api/products/" + id)

        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
    

        // Création des éléments HTML à l'aide du DOM

        .then(function (product) {

            const elt1 = document.querySelector(".item__img")
            const elt2 = document.getElementById("title")
            const elt3 = document.getElementById("price")
            const elt4 = document.getElementById("description")
            const elt5 = document.getElementById("colors")

            const createImg = document.createElement("img")
            const createH1 = document.createElement("h1")
            const createPar = document.createElement("p")
            const createPar2 = document.createElement("p")

            // Mise en place du choix de la couleur

            for (i = 0; i < product.colors.length; i++) {
                const createOpt = document.createElement("option")
                createOpt.textContent = product.colors[i]
                createOpt.setAttribute = ("value", product.colors[i])
                elt5.append(createOpt)

            }

            createH1.textContent = product.name
            createPar.textContent = product.price
            createPar2.textContent = product.description

            createImg.setAttribute("src", product.imageUrl)

            elt1.append(createImg)
            elt2.append(createH1)
            elt3.append(createPar)
            elt4.append(createPar2)
        

            // Mise en place d'un event listener sur le bouton ajouter au panier

            const buttonAddToCart = document.querySelector("#addToCart");
            buttonAddToCart.addEventListener("click", (event) => {
                event.preventDefault();

            // Récupération de la couleur choisie par l'utilisateur

                const color = document.querySelector("#colors");
                pickedColor = color.value;

            // Sélection de la quantité choisie par l'utilisateur

                const quantity = document.querySelector("#quantity");
                pickedQuantity = Number(quantity.value);
                if (pickedColor !== "" && pickedQuantity > 0 && pickedQuantity <= 100 && Number.isInteger(pickedQuantity)) {
                    let productOptions = {
                        id: product._id,
                        nom: product.name,
                        couleur: document.querySelector("#colors").value,
                        quantite: parseInt(document.querySelector("#quantity").value),
                        prix: product.price,
                        image: product.imageUrl,
                        alt: product.altTxt
                    }

                        let productInLocalStorage = JSON.parse(localStorage.getItem("Product"));
                        if (productInLocalStorage === null) {
                            productInLocalStorage= [];
                            productInLocalStorage.push(productOptions);
                            localStorage.setItem("Product", JSON.stringify(productInLocalStorage));
                        } else {
                            const found = productInLocalStorage.find(element => element.id == productOptions.id && element.couleur == productOptions.couleur);
                    
                    // Rajouter les infos produits dans le localStorage s'il n'y est pas déjà

                            if (found == undefined) {
                                productInLocalStorage.push(productOptions);
                                localStorage.setItem("Product", JSON.stringify(productInLocalStorage));
                    
                    // Augmenter la quantité si le produit est déjà dans le panier
                    
                            } else {
                                found.quantite += productOptions.quantite;
                                found.quantite = parseInt(found.quantite)
                                console.log(typeof(found.quantite))
                                localStorage.setItem("Product", JSON.stringify(productInLocalStorage));
                            }
                    }
                }
            }
        )

    })

.catch(function (err) {
});

}

afficher()





