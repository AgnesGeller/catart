let currentLang = 'hu';
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

fetch('./js/products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts();
  });

function setLang(lang){
  currentLang = lang;
  renderProducts();
}

function renderProducts(){
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="./img/${p.image}" alt="${currentLang === 'hu' ? p.name_hu : p.name_en}">
      <h3>${currentLang === 'hu' ? p.name_hu : p.name_en}</h3>
      <p>${currentLang === 'hu' ? p.description_hu : p.description_en}</p>
      <span>${p.price} Ft</span>
      <button class="add-to-cart" onclick="addToCart('${p.id}')">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id){
  const product = products.find(p => p.id === id);
  if(product){
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${currentLang === 'hu' ? product.name_hu : product.name_en} hozzáadva a kosárhoz!`);
  }
}

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    if(navLinks.style.display === 'flex'){
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
});
