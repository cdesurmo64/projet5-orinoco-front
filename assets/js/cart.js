// FUNCTIONS WHICH MANIPULATE / DISPLAY THE CART AND ITS INFO

/**
 * Displays the back to home page button in the cart page 'cart-buttons-wrapper' element,
 * before the 'empty-cart-button-wrapper' child element
 */
const displayBackToHomeButton = function () {
    const cartButtonsWrapper = document.querySelector('.cart-buttons-wrapper');
    const emptyCartButton = document.querySelector('.empty-cart-button-wrapper');

    cartButtonsWrapper.insertBefore(createBackToHomeButton(), emptyCartButton);
};


/**
 * - If there is nothing in the cart :
 *   Adds the d-none class to the 'Empty Cart' Button, the introducing contact form text
 *   and the contact form to hide it so the visitor can't confirm an empty order
 *   or empty an already empty cart
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
 * Displays important information about one ordered item (i.e. one teddy of one color) in a cart page table row.
 * 'itemInCart' argument is provided by displayAllItemsInCartAndStoreCartInformation() function
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
 *  - If there is at least one item -> for each item found :
 *      * executes displayCartItemInformation()
 *      * calculates the total number of teddies in the cart & stores it on the localStorage
 *      * calculates the total order price, stores it on the localStorage, & displays it on the resume cart table
 *
 *  -> If there is none : executes displayEmptyCartMessage()
 */
const displayAllItemsInCartAndStoreCartInformation = function() {
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
        orderFullPrice.textContent = totalPrice.toString();
        localStorage.setItem('orderTotalQuantity', JSON.stringify(totalQuantity)); // Stores the order total quantity of teddies in the localStorage 'orderTotalQuantity'
        localStorage.setItem('orderTotalPrice', JSON.stringify(totalPrice)); // Stores the order total price in the localStorage 'orderTotalPrice'

    } else {
        displayEmptyCartMessage();
    }
};


/**
 * Adds the selected product to the cart, if certain conditions are met :
 * - If the visitor did not modify HTML elements of the page to change product info :
 *      - If the new order concerns THE SAME product-id/color combination as a previous order
 *          -> updates the previous order quantity in the localStorage
 *      - If the new order concerns A NEW product-id/color combination compared to previous orders OR
 *        if there isn't any previous order :
 *          -> stores the new order and its details (along with previous orders if any) in the localStorage
 *      - Finally, executes displayNumberArticlesCartIcon() to update the article number displayed on the cart icon
 *
 * - If the visitor modified HTML elements (for instance to lower the product price or select a nonexistent
 *   color for this product)
 *      -> executes displayInvalidProductMessage()
 *
 * - If the communication with the API failed somehow :
 *      -> executes displayApiError()
 */
const addToCart = async function (event) {
    event.preventDefault(); // To prevent sending the form data and reloading the page

    // Creates an object 'newOrder' containing all the details on the new order to be added to the cart
    // extracted from HTML elements of the page
    const newOrder = {
        _id: document.getElementById('product-id').innerText,
        name: document.getElementById('product-name').innerText,
        imageUrl: document.getElementById('product-image').getAttribute('src'),
        price: Number(document.getElementById('product-price').innerText),
        color: document.getElementById('color-choices').value,
        quantity: Number(document.getElementById('quantity-choices').value)
    };

    try {
        // Asks to the API the info about the product whose ID is contained in the URL parameter
        let response = await fetch('http://localhost:3000/api/teddies/' + new URLSearchParams(window.location.search).get('_id'));

        if (response.ok) {
            let product = await response.json();

            // If the 'newOrder' info on the product match the ones sent by the API in terms of ID, name, imageUrl and price,
            // and if the selected color matches an existing color for this product according to the API
            if (product._id === newOrder._id && product.name === newOrder.name && product.imageUrl === newOrder.imageUrl
                && product.price === newOrder.price && product.colors.includes(newOrder.color)) {

                const previousOrders = localStorage.getItem('cart');
                let allOrders = [];
                let pushNewOrder = true;

                // If previous orders were found in the localStorage
                if (previousOrders) {
                    allOrders = JSON.parse(previousOrders); // Stores the previous orders in 'allOrders' array

                    for (let previousOrder of allOrders) {

                        // If the new order concerns the SAME product of the SAME color as a previous order
                        if (newOrder._id === previousOrder._id && newOrder.color === previousOrder.color) {
                            previousOrder.quantity += newOrder.quantity; // Updates the quantity of the previous order in question by adding the new order quantity to it
                            pushNewOrder = false; // To not push the new order to 'allOrders' array later
                        }
                    }
                }

                // If the new order concerns A NEW product-id/color combination OR if there isn't any previous order
                if (pushNewOrder === true) {
                    allOrders.push(newOrder); // Pushes the new order to 'allOrders' array
                }

                localStorage.setItem('cart', JSON.stringify(allOrders)); // Stores the 'allOrders' array as the values associated with the 'cart' key in the localStorage
                displayNumberArticlesCartIcon(true);

            } else {
                // If the 'newOrder' info don't match the ones sent by the API
                // or if the colors does not match an existing one according to the API
                // (for instance : because the visitor modified HTML elements to lower the price of the product
                // or choose a color that does not exist for this product)
                displayInvalidProductMessage();
            }

        } else {
            displayApiError();
        }
    }
    catch (e) {
        displayApiError();
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
 * - If there is a 'cart' in the localStorage :
 *   * Empties the cart by removing the 'cart' item from the localStorage.
 *   * Resets the cart table content by executing resetCartTable().
 *   * Executes displayAllItemsInCartAndStoreCartInformation() that check if the localStorage is effectively empty
 *     and displays the empty cart message.
 *   * Executes displayNumberArticlesCartIcon() that check if the localStorage is effectively empty
 *     and resets the number of article displayed in the cart icon to 0.
 *
 * RQ : The button which needs to be clicked to empty the cart
 * is only visible when there is something in the cart so no need for an 'else' action.
 */
const emptyCart = function() {
    const allItemsInCart = JSON.parse(localStorage.getItem('cart'));

    if (allItemsInCart) {
        localStorage.removeItem('cart');
        resetCartTable();
        displayAllItemsInCartAndStoreCartInformation();
        displayNumberArticlesCartIcon(true);
        hideEmptyCartButtonAndContactForm();
    }
};





// EVENT LISTENERS :

// To execute addToCart() when the 'customisation-form' element
// (which is dynamically created by JS) is submitted on the product page
document.addEventListener('submit', function (event) {

    if (event.target && event.target.id === 'customisation-form') {
        addToCart(event);
    }
});


// To execute various functions when DOM content is loaded in the cart page
document.addEventListener('DOMContentLoaded', function (event) {
    const id = new URLSearchParams(window.location.search).get('_id');

    // If we are on the cart page (= if there is no '_id' in the URL parameters)
    if (!id) {
        // To execute when DOM content is loaded
        displayNumberArticlesCartIcon(false);
        displayAllItemsInCartAndStoreCartInformation();
        displayBackToHomeButton();
        hideEmptyCartButtonAndContactForm(); // If the cart is empty when the visitor goes on the cart page, the empty cart button and the contact form to confirm the order are not showed


        // To execute emptyCart() when the cart page 'empty-cart-button' element is clicked
        const emptyCartButton = document.getElementById('btn-empty-cart');
        emptyCartButton.addEventListener('click', function () {
            emptyCart();
        });
    }
});
