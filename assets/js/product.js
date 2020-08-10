// FUNCTIONS

/**
 * Functions made to get and manipulate data that will be used in other functions
 */

// To get the ID of the product currently displayed from the URL parameters
const getCurrentProductId = function () {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('_id');
};

// To get the details about the product to be added to the cart
const getProductPrice = function() {
    const productPrice = document.getElementById('product-price');
    return Number(productPrice.innerText);
};

const getProductName = function() {
    const productName = document.getElementById('product-name');
    return productName.innerText;
};

const getProductId = function() {
    const productId = document.getElementById('product-id');
    return productId.innerText;
};

const getProductQuantity = function() {
    const productQuantity = document.getElementById('quantity-choices');
    return Number(productQuantity.value);
};

const getProductColor = function() {
    const ProductColor = document.getElementById('color-choices');
    return ProductColor.value;
};

const getProductImageUrl = function() {
    const productImage = document.getElementById('product-image');
    return productImage.getAttribute('src');
};



/**
 * Create a new product wrapper and display all the info of the product
 * (indicated as the function parameter) as an item card inside
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
 * Create a customisation form and display all the possible color customisation choices
 * for the product (indicated as the function parameter) as a select box inside
 * and another form group to chose the wanted product quantity
 */
const displayProductCustomisationMenu = function (product) {
    const productContainer = document.querySelector('.product-info .card-text');

    const customisationForm = document.createElement('form');
    productContainer.appendChild(customisationForm);
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
        '        <button id="btn-add-cart" class="btn btn-primary btn-add-cart btn-fireworks" type="submit" aria-label="Bouton pour ajouter le teddy au panier">Adopter ' + product.name + '<span class="add-to-cart-icon"></span></button>';


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
 * To request the info of the selected product in the API, and display the received info on an item card
 * or display an error message and a refresh button when the API send nothing
 */
const displayAllProductInfo = async function () {

    try {
        let response = await fetch('http://localhost:3000/api/teddies/' + getCurrentProductId());

        if (response.ok) {
            let product = await response.json();

            displayProductInfo(product);
            displayProductCustomisationMenu(product);
        }

        else {
            displayApiError();
        }
    }
    catch (e) {
        displayApiError();
    }
};


/**
 * Add the selected product to the cart, paying attention to the following points :
 * - If the new order concerns THE SAME product-id/color combination as a previous order
 *     -> update the previous order quantity in the localStorage
 * - If the new order concerns A NEW product-id/color combination compared to previous orders OR
 *   if there isn't any previous order :
 *     -> store the new order and its details (along with previous orders if any) in the localStorage
 * Finally, execute displayNumberArticlesCartIcon() to update the article number displayed on the cart icon
 */
const addToCart = function (event) {

    event.preventDefault(); // To prevent sending the form data and reloading the page

    // Create an object 'newOrder' containing all the details on the new order to be added to the cart
    const newOrder = {
        _id: getProductId(),
        name: getProductName(),
        imageUrl: getProductImageUrl(),
        price: getProductPrice(),
        color: getProductColor(),
        quantity: getProductQuantity()
    };

    const previousOrders = localStorage.getItem('cart');
    let allOrders = [];
    let pushNewOrder = true;

    // If previous orders were found in the localStorage
    if (previousOrders) {
        allOrders = JSON.parse(previousOrders); // Store the previous orders in allOrders array

        for (let previousOrder of allOrders) {

            // If the new order concerns the SAME product of the SAME color as a previous order
            if (newOrder._id === previousOrder._id && newOrder.color === previousOrder.color) {
                previousOrder.quantity += newOrder.quantity; // Update the quantity of the previous order in question by adding the new order quantity to it
                pushNewOrder = false; // To not push the new order to allOrders array later
            }
        }
    }

    // If the new order concerns A NEW product-id/color combination OR if there isn't any previous order
    if (pushNewOrder === true) {
        allOrders.push(newOrder); // Push the new order to allOrders array
    }

    localStorage.setItem('cart', JSON.stringify(allOrders)); // Store the allOrders array as the values associated with the 'cart' key in the localStorage
    displayNumberArticlesCartIcon();
};







// EVENT LISTENERS

// To execute displayAllProductInfo() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayAllProductInfo();
});


// To execute addToCart() when the form element 'customisation-form' (which is dynamically created by JS) is submitted
document.addEventListener('submit', function (event) {

    if (event.target && event.target.id === 'customisation-form') {
        addToCart(event);
    }
});

