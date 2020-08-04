// To get the ID of the product currently displayed from the URL parameters

const getCurrentProductId = function () {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('_id');
};

// To get the information about the product added to the cart

const getProductPrice = function() {
    const productPrice = document.getElementById('product-price');
    return productPrice.innerText;
};

const getProductName = function() {
    const productName = document.getElementById('product-name');
    return productName.innerText;
};

const getProductId = function() {
    const productId = document.getElementById('product-id');
    return productId.innerText;
};

const getProductQuantity = function() {
    const productQuantity = document.getElementById('quantity-choices');
    return productQuantity.value;
};

const getProductColor = function() {
    const getProductColor = document.getElementById('color-choices');
    return getProductColor.value;
};

const getProductImageUrl = function() {
    const productImage = document.getElementById('product-image');
    return productImage.getAttribute('src');
};



/**
 * To request the info of the selected product in the API, and display the received info on an item card
 * or display an error message and a refresh button when the API send nothing
 */
const displayAllProductInfo = async function () {

    try {
        let response = await fetch('http://localhost:3000/api/teddies/' + getCurrentProductId());

        if (response.ok) {
            let product = await response.json();

            displayProductInfo(product);
            displayCustomisationMenu(product);

        }
        else {
            displayApiError();
        }
    }
    catch (e) {
        displayApiError();
    }
};



// To execute displayAllProductInfo() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayAllProductInfo();
});



/**
 * Prevent the form data tu be submitted and the page reloaded.
 * Create an object 'newOrder' containing all the info on the new order.
 * Try to get previous orders information from the localStorage 'cart'.
 * If they exist, put them on the allOrders array.
 * Push the newOrder to the allOrders array.
 * Store allOrders array content in the localStorage, with the 'cart' key
 * Finally, execute displayNumberArticlesCartIcon() to update the article number displayed on the cart icon.
 */
const addToCart = function(event) {

        event.preventDefault(); // To prevent sending the form data and reloading the page

        const newOrder = {
            _id: getProductId(),
            name: getProductName(),
            imageUrl: getProductImageUrl(),
            price: getProductPrice(),
            color: getProductColor(),
            quantity: getProductQuantity()
        };

        const previousOrders = localStorage.getItem('cart');
        let allOrders = [];

        if (previousOrders) {
            allOrders = JSON.parse(previousOrders);
        }

        allOrders.push(newOrder);
        localStorage.setItem('cart', JSON.stringify(allOrders));

        displayNumberArticlesCartIcon();
};


// To execute addToCart() when the form element 'customisation-form'
// (which is dynamically created by JS) is submitted

document.addEventListener('submit', function (event) {

    if (event.target && event.target.id === 'customisation-form') {
        addToCart(event);
    }
});

