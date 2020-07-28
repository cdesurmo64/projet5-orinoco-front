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
 * When the btn-add-cart is clicked :
 * Create an object 'order' containing all the info on the new order.
 * Try to get the values for the 'cart' key from the localStorage.
 * If they exist, put them on the allOrders array.
 * Push the newOrder to the allOrders array.
 * Store allOrders array content in the localStorage, with the 'cart' key
 */
const addToCart = function() {

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
    //console.log(localStorage.newOrder);
};


// To listen to events on the element btn-add-cart, which is dynamically created by JS
document.addEventListener('click', function (event) {

    if (event.target && event.target.id === 'btn-add-cart') {
        event.preventDefault(); //to avoid sending it to the server until it's fully functional
        addToCart();
    }
});
