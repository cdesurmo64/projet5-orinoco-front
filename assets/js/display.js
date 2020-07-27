/**
 * When the request did not went as excepted :
 * reuse and modify the inner structure of the .bear-form-wrapper element
 * to show that there was an error during communication with the API,
 * and ask the visitor to refresh the page thanks to the newly created button
 */
const displayApiError = function () {
    const errorWrapper = document.querySelector('.bear-form-wrapper');
    errorWrapper.classList.add('error-wrapper');

    const errorMessage = document.querySelector('.bear-form-wrapper h1');
    errorMessage.classList.add('api-error-msg');
    errorMessage.innerHTML = 'Oups, une erreur est survenue.<br> Essayez de rafraichir la page svp ❤';

    const errorImage = document.querySelector('.bear-form-wrapper img');
    errorImage.setAttribute('src', 'assets/images/teddy-bear-head-down.png');
    errorImage.setAttribute('alt', 'Ours en peluche renversé la tête en bas');
    errorImage.classList.add('api-error-img');

    const refreshButton = document.createElement('button');
    errorWrapper.appendChild(refreshButton);
    refreshButton.setAttribute('id', 'refresh-btn');
    refreshButton.setAttribute('type', 'button');
    refreshButton.setAttribute('aria-label', 'Bouton pour rafraîchir la page');
    refreshButton.classList.add('refresh-button');
};



/**
 * Create a new item wrapper and display the info of one teddy as an item card inside
 */
const displayTeddyInfo = function (teddy) {
    const itemListContainer = document.getElementById('item-list-container');
    const newItemWrapper = document.createElement('div');

    itemListContainer.appendChild(newItemWrapper);
    newItemWrapper.classList.add('col-12', 'col-lg-8', 'my-5', 'mx-lg-auto');

    newItemWrapper.innerHTML =
        '                            <article class=\"card bg-white shadow\">' +
        '                                <div class=\"card-body\">' +
        '                                    <div class=\"card-image item-image\">' +
        '                                       <img src=\"' + teddy.imageUrl + '\">' +
        '                                    </div>' +
        '                                    <div class=\"item-info\">' +
        '                                       <h2 class=\"card-title item-name\">' +
        teddy.name +
        '                                       </h2>' +
        '                                       <div class=\"card-text\">' +
        '                                           <p class=\"item-description\">' +
        teddy.description +
        '                                           </p>' +
        '                                       </div>' +
        '                                    </div>' +
        '                                    <a class=\"btn btn-primary btn-select\" href="product.html?_id=' + teddy._id +'">' +
        '                                    Découvrir ' + teddy.name + '<span class=\"beating-heart-icon heart-icon-love-pink\"></span>' +
        '                                    </a>' +
        '                                </div>' +
        '                            </article>';
};



/**
 * Create a new product wrapper and display all the info of one product (= 1 teddy) as an item card inside
 */
const displayProductInfo = function (product) {
    const productContainer = document.getElementById('product-container');
    const newProductWrapper = document.createElement('div');

    productContainer.appendChild(newProductWrapper);
    newProductWrapper.classList.add('col-12', 'col-lg-10', 'my-5', 'mx-lg-auto');

    newProductWrapper.innerHTML =
        '                            <article class=\"card bg-white shadow\">' +
        '                                <div class=\"card-body\">' +
        '                                    <div class=\"card-image product-image\">' +
        '                                       <img src=\"' + product.imageUrl + '\">' +
        '                                    </div>' +
        '                                    <div class=\"product-info\">' +
        '                                       <h1 class=\"card-title product-name\">' +
        product.name +
        '                                       </h1>' +
        '                                       <div class=\"card-text\">' +
        '                                           <div class=\"product-reference\">' +
        '                                               (Réf. ' + product._id + ')' +
        '                                           </div>' +
        '                                           <p class=\"product-description\">' +
        product.description +
        '                                           </p>' +
        '                                           <div class=\"product-price\">' +
        '                                               Prix : <span class=\"product-price__number\">' + product.price + ' €</span>' +
        '                                           </div>' +
        '                                       </div>' +
        '                                    </div>' +
        '                                </div>' +
        '                            </article>';
};



/**
 * Create a customisation form and display all the possible color customisation choices as a select box inside
 */
const displayCustomisationMenu = function (product) {
    const productContainer = document.querySelector('.product-info .card-text');

    const customisationForm = document.createElement('form');
    productContainer.appendChild(customisationForm);
    customisationForm.classList.add('customisation-form');

    customisationForm.innerHTML =
        '        <p class="customisation-form-title">Personnalisez votre commande</p>' +
        '        <div class="form-group color-form">' +
        '           <label class="color-form-label col-12 col-md-3" for="color-choices">Choisissez sa couleur :</label>' +
        '           <select class="form-control col-7 col-md-3" id="color-choices" required>' +
        '                <option>- couleur -</option>' +
        '           </select>' +
        '        </div>' +
        '        <button class="btn btn-primary btn-add-cart btn-fireworks" type="submit">Adopter Norbert<span class="add-to-cart-icon"></span></button>';



    for (let color of product.colors)
    {
        const colorCustomisationSelect = document.getElementById('color-choices');

        const colorCustomisationOption = document.createElement('option');
        colorCustomisationSelect.appendChild(colorCustomisationOption);
        colorCustomisationOption.setAttribute('value', color);
        colorCustomisationOption.textContent = color;
    }
};


