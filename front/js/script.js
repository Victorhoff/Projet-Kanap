//afficher les produits

function afficher() {
    fetch("http://localhost:3000/api/products")

.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {

    value.forEach(element => {

        const elt = document.getElementById("items")
        const createAnchor = document.createElement("a")
        const createArticle = document.createElement("article")
        const createImg = document.createElement("img")
        const createH3 = document.createElement("h3")
        const createPar = document.createElement("p")
        
        createImg.setAttribute("src", element.imageUrl)
        createAnchor.setAttribute("href", "product.html?id="+element._id)

        createH3.classList.add("productName")
        createPar.classList.add("productDescription")

        createH3.textContent=element.name
        createPar.textContent=element.description

        createArticle.append(createImg)
        createArticle.append(createH3)
        createArticle.append(createPar)
        createAnchor.append(createArticle)
        elt.append(createAnchor)
       
    
  })})

  .catch(function(err) {
  });
}

afficher()

