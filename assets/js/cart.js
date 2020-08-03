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
        orderFullPrice.textContent = fullPrice;
    }

    else {
        displayEmptyCartMessage();
    }
};


// To execute showAllItemsInCart() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    showAllItemsInCart();
});
