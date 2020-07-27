// To get URL parameters (the ID)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('_id');

/**
 * To request the info of the selected product in the API, and display the received info on an item card
 * or display an error message and a refresh button when the API send nothing
 */
const displayAllProductInfo = async function () {
    let response = await fetch('http://localhost:3000/api/teddies/' + productId);

    if (response.ok) {
        let product = await response.json();

        displayProductInfo(product);
        displayCustomisationMenu(product);

    }
    else {
        displayApiError();
    }
};



// To execute displayAllProductInfo() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayAllProductInfo();
});


