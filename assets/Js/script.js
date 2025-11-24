let currentLang = 'hu';
const exchangeRate = 480;

// Nyelvváltás
function setLang(lang) {
    currentLang = lang;
    setLanguage(lang);   // frissíti a címeket
    displayProducts();   // frissíti a termékeket
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

// Árfolyam kezelése
function showPrice(baseUSD, lang) {
  if (lang === "hu") {
    return (baseUSD * exchangeRate) + " Ft";
  } else {
    return "$" + baseUSD;
  }
}

// Statikus szövegek frissítése
function setLanguage(lang) {
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("cart").innerText = translations[lang].cart;
}

// Hamburger menü
document.getElementById("hamburger").addEventListener("click", function() {
  document.getElementById("menu").classList.toggle("open");
});

// Első betöltés
displayProducts();
