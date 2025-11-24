let currentLang = localStorage.getItem('lang') || 'hu';
const exchangeRate = 480;
let translations = {};

// Fordítások betöltése
async function loadTranslations() {
    const response = await fetch('./assets/Js/translations.json');
    translations = await response.json();
}

// Nyelvváltás
function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updateTexts();
    displayProducts();
}

// Termékek megjelenítése
async function displayProducts() {
    const response = await fetch('./assets/Js/products.json');
    const products = await response.json();

    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${currentLang === 'hu' ? product.name_hu : product.name_en}">
            <h3>${currentLang === 'hu' ? product.name_hu : product.name_en}</h3>
            <p>${showPrice(product.price, currentLang)}</p>
            <button onclick="addToCart(${product.id})">
              ${currentLang === 'hu' ? 'Kosárba' : 'Add to Cart'}
            </button>
        `;
        productsContainer.appendChild(card);
    });
}

// Árfolyam
function showPrice(baseUSD, lang) {
  if (lang === "hu") {
    return (baseUSD * exchangeRate) + " Ft";
  } else {
    return "£" + baseUSD.toFixed(2);
  }
}

// Statikus szövegek frissítése
function updateTexts() {
  document.getElementById("title").innerText = translations[currentLang].title;
  document.getElementById("cart").innerText = translations[currentLang].cart;
}

// Hamburger menü
document.getElementById("hamburger").addEventListener("click", function() {
  document.getElementById("menu").classList.toggle("open");
  document.getElementById("sideMenu").classList.toggle("open");
});

// Első betöltéskor
window.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    updateTexts();
    displayProducts();
});
