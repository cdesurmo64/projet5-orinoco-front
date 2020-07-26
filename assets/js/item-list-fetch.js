// Define functions used in displayAllTeddiesInfo()

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
        '                                           <div class=\"item-price\">' +
        '                                               Prix: <span class=\"item-price__number\">' + teddy.price + ' €</span>' +
        '                                           </div>' +
        '                                       </div>' +
        '                                    </div>' +
        '                                    <a class=\"btn btn-primary btn-select\" href="product.html?_id=' + teddy._id +'">' +
        '                                    Sélectionner ' + teddy.name + '<span class=\"beating-heart-icon heart-icon-love-pink\"></span>' +
        '                                    </a>' +
        '                                </div>' +
        '                            </article>';
};



/**
 * To request info on every teddy in the API, and display the received info on an item card for each teddy
 * or display an error message and a refresh button when the API send nothing
 */
const displayAllTeddiesInfo = async function () {
    let response = await fetch ('http://localhost:3000/api/teddies/');

    if (response.ok) {
        let teddies = await response.json();

        for (let teddy of teddies)
        {
            displayTeddyInfo(teddy);
        }
    }
    else {
        displayApiError();
    }
};


// To execute displayAllTeddiesInfo() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayAllTeddiesInfo();
});


