// Declaration of variables needed by addToCart()
// They are initialised where the elements are created in display.js
let productPrice;
let productName;
let productId;
let productQuantity;
let productColor;
let productImageUrl;


/**
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

