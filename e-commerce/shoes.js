// Sample Product Data
const products = [
  { id: 1, name: "KD Trey 5 IX EP", price: 4595, img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/bb520800-223c-4792-a5c2-75c60610cc0c/KD+TREY+5+IX+EP.png" },
  { id: 2, name: "LeBron XXII ", price: 9895, img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/70593e99-00cc-4b6f-aa1a-503de2a6a86f/LEBRON+XXII+EP.png" },
  { id: 3, name: "LeBron XXII", price: 9895, img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1db874e4-edf6-4954-a870-ec59f39436e7/LEBRON+XXII+EP.png" },
  { id: 4, name: "LeBron XXII 'Token' EP", price: 10895, img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4cc2f96b-772f-44ac-8042-bf68c3534616/LEBRON+XXII+NRG+EP.png" },
  { id: 5, name: "Giannis Immortality 4", price: 4295, img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b91913ef-8f62-4a98-a517-2b2c21b06026/GIANNIS+IMMORTALITY+4+EP.png" },
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