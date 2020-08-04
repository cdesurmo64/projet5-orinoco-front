// To get the ID of the product currently displayed from the URL parameters

const getCurrentProductId = function () {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('_id');
};

// To get the information about the product added to the cart

const getProductPrice = function() {
    const productPrice = document.getElementById('product-price');
    return Number(productPrice.innerText);
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
    return Number(productQuantity.value);
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
 * Add the selected product to the cart, paying attention to the following points :
 * - If the new order concerns THE SAME product-id/color combination as a previous order
 *     -> update the previous order quantity in the localStorage
 * - If the new order concerns A NEW product-id/color combination compared to previous orders OR
 *   if there isn't any previous order :
 *     -> store the new order and its details (along with previous orders if any) in the localStorage
 * Finally, execute displayNumberArticlesCartIcon() to update the article number displayed on the cart icon
 */
const addToCart = function (event) {

    event.preventDefault(); // To prevent sending the form data and reloading the page

    // Create an object 'newOrder' containing all the details on the new order to be added to the cart
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
    let pushNewOrder = true;

    // If previous orders were found in the localStorage
    if (previousOrders) {
        allOrders = JSON.parse(previousOrders); // Store the previous orders in allOrders array

        for (let previousOrder of allOrders) {

            // If the new order concerns the SAME product of the SAME color as a previous order
            if (newOrder._id === previousOrder._id && newOrder.color === previousOrder.color) {
                previousOrder.quantity += newOrder.quantity; // Update the quantity of the previous order in question by adding the new order quantity to it
                pushNewOrder = false; // To not push the new order to allOrders array later
            }
        }
    }

    // If the new order concerns A NEW product-id/color combination OR if there isn't any previous order
    if (pushNewOrder === true) {
        allOrders.push(newOrder); // Push the new order to allOrders array
    }

    localStorage.setItem('cart', JSON.stringify(allOrders)); // Store the allOrders array as the values associated with the 'cart' key in the localStorage
    displayNumberArticlesCartIcon();
};


// To execute addToCart() when the form element 'customisation-form'
// (which is dynamically created by JS) is submitted

document.addEventListener('submit', function (event) {

    if (event.target && event.target.id === 'customisation-form') {
        addToCart(event);
    }
});

