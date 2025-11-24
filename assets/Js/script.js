let currentLang = 'hu';

function setLang(lang) {
    currentLang = lang;
    displayProducts();
}

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
            <p>£${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart / Kosárba</button>
        `;
        productsContainer.appendChild(card);
    });
}

displayProducts();

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
