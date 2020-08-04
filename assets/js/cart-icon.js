// FUNCTION

/**
 * Get the quantities of teddies added in the cart from the localStorage
 * If there is at least one teddy in the cart :
 * sum all these quantities to have the total number of teddies in the cart.
 * If there is none : the number of teddies in cart remains equal to 0
 * Finally : display the nb of teddies in cart on the cart icon in the header.
 */
const displayNumberArticlesCartIcon = function () {
    const numberArticlesCartIcon = document.getElementById('cart-icon-nb-articles');
    const teddiesInCart = JSON.parse(localStorage.getItem('cart'));
    let nbTeddiesInCart = 0;

    if (teddiesInCart) {
        for (let teddyInCart of teddiesInCart)
        {
            nbTeddiesInCart += Number(teddyInCart.quantity);
        }
    }
    numberArticlesCartIcon.textContent = nbTeddiesInCart.toString();
};






// EVENT LISTENER

// To execute displayNumberArticlesCartIcon() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayNumberArticlesCartIcon();
});
