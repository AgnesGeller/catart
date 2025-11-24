let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentLang = localStorage.getItem('lang') || 'hu';
const exchangeRate = 480;

function addToCart(productId) {
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(currentLang === 'hu' ? 'Termék hozzáadva a kosárhoz' : 'Product added to cart');
    } else {
        alert(currentLang === 'hu' ? 'Ez a termék már a kosárban van' : 'Already in cart');
    }
}

async function displayCart() {
    const response = await fetch('./assets/Js/products.json');
    const products = await response.json();

    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach(id => {
        const product = products.find(p => p.id === id);
        if(product){
            total += product.price;
            const div = document.createElement('div');
            div.innerHTML = `
                <p>${currentLang === 'hu' ? product.name_hu : product.name_en} - ${showPrice(product.price, currentLang)}
                <button onclick="removeFromCart(${product.id})">${currentLang === 'hu' ? 'Törlés' : 'Remove'}</button></p>
            `;
            cartContainer.appendChild(div);
        }
    });

    document.getElementById('cartTotal').innerText =
        currentLang === 'hu'
            ? `Összesen: ${showPrice(total, currentLang)}`
            : `Total: ${showPrice(total, currentLang)}`;
}

function removeFromCart(productId) {
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
    alert(currentLang === 'hu'
        ? 'A fizetés hamarosan elérhető lesz!'
        : 'Checkout functionality will be added soon!');
});

// Ár megjelenítése nyelv szerint
function showPrice(baseUSD, lang) {
  if (lang === "hu") {
    return (baseUSD * exchangeRate) + " Ft";
  } else {
    return "£" + baseUSD.toFixed(2);
  }
}

// Első betöltéskor
displayCart();
