// FUNCTIONS WHICH DISPLAY A LIST OF CARDS, EACH ONE CONTAINING
// ONE TEDDY AND ITS INFO ON THE HOME PAGE

/**
 * Creates a new item wrapper and displays the info of one teddy as an item card inside
 */
const displayTeddyInfo = function (teddy) {
    const itemListContainer = document.getElementById('item-list-container');
    const newItemWrapper = document.createElement('div');

    itemListContainer.appendChild(newItemWrapper);
    newItemWrapper.classList.add('col-12', 'col-lg-8', 'mb-5', 'my-md-5', 'mx-lg-auto');

    // Todo : Vérifier que les clés existent et que les valeurs assoc ne sont pas vides


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
        '                                    <a id="btn-select" class=\"btn-common btn-colors\" href="product.html?_id=' + teddy._id +'">' +
        '                                    Découvrir ' + teddy.name + '<span class=\"beating-heart-icon heart-icon-love-pink\"></span>' +
        '                                    </a>' +
        '                                </div>' +
        '                            </article>';
};



/**
 * Requests info on every teddy to the API, and displays the received info on an item card for each teddy
 * or executes displayErrorApi() if the communication with the API fails or if the API answer does not come
 * with a 200 status code
 */
const displayAllTeddiesInfo = async function () {
    try {
        let response = await fetch('http://localhost:3000/api/teddies/');

        if (response.ok) {
            let teddies = await response.json();

            for (let teddy of teddies) {
                displayTeddyInfo(teddy);
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

// To execute displayAllTeddiesInfo() when DOM content is loaded in the home page (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayAllTeddiesInfo();
});
