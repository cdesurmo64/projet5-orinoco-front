// FUNCTIONS

/**
 * Display important information about one ordered item (i.e. one teddy of one color) in a cart page table row.
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
 * Display a message saying that the cart is empty in a cell in a new row of the cart table
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
 * Get all the items in the cart and their information from the localStorage 'cart'
 * If there is at least one item : execute displayCartItemInformation() for each item found & calculate the whole order price
 * If there is none : execute displayEmptyCartMessage()
 */
const showAllItemsInCart = function() {

    let fullPrice = 0;
    const orderFullPrice = document.getElementById('order-full-price');
    const allItemsInCart = JSON.parse(localStorage.getItem('cart'));

    if (allItemsInCart) {

        for (let itemInCart of allItemsInCart)
        {
            displayCartItemInformation(itemInCart);
            fullPrice += Number(itemInCart.price * itemInCart.quantity);
        }
        orderFullPrice.textContent = fullPrice.toString();
    }

    else {
        displayEmptyCartMessage();
    }
};



/**
 * Remove all the content from the cart table body to reset it
 * And reset the order full price to 0 €
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
 * Add the d-none class to the Empty Cart Button if there is nothing in the cart
 */
const hideEmptyCartButton = function() {

    const emptyCartButton = document.getElementById('empty-cart-button');
    const allItemsInCart = JSON.parse(localStorage.getItem('cart'));

    if (allItemsInCart == null) {
        emptyCartButton.classList.add('d-none');
    }
};



/**
 * If there is a 'cart' in the localStorage :
 * - Empty the cart by removing the 'cart' item from the localStorage.
 * - Reset the cart table content by executing resetCartTable().
 * - Execute showAllItemsInCart() that check if the localStorage is effectively empty
 *   and display the empty cart message.
 * - Execute displayNumberArticlesCartIcon() that check if the localStorage is effectively empty
 *   and reset the number of article displayed in the cart icon to 0.
 *
 * The button which needs to be clicked to empty the cart is only visible when there is something in the cart
 * so no need for an 'else' action.
 */
const emptyCart = function() {

    const allItemsInCart = JSON.parse(localStorage.getItem('cart'));

    if (allItemsInCart) {
        localStorage.removeItem('cart');
        resetCartTable();
        showAllItemsInCart();
        displayNumberArticlesCartIcon();
        hideEmptyCartButton();
    }
};







// EVENT LISTENERS :

// To execute showAllItemsInCart() and hideEmptyCartButton() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    showAllItemsInCart();
    hideEmptyCartButton();
});


// To execute emptyCart() when the empty-cart-button element is clicked
const emptyCartButton = document.getElementById('empty-cart-button');

emptyCartButton.addEventListener('click', function () {
    emptyCart();
});
