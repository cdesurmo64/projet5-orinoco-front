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
}


;/**
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


// To execute showAllItemsInCart() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    showAllItemsInCart();
});


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
    }
};



// To execute emptyCart() when the empty-cart-button element is clicked
const emptyCartButton = document.getElementById('empty-cart-button');

emptyCartButton.addEventListener('click', function () {
    emptyCart();
});
