// FUNCTIONS

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
 * To request info on every teddy in the API, and display the received info on an item card for each teddy
 * or display an error message and a refresh button when the API send nothing
 */
const displayAllTeddiesInfo = async function () {
    try {
        let response = await fetch('http://localhost:3000/api/teddies/');

        if (response.ok) {
            let teddies = await response.json();

            for (let teddy of teddies) {
                displayTeddyInfo(teddy);
            }
        }
        else {
            displayApiError();
        }
    }
    catch (e) {
        displayApiError();
    }
};






// EVENT LISTENERS

// To execute displayAllTeddiesInfo() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayAllTeddiesInfo();
});
