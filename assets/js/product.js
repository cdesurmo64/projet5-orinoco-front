// To get URL parameters (the ID)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('_id');


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
        '                                    <div class=\"card-image item-image\">' +
        '                                       <img src=\"' + product.imageUrl + '\">' +
        '                                    </div>' +
        '                                    <div class=\"item-info\">' +
        '                                       <h2 class=\"card-title item-name\">' +
        product.name +
        '                                       </h2>' +
        '                                       <div class=\"card-text\">' +
        '                                           <p class=\"item-description\">' +
        product.description +
        '                                           </p>' +
        '                                           <div class=\"item-price\">' +
        '                                               Prix: <span class=\"item-price__number\">' + product.price + ' €</span>' +
        '                                           </div>' +
        '                                       </div>' +
        '                                    </div>' +
        '                                    <a class=\"btn btn-primary btn-select\" role=\"button\">' +
        '                                    Adopter ' + product.name + '<span class=\"beating-heart-icon heart-icon-love-pink\"></span>' +
        '                                    </a>' +
        '                                </div>' +
        '                            </article>';

};


/**
 * To request the info of the selected product in the API, and display the received info on an item card
 * or display an error message and a refresh button when the API send nothing
 */
const displayAllProductInfo = async function () {
    let response = await fetch('http://localhost:3000/api/teddies/' + productId);

    if (response.ok) {
        let product = await response.json();
        displayProductInfo(product);

    }
    else {
        displayApiError();
    }
};



// To execute displayAllProductInfo() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayAllProductInfo();
});


