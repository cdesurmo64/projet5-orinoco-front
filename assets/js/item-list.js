// FUNCTIONS WHICH DISPLAY A LIST OF CARDS, EACH ONE CONTAINING
// ONE TEDDY AND ITS INFO ON THE HOME PAGE

/**
 * Creates a new item wrapper and displays the info of one teddy as an item card inside
 */
const displayTeddyInfo = function (teddy) {
    const itemListContainer = document.getElementById('item-list-container');
    const newItemWrapper = document.createElement('div');

    itemListContainer.appendChild(newItemWrapper);
    newItemWrapper.classList.add('item-wrapper', 'col-12', 'col-lg-8', 'mb-5', 'my-md-5', 'mx-lg-auto');

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
 * Requests info on all teddies to the API.
 * - If the communication with the API works and the response comes with a 2xx status code :
 *    For each 'teddy' in 'teddies' :
 *       - If we have all the requisite info about the teddy : executes displayTeddyInfo(teddy) (-> displays the received info about the teddy on an item card)
 *       - If an info is missing about the teddy in the API answer (= an expected key is missing in 'teddy' or its value is empty) : executes displayProductError() (-> displays an error message for the teddy on an item card)
 * - If the communication with the API fails or if the API answer does not come with a 2xx status code : executes displayErrorApi() (-> displays an API error message which asks to refresh the page)
 */
const displayAllTeddiesInfo = async function () {
    try {
        let response = await fetch('http://localhost:3000/api/teddies/');

        if (response.ok) {
            let teddies = await response.json();

            const keys = ['imageUrl', 'name', 'description', '_id']; // Creates an array with the keys we expect and need to check in the API answer

            // For each teddy found in the API answer
            for (let teddy of teddies) {
                let error = false; // Creates an error variable initially set as 'false'

                // For each key of the keys array
                for (let key of keys) {

                    // If a key is missing or its value is empty in teddy
                    if (!(key in teddy) || teddy[key] === '') {
                        error = true; // Error variable is set as 'true'
                    }
                }

                // If error variable is 'false'
                if (!error) {
                    displayTeddyInfo(teddy); // Displays the info of the teddy in an item card
                } else {
                    // If error variable is 'true'
                    displayProductError(); // Displays an error message saying the teddy is unavailable in an item card
                }
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
