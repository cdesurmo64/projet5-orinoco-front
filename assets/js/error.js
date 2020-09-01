// FUNCTIONS CALLED IN VARIOUS PLACES THAT CREATE AN ERROR MESSAGE

/**
 * Displays a product error message :
 * targets the .item-errors-wrapper element (which is present in both index.html & product.html)
 * and injects the following HTML structure inside to show that the product is currently unavailable,
 * and ask the visitor to come back later
 */
const displayProductError = function () {
    const itemListContainer = document.querySelector('.item-errors-wrapper');
    const newErrorItemWrapper = document.createElement('div');

    itemListContainer.appendChild(newErrorItemWrapper);
    newErrorItemWrapper.classList.add('error-item', 'col-12', 'col-lg-8', 'mb-5', 'my-md-5', 'mx-lg-auto');
    newErrorItemWrapper.innerHTML =
        '                            <article class=\"card bg-white shadow\">' +
        '                                <div class=\"card-body\">' +
        '                                    <div class=\"item-info\">' +
        '                                       <h2 class=\"card-title item-name\">Ce produit est momentanément indisponible</h2>' +
        '                                       <div class=\"card-text\">' +
        '                                           <p class=\"item-description\">Nous nous excusons pour la gêne occasionnée. <br> Merci de revenir plus tard, quand nous aurons retrouvé ce teddy farceur </p>' +
        '                                       </div>' +
        '                                    </div>' +
        '                                </div>' +
        '                            </article>';
};


/**
 * Displays an invalid product message :
 * targets the .product-info element (which is present in product.html)
 * and injects the following HTML structure inside to show that the product the visitor tried to add to
 * the cart is not valid, and ask him to refresh the page thanks to the button and try again
 */
const displayInvalidProductMessage = function () {
    const productInfoWrapper = document.querySelector('.product-info');
    const invalidProductMessage = document.createElement('div');

    productInfoWrapper.appendChild(invalidProductMessage);
    invalidProductMessage.classList.add('invalid-product-msg');
    invalidProductMessage.innerHTML = 'Le produit sélectionné n\'est pas valide. <br> Veuillez rafraîchir la page et réessayer svp. ' +
        '<button id="refresh-btn" type="button" aria-label="Bouton pour rafraîchir la page" class="refresh-button"></button>'
};


/**
 * Displays an API error message :
 * targets the .error-row element (which is present in both cart.html, product.html & index.html)
 * and injects the following HTML structure inside to show that there was an error during communication with
 * the API, and ask the visitor to refresh the page thanks to the newly created refresh button
 */
const displayApiError = function () {
    const errorRow = document.querySelector('.error-row');

    errorRow.innerHTML =
        '    <div class="bear-form-wrapper error-wrapper">\n' +
        '        <h1 class="api-error-msg">Oups, une erreur est survenue.<br> Essayez de rafraîchir la page svp ❤</h1>\n' +
        '        <img src="assets/images/teddy-bear-head-down.png" alt="Ours en peluche renversé la tête en bas" class="api-error-img">\n' +
        '        <button id="refresh-btn" type="button" aria-label="Bouton pour rafraîchir la page" class="refresh-button"></button>\n' +
        '    </div>';
};


/**
 * To reload the content of the page
 */
const refreshPage = function() {
    document.location.reload(true); // 'true' parameter forces to reload the page without using the cache
};





//EVENT LISTENERS

// To execute refreshPage() when the refresh-btn (which is dynamically created by JS) is clicked
document.addEventListener('click', function (event) {

    if (event.target && event.target.id === 'refresh-btn') {
        refreshPage();
    }
});
