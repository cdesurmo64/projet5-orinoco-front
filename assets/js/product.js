// FUNCTIONS WHICH DISPLAY THE INFO AND POSSIBLE CUSTOMISATION OF ONE PRODUCT ON THE PRODUCT PAGE

/**
 * Creates a new product wrapper inside the product container and displays all the
 * info of the product (indicated as the function parameter) as an item card inside
 */
const displayProductInfo = function (product) {
    const productContainer = document.getElementById('product-container');
    const newProductWrapper = document.createElement('div');

    productContainer.appendChild(newProductWrapper);
    newProductWrapper.classList.add('product-wrapper', 'col-12', 'col-lg-10', 'mx-lg-auto');
    newProductWrapper.innerHTML =
        '                            <article class=\"card bg-white shadow\">' +
        '                                <div class=\"card-body\">' +
        '                                    <div class=\"card-image product-image\">' +
        '                                       <img id=\"product-image\" src=\"' + product.imageUrl + '\" alt=\"Photographie du teddy bear\">' +
        '                                    </div>' +
        '                                    <div class=\"product-info\">' +
        '                                       <h1 id=\"product-name\" class=\"card-title product-name\">' +
        product.name +
        '                                       </h1>' +
        '                                       <div class=\"card-text\">' +
        '                                           <div class=\"product-reference\">' +
        '                                               (Réf. <span id=\"product-id\">' + product._id + '</span>)' +
        '                                           </div>' +
        '                                           <p class=\"product-description\">' +
        product.description +
        '                                           </p>' +
        '                                           <div class=\"product-price\">' +
        '                                               Prix : <span id=\"product-price\" class=\"product-price__number\">' + product.price + '</span>  €' +
        '                                           </div>' +
        '                                       </div>' +
        '                                    </div>' +
        '                                </div>' +
        '                            </article>';
};



/**
 * Creates a customisation form and displays all the possible color customisation choices
 * for the product (indicated as the function parameter) as a select box inside
 * and another form group to chose the wanted product quantity
 */
const displayProductCustomisationMenu = function (product) {
    const productInfoText = document.querySelector('.product-info .card-text');

    const customisationForm = document.createElement('form');
    productInfoText.appendChild(customisationForm);
    customisationForm.classList.add('customisation-form');
    customisationForm.setAttribute('method', 'get');
    customisationForm.setAttribute('id', 'customisation-form');

    customisationForm.innerHTML =
        '        <p class="customisation-form-title">Personnalisez votre commande</p>' +
        '        <div class="form-group color-form">' +
        '           <label class="color-form-label col-12 col-md-3" for="color-choices">Choisissez sa couleur :</label>' +
        '           <select class="form-control col-7 col-md-3" id="color-choices" required>' +
        '                <option value="" selected disabled>- couleur -</option>' +
        '           </select>' +
        '        </div>' +
        '        <div class="form-group quantity-form">' +
        '           <label class="quantity-form-label col-12 col-md-3" for="quantity-choices">Quantité :</label>' +
        '           <input type="number" id="quantity-choices" class="form-control col-7 col-md-3" value="1" min="1" max="10" step="1" required>' +
        '        </div>' +
        '           <input type="hidden" name="_id" value="' + product._id + '">' +
        '        <button id="btn-add-cart" class="btn-common btn-colors" type="submit" aria-label="Bouton pour ajouter le teddy au panier">Adopter ' + product.name + '<span class="add-to-cart-icon"></span></button>';


    for (let color of product.colors)
    {
        const colorCustomisationSelect = document.getElementById('color-choices');
        const colorCustomisationOption = document.createElement('option');
        colorCustomisationSelect.appendChild(colorCustomisationOption);
        colorCustomisationOption.setAttribute('value', color);
        colorCustomisationOption.textContent = color;
    }
};


/**
 * Requests the info on the selected teddy to the API.
 * - If the communication with the API works and the response comes with a 2xx status code :
 *     - If we have all the requisite info about the teddy :
 *          * executes displayProductInfo(product) (-> displays the received info about the product on an item card)
 *          * executes displayProductCustomisationMenu(product) (-> displays a form to choose the wanted quantity and color of the product)
 *          * collects the return of createBackToHomeButton() to display this button at the end of the card
 *
 *     - If an info is missing about the product in the API answer (= an expected key is missing in 'product' or its value is empty) :
 *          * executes displayProductError() (-> displays an error message for the product on an item card)
 * - If the communication with the API fails or if the API answer does not come with a 2xx status code : executes displayErrorApi() (-> displays an API error message which asks to refresh the page)
 */
const displayAllProductInfo = async function () {

    try {
        let response = await fetch('http://localhost:3000/api/teddies/' + new URLSearchParams(window.location.search).get('_id'));

        if (response.ok) {
            let product = await response.json();

            const keys = ['imageUrl', 'name', 'description', '_id', 'colors', 'price']; // Creates an array with the keys we expect and need to check in the API answer
            let error = false; // Creates an error variable initially set as 'false'

            // For each key of the keys array
            for (let key of keys) {

                // If a key is missing or its value is empty in product
                if (!(key in product) || product[key] === '') {
                    error = true; // Error variable is set as 'true'
                }
            }

            // If error variable is 'false'
            if (!error) {
                displayProductInfo(product); // Displays the received info about the product on an item card
                displayProductCustomisationMenu(product); // Displays a form on the product card to choose the wanted quantity and color of the product

                const productCardBody = document.querySelector('#product-container .card-body');
                productCardBody.appendChild(createBackToHomeButton()); // Adds the back to home button at the end of the product card body
            } else {
                // If error variable is 'true'
                displayProductError(); // Displays an error message saying the product is unavailable in an item card
            }

        } else {
            displayApiError();
        }
    }
    catch (e) {
        displayApiError();
    }
};





// EVENT LISTENERS

// To execute displayAllProductInfo() when DOM content is loaded in the product page (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayAllProductInfo();
});

