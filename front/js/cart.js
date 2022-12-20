        // Récupération des données du localstorage et conversion en objet JS

let productInLocalStorage = JSON.parse(localStorage.getItem("Product"));

function afficher() {

        // Affichage des produits dans le panier 

    if (localStorage) {

        for (i = 0; i < productInLocalStorage.length; i++)  {
        
            const elt1 = document.getElementById("cart__items")
            const createArticle = document.createElement("article")
            const createDiv = document.createElement("div")
            const createDiv2 = document.createElement("div")
            const createDiv3 = document.createElement("div")
            const createDiv4 = document.createElement("div")
            const createDiv5 = document.createElement("div")
            const createDiv6 = document.createElement("div");
            const createImg = document.createElement("img");
            const createH2 = document.createElement("h2");
            const createPar = document.createElement("p");
            const createPar2 = document.createElement("p");
            const createPar3 = document.createElement("p");
            const createPar4 = document.createElement("p");
            const createInput = document.createElement("input");

            createArticle.classList.add("cart__item");
            createDiv.classList.add("cart__item__img");
            createDiv2.classList.add("cart__item__content");
            createDiv3.classList.add("cart__item__content__description");
            createDiv4.classList.add("cart__item__content__settings");
            createDiv5.classList.add("cart__item__content__settings__quantity");
            createInput.classList.add("itemQuantity");
            createDiv6.classList.add("cart__item__content__settings__delete");
            createPar4.classList.add("deleteItem");

            createPar4.textContent = "Supprimer";
            createH2.textContent = productInLocalStorage[i].nom;
            createPar.textContent = productInLocalStorage[i].couleur;
            createDiv5.textContent = "Qté : " + productInLocalStorage[i].quantite;

            createArticle.setAttribute("data-id", productInLocalStorage[i].id);
            createArticle.setAttribute("data-color", productInLocalStorage[i].couleur);
            createImg.setAttribute("src", productInLocalStorage[i].image);
            createImg.setAttribute("alt", "Photographie d'un canapé");
            createInput.setAttribute("min", 1);
            createInput.setAttribute("max", 100);
            createInput.setAttribute("value", productInLocalStorage[i].quantite);
            createInput.setAttribute("data-id", productInLocalStorage[i].id);
            createInput.setAttribute("data-color", productInLocalStorage[i].couleur);
            createPar4.setAttribute("data-id", productInLocalStorage[i].id);
            createPar4.setAttribute("data-color", productInLocalStorage[i].couleur);


            elt1.append(createArticle);
            createArticle.append(createDiv);
            createDiv.append(createImg);
            createArticle.append(createDiv2);
            createDiv2.append(createDiv3);
            createDiv3.append(createH2);
            createDiv3.append(createPar);
            createDiv3.append(createPar2);
            createDiv2.append(createDiv4);
            createDiv4.append(createDiv5);
            createDiv5.append(createPar3);
            createDiv5.append(createInput);
            createDiv4.append(createDiv6);
            createDiv6.append(createPar4);

            getOneProduct(productInLocalStorage[i].id,createPar2)
        };
        
    }
}

afficher()

        // Récupération du prix unitaire des produits pour l'afficher dans le panier

async function getOneProduct(id,elt) {

    let price = 0;

    await fetch("http://localhost:3000/api/products/"+id)

    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
            elt.textContent = value.price + " €"
    })

    .catch(function(err) {
    });

    return price;
}

    // Récupération du prix des produits par l'API

async function getPriceProduct (id) {

    let price = 0;

    await fetch("http://localhost:3000/api/products/"+id)
        
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function(value) {
        price = value.price;

    })

    .catch(function(err) {
    });

    return price;
}

    // Récupération de la quantité par le localStorage et calcul des totaux

async function totalPriceBasket() {

    let totalQuantity = 0;
    let totalPrice = 0;

    for (i=0; i < productInLocalStorage.length; i++) {

        totalQuantity += parseInt(productInLocalStorage[i].quantite);
        totalPrice += (await getPriceProduct(productInLocalStorage[i].id) * totalQuantity);
        
    }

    // Affichage des totaux dans le panier

    let elt6 = document.getElementById("totalPrice");
    let createSpan = document.createElement("span");
    elt6.append(createSpan);
    createSpan.textContent = totalPrice;

    let elt7 = document.getElementById("totalQuantity");
    let createSpan2 = document.createElement("span");
    elt7.append(createSpan2);
    createSpan2.textContent = totalQuantity;
}

    // Modification de la quantité dans le panier

function modifyQuantity() {
    let inputs = document.querySelectorAll('.itemQuantity');
    for (let input of Array.from(inputs)) {
        input.addEventListener("change", event => {
            let productId = event.target.getAttribute("data-id");
            let productColor = event.target.getAttribute("data-color");
            const modify = productInLocalStorage.find(element => element.id == productId && element.couleur == productColor);
            modify.quantite = input.value;
            productInlocalStorage = modify;
            localStorage.setItem("Product", JSON.stringify(productInLocalStorage));
            window.location.href = "cart.html";
        })
    }
}

    // Suppression d'un produit dans le panier

function deleteItem() {
    let buttons = document.querySelectorAll('.deleteItem');
    for (let button of Array.from(buttons)){
        button.addEventListener("click", e => {
            let productId = e.target.getAttribute("data-ID");
            let productColor = e.target.getAttribute("data-color");
            const searchDeleteItem = productInLocalStorage.find(element => element.id == productId && element.couleur == productColor);
            productInLocalStorage = productInLocalStorage.filter(item => item != searchDeleteItem);
            localStorage.setItem("Product", JSON.stringify(productInLocalStorage));
            window.location.href = "cart.html";
        })
    }
  }

totalPriceBasket()

modifyQuantity()

deleteItem()





