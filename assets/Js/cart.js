let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentLang = 'hu';

async function renderCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;

    cart.forEach((p, index) => {
        total += p.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="./img/${p.image}" alt="${currentLang === 'hu' ? p.name_hu : p.name_en}">
            <div class="cart-item-details">
                <h3>${currentLang === 'hu' ? p.name_hu : p.name_en}</h3>
                <p>${currentLang === 'hu' ? p.description_hu : p.description_en}</p>
                <span>${p.price} Ft</span>
            </div>
            <button class="remove" onclick="removeFromCart(${index})">Törlés / Remove</button>
        `;
        container.appendChild(div);
    });

    document.getElementById('totalPrice').textContent = total + ' Ft';

    const exchangeRate = await getExchangeRate();
    const totalGBP = (total * exchangeRate).toFixed(2);

    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            tagline: false
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalGBP,
                        currency_code: "GBP"
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Payment successful: ' + details.payer.name.given_name);
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        }
    }).render('#paypal-button-container');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

async function getExchangeRate() {
    try {
        const res = await fetch('https://api.exchangerate.host/latest?base=HUF&symbols=GBP');
        const data = await res.json();
        return data.rates.GBP;
    } catch (err) {
        console.error('Error fetching exchange rate', err);
        return 0.002;
    }
}

renderCart();
