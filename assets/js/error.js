// FUNCTIONS

/**
 * When the request did not went as excepted :
 * targets the .error-row element (which is present in both product.html & index.html)
 * and injects the following HTML structure inside
 * to show that there was an error during communication with the API,
 * and ask the visitor to refresh the page thanks to the newly created button
 */
const displayApiError = function () {
    const errorRow = document.querySelector('.error-row');

    errorRow.innerHTML =
        '    <div class="bear-form-wrapper error-wrapper">\n' +
        '        <h1 class="api-error-msg">Oups, une erreur est survenue.<br> Essayez de rafraichir la page svp ❤</h1>\n' +
        '        <img src="assets/images/teddy-bear-head-down.png" alt="Ours en peluche renversé la tête en bas" class="api-error-img">\n' +
        '        <button id="refresh-btn" type="button" aria-label="Bouton pour rafraîchir la page" class="refresh-button"></button>\n' +
        '    </div>';
};



/**
 * To reload the content of the page
 */
const refreshPage = function() {
    location.reload();
};






//EVENT LISTENERS

// To execute refreshPage() when the refresh-btn (which is dynamically created by JS) is clicked
document.addEventListener('click', function (event) {

    if (event.target && event.target.id === 'refresh-btn') {
        refreshPage();
    }
});
