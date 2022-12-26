const getProductId = () => {
    return new URL(location.href).searchParams.get("id");
  };
  const orderId = getProductId();
  
  const cart = JSON.parse(localStorage.getItem("cart"));
  
  const spanId = document.getElementById("orderId")
  
  // Afficher le numéro de commande sur la page

  function afficher () {
    spanId.textContent = orderId
    localStorage.clear();
  };

  afficher()