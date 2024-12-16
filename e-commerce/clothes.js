// Sample Product Data
const products = [
    { id: 1, name: "Nike Sportswear Phoenix Fleece", price: 3795, img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/db9c4821-5d6b-4eb9-acb3-c17cee90d3cf/AS+W+NSW+PHNX+FLC+OS+LOGO+QZ.png" },
    { id: 2, name: "Japan Solo ", price: 4295, img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e7d6be90-ccf9-4214-8d28-fce1f3c4bbf3/JPN+M+NK+SOLO+DF+FLC+CRW+OLYB.png" },
    { id: 3, name: "Jordan Air", price: 1119, img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e7e84cdb-45f1-4f14-876c-98f1bbe9e8d1/M+J+EMB+JORDAN+AIR+CREW.png" },
    { id: 4, name: "Nike Solo Swoosh", price: 3359, img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5a5ec612-504a-4616-9f01-5004b411b1e4/AS+M+NK+SOLO+SWSH+FLC+PO+HDY.png" },
    { id: 5, name: "Jordan Essentials", price: 3839, img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bae0b434-c38b-4719-a90d-396697e3cc92/M+J+ESS+STMT+BUTTN+DWN+SHRT.png" },
  ];
  
  let cart = [];
  
  // Function to render products on the page
  function renderProducts() {
  const productContainer = document.querySelector(".product-list");
  productContainer.innerHTML = "";
  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class="product">
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₱${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
  }
  
  // Function to add a product to the cart
  function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existingItem = cart.find((item) => item.id === id);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  renderCart();
  updateCartCount();
  }
  
  // Function to remove a product from the cart
  function removeFromCart(id) {
  const existingItem = cart.find((item) => item.id === id);
  
  if (existingItem.quantity > 1) {
    existingItem.quantity--;
  } else {
    cart = cart.filter((item) => item.id !== id);
  }
  
  renderCart();
  updateCartCount();
  }
  
  // Function to render the cart
  function renderCart() {
  const cartContainer = document.querySelector(".cart-items");
  const totalItemsElement = document.querySelector("#total-items");
  const totalPriceElement = document.querySelector("#total-price");
  
  cartContainer.innerHTML = "";
  
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalItemsElement.textContent = 0;
    totalPriceElement.textContent = "0.00";
    return;
  }
  
  let totalItems = 0;
  let totalPrice = 0;
  
  cart.forEach((item) => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  
    cartContainer.innerHTML += `
      <div class="cart-item">
        <p>${item.name} - ₱${item.price} x ${item.quantity}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  });
  
  totalItemsElement.textContent = totalItems;
  totalPriceElement.textContent = totalPrice.toFixed(2);
  }
  
  // Function to update the cart count in the header
  function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
  
  // Initial Render
  renderProducts();
  renderCart();
  updateCartCount();