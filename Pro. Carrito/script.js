document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartList = document.querySelector('.cart-list');
    const cartTotal = document.querySelector('.cart-total');

    const cartItems = [];

    function updateCartTotal() {
        const total = cartItems.reduce((acc, item) => acc + item.price, 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    function renderCart() {
        cartList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="remove-from-cart" data-index="${index}">X</button>
            `;
            cartList.appendChild(cartItem);
        });

        updateCartTotal();

        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.getAttribute('data-index'));
                cartItems.splice(index, 1);
                renderCart();
            });
        });
    }

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const product = {
                name: button.parentElement.querySelector('h3').textContent,
                price: parseFloat(button.parentElement.querySelector('.price').textContent.substring(1)),
            };
            cartItems.push(product);
            renderCart();
        });
    });
});
