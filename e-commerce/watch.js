// Sample Product Data
const products = [
    { id: 1, name: "Sky-Dweller", price: 6599, img: "https://media.rolex.com/image/upload/q_auto:eco/f_auto/t_v7/c_limit,w_1920/v1/catalogue/2024/upright-c/m336935-0008" },
    { id: 2, name: "Explorer 36", price: 10499, img: "https://media.rolex.com/image/upload/q_auto:eco/f_auto/t_v7-majesty/c_limit,w_800/v1/catalogue/2024/upright-c/m124273-0001" },
    { id: 3, name: "Day-Date 40", price: 12899, img: "https://media.rolex.com/image/upload/q_auto:eco/f_auto/t_v7-majesty/c_limit,w_800/v1/catalogue/2024/upright-c/m228348rbr-0045" },
    { id: 4, name: "Cosmograph Daytona", price: 8799, img: "https://media.rolex.com/image/upload/q_auto:eco/f_auto/t_v7-majesty/c_limit,w_800/v1/catalogue/2024/upright-c/m126539tbr-0002" },
    { id: 5, name: "Yacht-Master 40", price: 5699, img: "https://media.rolex.com/image/upload/q_auto:eco/f_auto/t_v7-majesty/c_limit,w_800/v1/catalogue/2024/upright-c/m126622-0002" },
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