let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');
let priceFilter = document.getElementById('priceFilter');
let clearCartButton = document.querySelector('.clear-cart');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Samsung Galaxy S23 Ultra',
        image: 'Galaxy-S23-Ultra.PNG',
        price: 140000
    },
    {
        id: 2,
        name: 'Oneplus Nord N20 SE',
        image: 'Oneplus-Nord-N20-SE.PNG',
        price: 60000
    },
    {
        id: 3,
        name: 'Samsung Galaxy Z Flip 4',
        image: 'Samsung-Galaxy-Z-Flip-4.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'Realme GT 2 Pro 4',
        image: 'Realme-GT-2-Pro-4.PNG',
        price: 50000
    },
    {
        id: 5,
        name: 'Vivo X60 Pro',
        image: 'Vivo-X60-Pro.PNG',
        price: 67000
    },
    {
        id: 6,
        name: 'Oppo Watch 3 Pro 3',
        image: 'Oppo-Watch-3-Pro-3.PNG',
        price: 8000
    }
];

let listCarts = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    });
}

function addToCart(key) {
    if (listCarts[key] == null) {
        listCarts[key] = JSON.parse(JSON.stringify(products[key]));
        listCarts[key].quantity = 1;
        // Show the "Clear Cart" button
        clearCartButton.style.display = 'block';
    } else {
        listCarts[key].quantity += 1;
    }
    reloadCart();
}

function reloadCart() {
    listCart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCarts.forEach((value, key) => {
        totalPrice += value.price * value.quantity;
        count += value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCart.appendChild(newDiv);
        }
    });

    if (listCarts.length === 0) {
        let message = document.createElement('p');
        message.textContent = 'Cart is empty.';
        listCart.appendChild(message);
    } else {
        let emptyMessage = document.querySelector('.listCart p');
        if (emptyMessage) {
            emptyMessage.remove();
        }
    }

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}




function changeQuantity(key, quantity) {
    if (quantity <= 0) {
        delete listCarts[key];
    } else {
        listCarts[key].quantity = quantity;
    }
    reloadCart();
}

function clearCart() {
    listCarts = [];
    reloadCart();
    clearCartButton.style.display = 'none'; // Hide the "Clear Cart" button
}


initApp();

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
    );
    applyFilters(filteredProducts);
});

priceFilter.addEventListener('change', () => {
    const filterOption = priceFilter.value;
    let filteredProducts = [...products];

    switch (filterOption) {
        case 'lowToHigh':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'highToLow':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            break;
    }

    applyFilters(filteredProducts);
});

function applyFilters(filteredProducts) {
    list.innerHTML = '';

    if (filteredProducts.length === 0) {
        let message = document.createElement('p');
        message.textContent = 'No products found.';
        list.appendChild(message);
    } else {
        filteredProducts.forEach((value, key) => {
            let newDiv = document.createElement('div');
            newDiv.classList.add('item');
            newDiv.innerHTML = `
                <img src="image/${value.image}">
                <div class="title">${value.name}</div>
                <div class="price">${value.price.toLocaleString()}</div>
                <button onclick="addToCart(${key})">Add To Cart</button>`;
            list.appendChild(newDiv);
        });
    }
}


clearCartButton.addEventListener('click', clearCart);

