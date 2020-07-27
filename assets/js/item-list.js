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
