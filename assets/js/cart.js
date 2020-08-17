// FUNCTIONS

/**
 * Functions made to get and manipulate data that will be used in other functions
 */

// To get the buyer's contact info from the text he entered in the contact form
const getBuyerFirstName = function() {
    const buyerFirstName = document.getElementById('first-name');
    return buyerFirstName.value;
};

const getBuyerLastName = function() {
    const buyerLastName = document.getElementById('last-name');
    return buyerLastName.value;
};

const getBuyerAddress = function() {
    const buyerAddress = document.getElementById('address');
    return buyerAddress.value;
};

const getBuyerCity = function() {
    const buyerCity = document.getElementById('city');
    return buyerCity.value;
};

const getBuyerEmail = function() {
    const buyerEmail = document.getElementById('email');
    return buyerEmail.value;
};



/**
 * Displays important information about one ordered item (i.e. one teddy of one color) in a cart page table row.
 */
const displayCartItemInformation = function (itemInCart) {

    const cartTableContent = document.getElementById('cart-table-content');
    const cartTableContentOneItemRow = document.createElement('tr');
    cartTableContent.appendChild(cartTableContentOneItemRow);
    cartTableContentOneItemRow.classList.add('cart-table-item-row');

    const itemInCartFullPrice = itemInCart.price * itemInCart.quantity;

    cartTableContentOneItemRow.innerHTML =
        '        <td>' +
        '           <a href="product.html?_id=' + itemInCart._id +'">' +
        '               <div class="cart-item-img-name-cell">' +
        '                   <div class="cart-item-img-wrapper">' +
        '                       <img class="cart-item-img" src=\"' + itemInCart.imageUrl + '\" alt=\"Photographie du teddy bear se trouvant dans le panier\">' +
        '                   </div>' +
        '                   <div class="cart-item-name-wrapper">' +
        '                       <h2 class="cart-item-name">' + itemInCart.name + '</h2>' +
        '                   </div>' +
        '               </div>' +
        '           </a>' +
        '        </td>' +
        '        <td class="cart-item-color">' + itemInCart.color + '</td>' +
        '        <td class="cart-item-unitary-price">' + itemInCart.price + '</td>' +
        '        <td class="cart-item-quantity">' + itemInCart.quantity + '</td>' +
        '        <td class="cart-item-full-price">' + itemInCartFullPrice + '</td>'
};



/**
 * Displays a message saying that the cart is empty in a cell in a new row of the cart table
 */
const displayEmptyCartMessage = function () {

    const cartTableContent = document.getElementById('cart-table-content');

    const cartTableContentEmptyCartRow = document.createElement('tr');
    cartTableContent.appendChild(cartTableContentEmptyCartRow);

    const cartTableContentEmptyCartCell = document.createElement('td');
    cartTableContentEmptyCartRow.appendChild(cartTableContentEmptyCartCell);
    cartTableContentEmptyCartCell.classList.add('cart-table-empty-msg-cell');
    cartTableContentEmptyCartCell.setAttribute('colspan', '5');
    cartTableContentEmptyCartCell.textContent = 'Votre panier est actuellement vide ☹';
};



/**
 * Gets all the items in the cart and their information from the localStorage 'cart'
 *  -> If there is at least one item -> for each item found :
 *      - executes displayCartItemInformation()
 *      - calculates the total number of teddies in the cart & stores it on the localStorage
 *      - calculates the total order price, stores it on the localStorage, & displays it on the resume cart table
 *
 *  -> If there is none -> executes displayEmptyCartMessage()
 */
const showAllItemsInCartAndStoreCartInformation = function() {

    let totalPrice = 0;
    let totalQuantity = 0;
    const orderFullPrice = document.getElementById('order-full-price');
    const allItemsInCart = JSON.parse(localStorage.getItem('cart'));

    if (allItemsInCart) {

        for (let itemInCart of allItemsInCart) {
            displayCartItemInformation(itemInCart);
            totalQuantity += Number(itemInCart.quantity);
            totalPrice += Number(itemInCart.price * itemInCart.quantity);
        }
        localStorage.setItem('orderTotalQuantity', JSON.stringify(totalQuantity)); // Stores the order total quantity of teddies in the localStorage 'orderTotalQuantity'
        localStorage.setItem('orderTotalPrice', JSON.stringify(totalPrice)); // Stores the order total price in the localStorage 'orderTotalPrice'
        orderFullPrice.textContent = totalPrice.toString();

    } else {
        displayEmptyCartMessage();
    }
};



/**
 * Removes all the content from the cart table body to reset it
 * And resets the order full price to 0 €
 */
const resetCartTable = function () {

        const cartTableContent = document.getElementById('cart-table-content');
        const orderFullPrice = document.getElementById('order-full-price');

        while (cartTableContent.firstChild) {
            cartTableContent.removeChild(cartTableContent.firstChild);
        }
        orderFullPrice.textContent = '0';
    };



/**
 * Adds the d-none class to the Empty Cart Button, the introducing contact form text
 * and the contact form if there is nothing in the cart, to hide it
 */
const hideEmptyCartButtonAndContactForm = function() {

    const emptyCartButton = document.getElementById('btn-empty-cart');
    const contactFormText = document.querySelector('.contact-form-text');
    const contactForm = document.getElementById('contact-form');
    const allItemsInCart = JSON.parse(localStorage.getItem('cart'));

    if (allItemsInCart == null) {
        emptyCartButton.classList.add('d-none');
        contactFormText.classList.add('d-none');
        contactForm.classList.add('d-none');
    }
};



/**
 * If there is a 'cart' in the localStorage :
 * - Empties the cart by removing the 'cart' item from the localStorage.
 * - Resets the cart table content by executing resetCartTable().
 * - Executes showAllItemsInCartAndStoreCartInformation() that check if the localStorage is effectively empty
 *   and displays the empty cart message.
 * - Executes displayNumberArticlesCartIcon() that check if the localStorage is effectively empty
 *   and resets the number of article displayed in the cart icon to 0.
 *
 * RQ : The button which needs to be clicked to empty the cart
 * is only visible when there is something in the cart so no need for an 'else' action.
 */
const emptyCart = function() {

    const allItemsInCart = JSON.parse(localStorage.getItem('cart'));

    if (allItemsInCart) {
        localStorage.removeItem('cart');
        resetCartTable();
        showAllItemsInCartAndStoreCartInformation();
        displayNumberArticlesCartIcon(true);
        hideEmptyCartButtonAndContactForm();
    }
};



/**
 * To save buyer's contact info in a variable called 'contact'
 */
const saveBuyerContactInfo = function() {

    // Create an object 'contact' containing all the buyer's contact info
    const contact = {
        firstName: getBuyerFirstName(),
        lastName: getBuyerLastName(),
        address: getBuyerAddress(),
        city: getBuyerCity(),
        email: getBuyerEmail(),
    };

    return contact;
};



/**
 * To save the ordered products ID in an array called 'products'
 */
const saveOrderedProductsId = function() {

    const products = [];
    const allOrderedProducts = JSON.parse(localStorage.getItem('cart'));

        for (let orderedProduct of allOrderedProducts) {
            products.push(orderedProduct._id);
        }

    return products;
};



/**
 * To submit the order -> If there is a 'cart' in the localStorage :
 *  - Creates the 'data' variable which contains the 'contact' object and the 'products' array
 *  - Tries to post 'data' to the API
 *      -> If the request is successful :
 *          - Stores API answer in the localStorage as 'orderResume' -> it contains the 'contact' object, the 'products' array, and the 'orderID' variable
 *          - Redirects to the confirmation page for this order
 *          - Executes emptyCart() to empty the cart
 *
 *      -> If the communication with the API fails or if the answer does not come with a 200 status code : executes displayApiError()
 *
 * RQ : The button which needs to be clicked to submit the order is only visible
 * when there is something in the cart so no need for an 'else' action.
 */
const submitOrder = async function (event) {

    event.preventDefault(); // To prevent sending the form data and reloading the page
    const allOrderedProducts = JSON.parse(localStorage.getItem('cart'));

    // If there is something in the cart = if there is a 'cart' in the localStorage
    if (allOrderedProducts) {

        let data = {
            contact: saveBuyerContactInfo(), // An object containing all the buyer's contact information
            products: saveOrderedProductsId() // An array containing the IDs of all the ordered items
        };

        try {
            let response = await fetch('http://localhost:3000/api/teddies/order',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.ok) {
                let orderResume = await response.json();

                localStorage.setItem('orderResume', JSON.stringify(orderResume)); // Stores API answer in the localStorage
                window.location.href = 'confirmation.html?orderId=' + orderResume.orderId; // Redirects to the confirmation page for this order
                emptyCart()
            } else {
                displayApiError();
            }
        }

        catch (e) {
            displayApiError();
        }
    }
};





// EVENT LISTENERS :

// To execute showAllItemsInCartAndStoreCartInformation() and hideEmptyCartButtonAndContactForm() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    showAllItemsInCartAndStoreCartInformation();
    hideEmptyCartButtonAndContactForm();
});


// To execute emptyCart() when the empty-cart-button element is clicked
const emptyCartButton = document.getElementById('btn-empty-cart');

emptyCartButton.addEventListener('click', function () {
    emptyCart();
});


// To execute submitOrder() when the form element 'customisation-form' is submitted
const buyerContactForm = document.getElementById('contact-form');

buyerContactForm.addEventListener('submit', function (event) {
    submitOrder(event);
});
