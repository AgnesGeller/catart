let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Termék hozzáadva a kosárhoz / Product added to cart');
    } else {
        alert('Ez a termék már a kosárban van / Already in cart');
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
                <p>${product.name_en} / ${product.name_hu} - £${product.price.toFixed(2)}
                <button onclick="removeFromCart(${product.id})">Remove / Törlés</button></p>
            `;
            cartContainer.appendChild(div);
        }
    });

    document.getElementById('cartTotal').innerText = `Összesen / Total: £${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
    alert('Checkout functionality will be added soon!');
});

displayCart();
