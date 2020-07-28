// Declaration of variables needed by addToCart()
// They are initialised where the elements are created in display.js
let productPrice;
let productName;
let productId;
let productQuantity;
let productColor;
let productImageUrl;


// Create an object 'order' containing all the info on the new order, convert it to JSON, store it on the localStorage
// Todo: Transform the function to get the localStorage, check it, and push the new order at the end of the object collected from the localStorage
const addToCart = function() {

    const order = {
        _id: productId.innerText,
        name: productName.innerText,
        imageUrl: productImageUrl,
        price: productPrice.innerText,
        color: productColor.value,
        quantity: productQuantity.value
    };

    const stringOrder = JSON.stringify(order);
    localStorage.setItem('newOrder', stringOrder);
    console.log(localStorage.newOrder);
};

