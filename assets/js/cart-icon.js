// FUNCTION WHICH DISPLAYS INFO ON THE HEADER CART ICON

/**
 * Gets the quantities of teddies added in the cart from the localStorage
 *
 * -> If there is at least one teddy in the cart :
 *    sums all these quantities to have the total number of teddies in the cart.
 * -> If there is none : the number of teddies in cart remains equal to 0
 *
 * -> If change_quantity_in_cart = true (= if the function is called from a function that
 * changes the number of products in the cart) : adds the 'circle-pulse' animation class during 3sec
 * to the cart number wrapper element
 *
 * Finally : displays the nb of teddies in cart on the cart icon in the header.
 */
const displayNumberArticlesCartIcon = function (change_quantity_in_cart) {
    const numberArticlesCartIconWrapper = document.querySelector('.cart-icon-nb-articles-wrapper');
    const numberArticlesCartIcon = document.getElementById('cart-icon-nb-articles');
    const teddiesInCart = JSON.parse(localStorage.getItem('cart'));
    let nbTeddiesInCart = 0;

    if (teddiesInCart) {
        for (let teddyInCart of teddiesInCart) {
            nbTeddiesInCart += Number(teddyInCart.quantity);
        }
    }

    if (change_quantity_in_cart) {
        numberArticlesCartIconWrapper.classList.add('circle-pulse');
        setTimeout(function () {
            numberArticlesCartIconWrapper.classList.remove('circle-pulse');
        }, 3000);
    }

    numberArticlesCartIcon.textContent = nbTeddiesInCart.toString();
};





// EVENT LISTENERS :

// To execute displayNumberArticlesCartIcon() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayNumberArticlesCartIcon(false);
});
