// To get URL parameters (the ID)
const urlParams = new URLSearchParams(window.location.search);
const currentProductId = urlParams.get('_id');


/**
 * To request the info of the selected product in the API, and display the received info on an item card
 * or display an error message and a refresh button when the API send nothing
 */
const displayAllProductInfo = async function () {

    try {
        let response = await fetch('http://localhost:3000/api/teddies/' + currentProductId);

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






// Declaration of variables needed by addToCart()
// They are initialised where the elements are created in display.js
let productPrice;
let productName;
let productId;
let productQuantity;
let productColor;
let productImageUrl;


/**
 * If the visitor has effectively selected a valid color option :
 * Create an object 'newOrder' containing all the info on the new order.
 * Try to get the values for the 'cart' key from the localStorage.
 * If they exist, put them on the allOrders array.
 * Push the newOrder to the allOrders array.
 * Store allOrders array content in the localStorage, with the 'cart' key
 */
const addToCart = function(event) {

    let productColorValue;
    let productQuantityValue;
    productColorValue = productColor.value;
    productQuantityValue = productQuantity.value;

    if (productColorValue !== '' && productQuantityValue >= 1 && productQuantityValue <= 10 && Number.isInteger(productQuantityValue)) {

        event.preventDefault(); // Execute only in this condition to keep native HTML5 form validation features in case the visitor did not pick a valid color option. Is used here to prevent sending the form data.

        const newOrder = {
            _id: productId.innerText,
            name: productName.innerText,
            imageUrl: productImageUrl,
            price: productPrice.innerText,
            color: productColor.value,
            quantity: productQuantity.value
        };

        const previousOrders = localStorage.getItem('cart');
        let allOrders = [];

        if (previousOrders) {
            allOrders = JSON.parse(previousOrders);
        }

        allOrders.push(newOrder);
        localStorage.setItem('cart', JSON.stringify(allOrders));
    }
};


// To execute addToCart() and then displayNumberArticlesCartIcon() when the element btn-add-cart
// (which is dynamically created by JS) is clicked
document.addEventListener('click', function (event) {

    if (event.target && event.target.id === 'btn-add-cart') {
        addToCart(event);
        displayNumberArticlesCartIcon();
    }
});
